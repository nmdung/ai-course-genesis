
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, LogIn, User, LogOut, Database, Info, Moon, Sun, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  
  // TODO: Replace with actual auth state
  const isAuthenticated = true; // Changed to true for demo
  const userRole: "student" | "teacher" = "teacher"; // Default to teacher
  
  // Mock user data - replace with actual user data from auth context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log("Logging out...");
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
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
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('dashboard')}
                </Link>
                {userRole === "teacher" && (
                  <Link to="/course-generation" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('createCourse')}
                  </Link>
                )}
                
                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || undefined} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('profile')}</span>
                      </Link>
                    </DropdownMenuItem>
                    {userRole === "teacher" && (
                      <DropdownMenuItem asChild>
                        <Link to="/base-knowledge" className="w-full cursor-pointer">
                          <Database className="mr-2 h-4 w-4" />
                          <span>{t('baseKnowledge')}</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    
                    {/* Theme Toggle */}
                    <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.preventDefault()}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          {theme === 'light' ? (
                            <Sun className="mr-2 h-4 w-4" />
                          ) : (
                            <Moon className="mr-2 h-4 w-4" />
                          )}
                          <span>{t('theme')}</span>
                        </div>
                        <Switch
                          checked={theme === 'dark'}
                          onCheckedChange={toggleTheme}
                        />
                      </div>
                    </DropdownMenuItem>
                    
                    {/* Language Toggle */}
                    <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.preventDefault()}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          <span>{t('language')}</span>
                        </div>
                        <Switch
                          checked={language === 'en'}
                          onCheckedChange={toggleLanguage}
                        />
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Info className="mr-2 h-4 w-4" />
                      <span>{t('appVersion')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('browseCourses')}
                </Link>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <LogIn className="h-4 w-4 mr-2" />
                    {t('signIn')}
                  </Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/auth">{t('getStarted')}</Link>
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
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  {/* Mobile User Profile */}
                  <div className="flex items-center space-x-3 px-2 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || undefined} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                  {userRole === "teacher" && (
                    <Link 
                      to="/course-generation" 
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('createCourse')}
                    </Link>
                  )}
                  
                  <Link 
                    to="/profile" 
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('profile')}
                  </Link>
                  
                  {userRole === "teacher" && (
                    <Link 
                      to="/base-knowledge" 
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Database className="h-4 w-4 mr-2" />
                      {t('baseKnowledge')}
                    </Link>
                  )}
                  
                  {/* Mobile Theme Toggle */}
                  <div className="flex items-center justify-between px-2 py-1">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      {theme === 'light' ? (
                        <Sun className="h-4 w-4 mr-2" />
                      ) : (
                        <Moon className="h-4 w-4 mr-2" />
                      )}
                      {t('theme')}
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                  
                  {/* Mobile Language Toggle */}
                  <div className="flex items-center justify-between px-2 py-1">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Globe className="h-4 w-4 mr-2" />
                      {t('language')}
                    </div>
                    <Switch
                      checked={language === 'en'}
                      onCheckedChange={toggleLanguage}
                    />
                  </div>
                  
                  <div className="text-gray-500 dark:text-gray-400 px-2 py-1 text-sm flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    {t('appVersion')}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-600 w-fit flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('browseCourses')}
                  </Link>
                  <Button asChild variant="ghost" size="sm" className="w-fit">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      {t('signIn')}
                    </Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-fit">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>{t('getStarted')}</Link>
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
