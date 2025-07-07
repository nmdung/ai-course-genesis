
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationScreenProps {
  email: string;
  onBack: () => void;
}

const EmailVerificationScreen = ({ email, onBack }: EmailVerificationScreenProps) => {
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Verification email sent!",
        description: "Please check your inbox for the new verification email.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Check Your Email
        </CardTitle>
        <CardDescription>
          We've sent a verification link to <span className="font-medium text-gray-900">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Click the verification link in your email to activate your account and start learning.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">What to do next:</h4>
            <ol className="text-sm text-gray-600 space-y-1 text-left">
              <li>1. Check your email inbox</li>
              <li>2. Look for an email from ELearning AI</li>
              <li>3. Click the "Verify Email" button</li>
              <li>4. You'll be redirected back to sign in</li>
            </ol>
          </div>

          <div className="text-xs text-gray-500">
            Didn't receive the email? Check your spam folder or request a new one below.
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleResendEmail}
            disabled={isResending}
            variant="outline"
            className="w-full"
          >
            {isResending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Resend Verification Email
              </>
            )}
          </Button>

          <Button
            variant="ghost" 
            onClick={onBack}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerificationScreen;
