
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type GenerationStep = "describe" | "planning" | "preview" | "settings" | "complete";

interface CourseGenerationProgressProps {
  currentStep: GenerationStep;
  currentChapterIndex: number;
  totalChapters: number;
}

const CourseGenerationProgress = ({
  currentStep,
  currentChapterIndex,
  totalChapters
}: CourseGenerationProgressProps) => {
  const getStepProgress = () => {
    switch (currentStep) {
      case "describe": return 10;
      case "planning": return 25;
      case "preview": return 50 + (currentChapterIndex / totalChapters) * 25;
      case "settings": return 90;
      case "complete": return 100;
      default: return 0;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "describe": return "Step 1 of 4: Describe Your Course";
      case "planning": return "Step 2 of 4: Planning";
      case "preview": return `Step 3 of 4: Chapter ${currentChapterIndex + 1} of ${totalChapters}`;
      case "settings": return "Step 4 of 4: Settings";
      case "complete": return "Complete";
      default: return "";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Course Generation</h1>
        <Badge variant="outline" className="px-3 py-1">
          {getStepTitle()}
        </Badge>
      </div>
      <Progress value={getStepProgress()} className="h-2" />
    </div>
  );
};

export default CourseGenerationProgress;
