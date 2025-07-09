
import { useNavigate, useSearchParams } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import CoursePlanPreview from "@/components/course-generation/CoursePlanPreview";
import ChapterPreview from "@/components/course-generation/ChapterPreview";
import CourseSettings from "@/components/course-generation/CourseSettings";
import CourseDescriptionStep from "@/components/course-generation/CourseDescriptionStep";
import CourseSourceStep from "@/components/course-generation/CourseSourceStep";
import CourseCompleteStep from "@/components/course-generation/CourseCompleteStep";
import CourseGenerationProgress from "@/components/course-generation/CourseGenerationProgress";
import CourseGenerationLoading from "@/components/course-generation/CourseGenerationLoading";
import { useCourseGeneration } from "@/hooks/useCourseGeneration";

const CourseGeneration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const {
    currentStep,
    isGenerating,
    currentChapterIndex,
    courseDescription,
    sourceType,
    sourceFiles,
    courseData,
    setCourseDescription,
    setCourseData,
    handleDescribeNext,
    handleSourceNext,
    handleSourceBack,
    handleApprovePlan,
    handleApproveChapter,
    handleEditChapter,
    handlePreviousChapter,
    handleFinalizeCourse
  } = useCourseGeneration();

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
    return <CourseGenerationLoading />;
  }

  return (
    <TooltipProvider>
      <SEO
        title={`Course Generation: ${courseData.title} - AI Course Genesis`}
        description={`Creating "${courseData.title}" - ${courseData.description}`}
        keywords="course generation, AI course creation, educational content, course planning"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          <CourseGenerationProgress
            currentStep={currentStep}
            currentChapterIndex={currentChapterIndex}
            totalChapters={courseData.chapters.length}
          />

          {/* Step Content */}
          {currentStep === "describe" && (
            <CourseDescriptionStep
              courseDescription={courseDescription}
              setCourseDescription={setCourseDescription}
              sourceType={null}
              sourceFiles={null}
              onNext={handleDescribeNext}
            />
          )}

          {currentStep === "source" && (
            <CourseSourceStep
              onNext={handleSourceNext}
              onBack={handleSourceBack}
            />
          )}

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
            <CourseCompleteStep
              courseTitle={courseData.title}
              onViewCourse={() => navigate("/dashboard")}
              onBackToDashboard={() => navigate("/dashboard")}
            />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CourseGeneration;
