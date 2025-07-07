
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const AccountActivation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleActivation = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('No activation token provided.');
        return;
      }

      try {
        // Use verifyOtp to handle email confirmation
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email'
        });

        if (error) {
          setStatus('error');
          setMessage(error.message || 'Failed to activate account.');
          toast({
            title: "Activation Failed",
            description: error.message || 'Failed to activate account.',
            variant: "destructive",
          });
          return;
        }

        setStatus('success');
        setMessage('Your account has been successfully activated!');
        toast({
          title: "Account Activated!",
          description: "Your account has been successfully activated. You can now sign in.",
        });

        // Redirect to auth page after 3 seconds
        setTimeout(() => {
          navigate('/auth');
        }, 3000);

      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'An unexpected error occurred.');
        toast({
          title: "Activation Failed",
          description: error.message || 'An unexpected error occurred.',
          variant: "destructive",
        });
      }
    };

    handleActivation();
  }, [searchParams, navigate, toast]);

  const handleGoToAuth = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader />
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              {status === 'loading' && (
                <div className="bg-blue-100 rounded-full w-full h-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
              )}
              {status === 'success' && (
                <div className="bg-green-100 rounded-full w-full h-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-100 rounded-full w-full h-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {status === 'loading' && 'Activating Account...'}
              {status === 'success' && 'Account Activated!'}
              {status === 'error' && 'Activation Failed'}
            </CardTitle>
            <CardDescription>
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {status === 'success' && (
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  You will be redirected to the sign in page in a few seconds.
                </p>
                <Button onClick={handleGoToAuth} className="w-full">
                  Go to Sign In
                </Button>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Please try again or contact support if the problem persists.
                </p>
                <Button onClick={handleGoToAuth} variant="outline" className="w-full">
                  Back to Sign In
                </Button>
              </div>
            )}

            {status === 'loading' && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Please wait while we activate your account...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountActivation;
