
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, FileText, Users, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: t('documentUpload'),
      description: t('documentUploadDesc')
    },
    {
      icon: <Brain className="h-8 w-8 text-green-600" />,
      title: t('aiPowered'),
      description: t('aiPoweredDesc')
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: t('courseCreation'),
      description: t('courseCreationDesc')
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: t('quizGeneration'),
      description: t('quizGenerationDesc')
    },
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      title: t('studentManagement'),
      description: t('studentManagementDesc')
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-rose-600" />,
      title: t('assessmentTools'),
      description: t('assessmentToolsDesc')
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Course Genesis",
    "description": "Transform your documents into engaging courses with AI. Create, manage, and share educational content effortlessly.",
    "url": window.location.origin,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI-powered course generation",
      "Document upload and processing",
      "Interactive quiz creation",
      "Student management system",
      "Multi-language support"
    ]
  };

  return (
    <>
      <SEO
        title="AI Course Genesis - Transform Documents into Engaging Courses"
        description="Create professional courses from your documents using AI. Upload files, generate content, and manage students with our intelligent e-learning platform."
        keywords="AI course creation, e-learning platform, document to course, educational AI, online course builder, teaching tools"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                  <Link to="/auth">{t('getStarted')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-2">
                  <Link to="/dashboard">{t('browseCourses')}</Link>
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
                {t('featuresTitle')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('featuresSubtitle')}
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
                    {t('forEducators')}
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    {t('forEducatorsDesc')}
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
                    <Link to="/auth">{t('startTeaching')}</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* For Students */}
              <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Users className="h-8 w-8 mr-3" />
                    {t('forLearners')}
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    {t('forLearnersDesc')}
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
                    <Link to="/auth">{t('startLearning')}</Link>
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
    </>
  );
};

export default Index;
