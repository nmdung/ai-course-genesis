
import { useAuth } from "@/hooks/useAuth";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthForm } from "@/components/auth/AuthForm";
import EmailVerificationScreen from "@/components/EmailVerificationScreen";

const Auth = () => {
  const {
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
    handleBackFromVerification
  } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader />

        {showEmailVerification ? (
          <EmailVerificationScreen 
            email={verificationEmail}
            onBack={handleBackFromVerification}
          />
        ) : (
          <AuthForm
            isSignUp={isSignUp}
            isForgotPassword={isForgotPassword}
            role={role}
            setRole={setRole}
            isLoading={isLoading}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onToggleSignUp={() => setIsSignUp(!isSignUp)}
            onToggleForgotPassword={() => setIsForgotPassword(!isForgotPassword)}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
