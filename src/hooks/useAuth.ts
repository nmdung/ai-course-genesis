
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export interface AuthFormData {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      fullName: "",
      confirmPassword: ""
    });
  };

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
        
        // Redirect to email verification page with email parameter
        navigate(`/email-verification?email=${encodeURIComponent(formData.email)}`);
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

  const handleBackFromVerification = () => {
    setShowEmailVerification(false);
    setIsSignUp(false);
    resetForm();
  };

  return {
    isSignUp,
    setIsSignUp,
    isForgotPassword,
    setIsForgotPassword,
    showEmailVerification,
    verificationEmail,
    role,
    setRole,
    isLoading,
    formData,
    handleInputChange,
    handleSubmit,
    handleBackFromVerification,
    resetForm
  };
};
