
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
                <Link to="/upload">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-2">
                <Link to="/dashboard">View Dashboard</Link>
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
              Powerful AI tools designed specifically for educators
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to revolutionize your teaching?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators who are already using AI to create better learning experiences.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8 py-3 text-lg">
            <Link to="/upload">Start Creating Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 ELearning AI. Empowering educators with artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
