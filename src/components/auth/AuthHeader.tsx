
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-flex items-center space-x-2">
        <BookOpen className="h-10 w-10 text-blue-600" />
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ELearning AI
        </span>
      </Link>
    </div>
  );
};
