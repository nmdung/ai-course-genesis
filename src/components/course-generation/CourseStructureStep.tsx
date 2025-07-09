
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { HelpCircle, ArrowLeft, ChevronDown, ChevronUp, Crown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

interface CourseStructure {
  sections: number;
  pagesPerSection: number;
  quizzesPerSection: number;
  questionsPerQuiz: number;
  courseSummary: boolean;
  generateAIImages: boolean;
}

interface CourseStructureStepProps {
  courseStructure: CourseStructure;
  setCourseStructure: (value: CourseStructure) => void;
  onNext: () => void;
  onBack: () => void;
}

const CourseStructureStep = ({
  courseStructure,
  setCourseStructure,
  onNext,
  onBack
}: CourseStructureStepProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const isPaidUser = false; // This would come from your auth/subscription context

  const handleBasicChange = (field: keyof CourseStructure, value: number) => {
    if (!isPaidUser) {
      // Show upgrade prompt or toast
      return;
    }
    setCourseStructure({
      ...courseStructure,
      [field]: value
    });
  };

  const handleAdvancedChange = (field: keyof CourseStructure, value: boolean) => {
    if (field === 'generateAIImages' && !isPaidUser) {
      // Show upgrade prompt or toast
      return;
    }
    setCourseStructure({
      ...courseStructure,
      [field]: value
    });
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl">Course Structure</CardTitle>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>If you have uploaded your own course outline select it now. If not, define how you'd like to structure your course as sections and pages of content, as well as quizzes and assignments. Click Advanced Settings to be more specific about page length, interactivity, AI image generation and more.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Settings</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="sections">Sections</Label>
                {!isPaidUser && <Crown className="h-4 w-4 text-yellow-500" />}
              </div>
              <Input
                id="sections"
                type="number"
                min="1"
                value={courseStructure.sections}
                onChange={(e) => handleBasicChange('sections', parseInt(e.target.value) || 1)}
                disabled={!isPaidUser}
                className={!isPaidUser ? "bg-gray-100 cursor-not-allowed" : ""}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="pagesPerSection">Pages per Section</Label>
                {!isPaidUser && <Crown className="h-4 w-4 text-yellow-500" />}
              </div>
              <Input
                id="pagesPerSection"
                type="number"
                min="1"
                value={courseStructure.pagesPerSection}
                onChange={(e) => handleBasicChange('pagesPerSection', parseInt(e.target.value) || 1)}
                disabled={!isPaidUser}
                className={!isPaidUser ? "bg-gray-100 cursor-not-allowed" : ""}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="quizzesPerSection">Quizzes per Section</Label>
                {!isPaidUser && <Crown className="h-4 w-4 text-yellow-500" />}
              </div>
              <Input
                id="quizzesPerSection"
                type="number"
                min="0"
                value={courseStructure.quizzesPerSection}
                onChange={(e) => handleBasicChange('quizzesPerSection', parseInt(e.target.value) || 0)}
                disabled={!isPaidUser}
                className={!isPaidUser ? "bg-gray-100 cursor-not-allowed" : ""}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="questionsPerQuiz">Questions per Quiz</Label>
                {!isPaidUser && <Crown className="h-4 w-4 text-yellow-500" />}
              </div>
              <Input
                id="questionsPerQuiz"
                type="number"
                min="1"
                value={courseStructure.questionsPerQuiz}
                onChange={(e) => handleBasicChange('questionsPerQuiz', parseInt(e.target.value) || 1)}
                disabled={!isPaidUser}
                className={!isPaidUser ? "bg-gray-100 cursor-not-allowed" : ""}
              />
            </div>
          </div>

          {!isPaidUser && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-700 flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Upgrade to Pro to customize basic settings
              </p>
            </div>
          )}
        </div>

        {/* Advanced Settings Toggle */}
        <div className="border-t pt-4">
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Advanced Settings
          </Button>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="courseSummary">Course Summary</Label>
                <p className="text-sm text-gray-500">Generate a summary for the course</p>
              </div>
              <Switch
                id="courseSummary"
                checked={courseStructure.courseSummary}
                onCheckedChange={(checked) => handleAdvancedChange('courseSummary', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="generateAIImages">Generate AI Images</Label>
                  {!isPaidUser && <Crown className="h-4 w-4 text-yellow-500" />}
                </div>
                <p className="text-sm text-gray-500">Automatically generate images for course content</p>
              </div>
              <Switch
                id="generateAIImages"
                checked={courseStructure.generateAIImages}
                onCheckedChange={(checked) => handleAdvancedChange('generateAIImages', checked)}
                disabled={!isPaidUser}
              />
            </div>

            {!isPaidUser && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-700 flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Upgrade to Pro to enable AI image generation
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4">
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
          >
            Next: Planning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseStructureStep;
