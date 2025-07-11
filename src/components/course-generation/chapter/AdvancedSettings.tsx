
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Crown } from "lucide-react";

interface CourseStructure {
  chapters: any[];
  courseSummary: boolean;
  generateAIImages: boolean;
}

interface AdvancedSettingsProps {
  courseStructure: CourseStructure;
  isPaidUser: boolean;
  onAdvancedChange: (field: keyof CourseStructure, value: boolean) => void;
}

export const AdvancedSettings = ({
  courseStructure,
  isPaidUser,
  onAdvancedChange
}: AdvancedSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="courseSummary">Course Summary</Label>
          <p className="text-sm text-gray-500">Generate a summary for the course</p>
        </div>
        <Switch
          id="courseSummary"
          checked={courseStructure.courseSummary}
          onCheckedChange={(checked) => onAdvancedChange('courseSummary', checked)}
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
          onCheckedChange={(checked) => onAdvancedChange('generateAIImages', checked)}
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
  );
};
