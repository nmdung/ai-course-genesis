
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CourseTargetAudienceStepProps {
  targetAudience: string;
  setTargetAudience: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CourseTargetAudienceStep = ({
  targetAudience,
  setTargetAudience,
  onNext,
  onBack
}: CourseTargetAudienceStepProps) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl">Describe Your Learner</CardTitle>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>Define your learner as specifically as you can. This will inform how to personalise the course and assessments.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="target-audience">Target Audience Description</Label>
          <Textarea
            id="target-audience"
            placeholder="Describe your target learner in detail. What's their background? What level of knowledge do they have? What are their goals and motivations? Any specific characteristics that should influence the course design?"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="min-h-[200px] resize-none"
          />
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={!targetAudience.trim()}
          >
            Next: Planning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTargetAudienceStep;
