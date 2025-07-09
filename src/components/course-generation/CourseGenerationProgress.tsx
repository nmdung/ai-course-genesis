
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type GenerationStep = "describe" | "source" | "learner" | "structure" | "planning" | "preview" | "settings" | "complete";

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
      case "source": return 20;
      case "learner": return 30;
      case "structure": return 40;
      case "planning": return 55;
      case "preview": return 70 + (currentChapterIndex / totalChapters) * 15;
      case "settings": return 90;
      case "complete": return 100;
      default: return 0;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "describe": return "Step 1 of 7: Describe Your Course";
      case "source": return "Step 2 of 7: Choose Source Material";
      case "learner": return "Step 3 of 7: Describe Your Learner";
      case "structure": return "Step 4 of 7: Course Structure";
      case "planning": return "Step 5 of 7: Planning";
      case "preview": return `Step 6 of 7: Chapter ${currentChapterIndex + 1} of ${totalChapters}`;
      case "settings": return "Step 7 of 7: Settings";
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
