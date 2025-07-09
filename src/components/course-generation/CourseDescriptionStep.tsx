
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CourseDescriptionStepProps {
  courseDescription: string;
  setCourseDescription: (value: string) => void;
  sourceType: string | null;
  sourceFiles: string | null;
  onNext: () => void;
}

const CourseDescriptionStep = ({
  courseDescription,
  setCourseDescription,
  onNext
}: CourseDescriptionStepProps) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl">Describe Your Course</CardTitle>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>Describe the course you'd like us to build. You can keep it simple or write pages of instructions including tone of voice, style and notes on the structure.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="course-description">Course Description</Label>
          <Textarea
            id="course-description"
            placeholder="Describe your course in detail. What should students learn? What's the target audience? Any specific requirements or structure you have in mind?"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="min-h-[200px] resize-none"
          />
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={!courseDescription.trim()}
          >
            Next: Choose Source Material
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseDescriptionStep;
