import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, Edit3, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import CoursePlanPreview from "@/components/course-generation/CoursePlanPreview";
import ChapterPreview from "@/components/course-generation/ChapterPreview";
import CourseSettings from "@/components/course-generation/CourseSettings";
import { useToast } from "@/hooks/use-toast";

type GenerationStep = "planning" | "preview" | "settings" | "complete";

const CourseGeneration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<GenerationStep>("planning");
  const [isGenerating, setIsGenerating] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  
  // Mock course data that would come from AI
  const [courseData, setCourseData] = useState({
    title: "Introduction to Machine Learning",
    description: "A comprehensive course covering ML fundamentals, algorithms, and practical applications.",
    difficulty: "intermediate",
    estimatedDuration: "8 hours",
    chapters: [
      {
        id: 1,
        title: "What is Machine Learning?",
        summary: "Introduction to machine learning concepts, types, and applications in modern technology.",
        content: "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed...",
        estimatedTime: "45 minutes",
        approved: false
      },
      {
        id: 2,
        title: "Supervised Learning",
        summary: "Understanding supervised learning algorithms including regression and classification techniques.",
        content: "Supervised learning uses labeled training data to learn a mapping function from input variables to output variables...",
        estimatedTime: "90 minutes",
        approved: false
      },
      {
        id: 3,
        title: "Unsupervised Learning",
        summary: "Exploring clustering, dimensionality reduction, and pattern recognition without labeled data.",
        content: "Unsupervised learning finds hidden patterns in data without using labeled examples...",
        estimatedTime: "75 minutes",
        approved: false
      }
    ]
  });

  const sourceType = searchParams.get("source"); // "upload" or "base-knowledge"
  const sourceFiles = searchParams.get("files"); // file names or IDs

  useEffect(() => {
    // Simulate AI course generation
    const generateCourse = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsGenerating(false);
      toast({
        title: "Course Plan Generated!",
        description: "Review the course structure and approve each chapter.",
      });
    };

    if (isGenerating) {
      generateCourse();
    }
  }, [isGenerating, toast]);

  const handleApprovePlan = () => {
    setCurrentStep("preview");
  };

  const handleApproveChapter = () => {
    const updatedChapters = [...courseData.chapters];
    updatedChapters[currentChapterIndex].approved = true;
    setCourseData(prev => ({ ...prev, chapters: updatedChapters }));

    if (currentChapterIndex < courseData.chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    } else {
      setCurrentStep("settings");
    }
  };

  const handleEditChapter = () => {
    // TODO: Open chapter editor
    toast({
      title: "Chapter Editor",
      description: "Chapter editing functionality will be available soon.",
    });
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  const handleFinalizeCourse = (settings: any) => {
    // TODO: Save course with settings
    setCurrentStep("complete");
    toast({
      title: "Course Created Successfully!",
      description: "Your course has been generated and is ready for students.",
    });
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case "planning": return 25;
      case "preview": return 50 + (currentChapterIndex / courseData.chapters.length) * 25;
      case "settings": return 90;
      case "complete": return 100;
      default: return 0;
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseData.title,
    "description": courseData.description,
    "provider": {
      "@type": "Organization",
      "name": "AI Course Genesis"
    },
    "courseMode": "online",
    "educationalLevel": courseData.difficulty,
    "timeRequired": courseData.estimatedDuration,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": "AI Course Generator"
      }
    }
  };

  if (isGenerating) {
    return (
      <>
        <SEO
          title="Generating Course - AI Course Genesis"
          description="AI is analyzing your content and creating a comprehensive course structure..."
          keywords="AI course generation, automated course creation, e-learning AI"
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 py-16">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <Loader2 className="h-16 w-16 animate-spin mx-auto text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Generating Your Course</h2>
                  <p className="text-gray-600">
                    AI is analyzing your {sourceType === "upload" ? "uploaded document" : "selected files"} and creating a comprehensive course structure...
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Processing: {sourceFiles}</div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Course Generation: ${courseData.title} - AI Course Genesis`}
        description={`Creating "${courseData.title}" - ${courseData.description}`}
        keywords="course generation, AI course creation, educational content, course planning"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Course Generation</h1>
              <Badge variant="outline" className="px-3 py-1">
                {currentStep === "planning" && "Planning"}
                {currentStep === "preview" && `Chapter ${currentChapterIndex + 1} of ${courseData.chapters.length}`}
                {currentStep === "settings" && "Settings"}
                {currentStep === "complete" && "Complete"}
              </Badge>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
          </div>

          {/* Step Content */}
          {currentStep === "planning" && (
            <CoursePlanPreview 
              courseData={courseData}
              onApprove={handleApprovePlan}
              onEdit={(field, value) => setCourseData(prev => ({ ...prev, [field]: value }))}
            />
          )}

          {currentStep === "preview" && (
            <ChapterPreview
              chapter={courseData.chapters[currentChapterIndex]}
              chapterIndex={currentChapterIndex}
              totalChapters={courseData.chapters.length}
              onApprove={handleApproveChapter}
              onEdit={handleEditChapter}
              onPrevious={handlePreviousChapter}
              canGoBack={currentChapterIndex > 0}
            />
          )}

          {currentStep === "settings" && (
            <CourseSettings
              courseData={courseData}
              onFinalize={handleFinalizeCourse}
            />
          )}

          {currentStep === "complete" && (
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                  <h2 className="text-2xl font-bold text-gray-900">Course Created Successfully!</h2>
                  <p className="text-gray-600">
                    Your course "{courseData.title}" has been generated and is ready for students.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={() => navigate("/dashboard")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Course
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseGeneration;
