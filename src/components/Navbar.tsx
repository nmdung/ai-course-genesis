
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // TODO: Replace with actual auth state
  const isAuthenticated = false;
  const userRole: "student" | "teacher" = "student"; // This can now be either value

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ELearning AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                {userRole === "teacher" && (
                  <Link to="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Create Course
                  </Link>
                )}
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Browse Courses
                </Link>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth" className="text-gray-700 hover:text-blue-600">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {userRole === "teacher" && (
                    <Link 
                      to="/upload" 
                      className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Course
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 w-fit">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Courses
                  </Link>
                  <Button asChild variant="ghost" size="sm" className="w-fit">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-fit">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
