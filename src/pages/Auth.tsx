import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookOpen, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EmailVerificationScreen from "@/components/EmailVerificationScreen";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth?mode=reset`
        });
        
        if (error) throw error;
        
        toast({
          title: "Reset link sent!",
          description: "Check your email for a password reset link.",
        });
        setIsForgotPassword(false);
      } else if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match");
        }
        
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.fullName,
              role: role
            }
          }
        });
        
        if (error) throw error;
        
        setVerificationEmail(formData.email);
        setShowEmailVerification(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBackFromVerification = () => {
    setShowEmailVerification(false);
    setIsSignUp(false);
    setFormData({
      email: "",
      password: "",
      fullName: "",
      confirmPassword: ""
    });
  };

  const getCardTitle = () => {
    if (isForgotPassword) return "Reset Password";
    return isSignUp ? "Create Account" : "Welcome Back";
  };

  const getCardDescription = () => {
    if (isForgotPassword) return "Enter your email to receive a reset link";
    return isSignUp ? "Join our learning community" : "Sign in to your account";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ELearning AI
            </span>
          </Link>
        </div>

        {showEmailVerification ? (
          <EmailVerificationScreen 
            email={verificationEmail}
            onBack={handleBackFromVerification}
          />
        ) : (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {getCardTitle()}
              </CardTitle>
              <CardDescription>
                {getCardDescription()}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Back button for forgot password */}
                {isForgotPassword && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full justify-start p-0 h-auto font-normal text-sm text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to sign in
                  </Button>
                )}

                {/* Role Selection - Only for Sign Up */}
                {isSignUp && !isForgotPassword && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">I am a...</Label>
                    <RadioGroup 
                      value={role} 
                      onValueChange={setRole}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student" />
                        <Label htmlFor="student" className="cursor-pointer">
                          Student
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="teacher" id="teacher" />
                        <Label htmlFor="teacher" className="cursor-pointer">
                          Teacher
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Full Name - Only for Sign Up */}
                {isSignUp && !isForgotPassword && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password - Hide for forgot password */}
                {!isForgotPassword && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Confirm Password - Only for Sign Up */}
                {isSignUp && !isForgotPassword && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Forgot Password Link - Only for Sign In */}
                {!isSignUp && !isForgotPassword && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : 
                   isForgotPassword ? "Send Reset Link" :
                   isSignUp ? "Create Account" : "Sign In"}
                </Button>

                {/* Google Sign In - Hide for forgot password */}
                {!isForgotPassword && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => console.log("Google sign in")}
                      disabled={isLoading}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </Button>
                  </>
                )}
              </form>

              {/* Toggle Sign Up/Sign In - Hide for forgot password */}
              {!isForgotPassword && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                  </p>
                </div>
              )}

              {/* Back to Home */}
              <div className="mt-4 text-center">
                <Link 
                  to="/" 
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
