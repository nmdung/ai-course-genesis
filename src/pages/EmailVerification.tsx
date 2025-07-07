
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthHeader } from "@/components/auth/AuthHeader";
import EmailVerificationScreen from "@/components/EmailVerificationScreen";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";

  const handleBackFromVerification = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader />
        <EmailVerificationScreen 
          email={email}
          onBack={handleBackFromVerification}
        />
      </div>
    </div>
  );
};

export default EmailVerification;
