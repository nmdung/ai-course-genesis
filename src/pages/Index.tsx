
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, FileText, Users, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Document Upload",
      description: "Upload PDFs, Word docs, and text files to generate comprehensive courses"
    },
    {
      icon: <Brain className="h-8 w-8 text-green-600" />,
      title: "AI-Powered Generation",
      description: "Advanced AI transforms your content into structured learning materials"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "Course Creation",
      description: "Automatically generate organized courses with chapters and sections"
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Quiz Generation",
      description: "Create engaging quizzes and assessments from your content"
    },
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      title: "Student Management",
      description: "Track progress and manage your students' learning journey"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-rose-600" />,
      title: "Assessment Tools",
      description: "Comprehensive evaluation tools to measure learning outcomes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
              ELearning AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your documents into engaging courses and quizzes with the power of AI. 
              Create comprehensive learning experiences in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-2">
                <Link to="/dashboard">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to create amazing courses
            </h2>
            <p className="text-xl text-gray-600">
              Powerful AI tools designed specifically for educators and learners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Teachers */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <BookOpen className="h-8 w-8 mr-3" />
                  For Educators
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Create engaging courses from your existing materials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-blue-100">
                  <li>• Upload documents and generate courses instantly</li>
                  <li>• Manage your knowledge base efficiently</li>
                  <li>• Create public, private, or paid content</li>
                  <li>• Track student progress and engagement</li>
                </ul>
                <Button asChild variant="secondary" size="lg" className="w-full">
                  <Link to="/auth">Start Teaching</Link>
                </Button>
              </CardContent>
            </Card>

            {/* For Students */}
            <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Users className="h-8 w-8 mr-3" />
                  For Learners
                </CardTitle>
                <CardDescription className="text-green-100">
                  Access a world of knowledge and interactive learning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-green-100">
                  <li>• Browse thousands of AI-generated courses</li>
                  <li>• Take interactive quizzes and assessments</li>
                  <li>• Learn at your own pace</li>
                  <li>• Track your learning progress</li>
                </ul>
                <Button asChild variant="secondary" size="lg" className="w-full">
                  <Link to="/auth">Start Learning</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 ELearning AI. Empowering educators and learners with artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
