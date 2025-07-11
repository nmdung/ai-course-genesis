
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Trash2 } from "lucide-react";

interface SubSection {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
}

interface SubSectionItemProps {
  subSection: SubSection;
  chapterIndex: number;
  subIndex: number;
  isEditing: boolean;
  onUpdate: (updates: Partial<SubSection>) => void;
  onDelete: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const SubSectionItem = ({
  subSection,
  chapterIndex,
  subIndex,
  isEditing,
  onUpdate,
  onDelete,
  onEdit,
  onSave,
  onCancel
}: SubSectionItemProps) => {
  return (
    <div className="ml-6 p-3 bg-gray-50 rounded-lg">
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={subSection.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Sub-section title"
          />
          <Textarea
            value={subSection.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Sub-section description"
            rows={2}
          />
          <Input
            value={subSection.estimatedTime}
            onChange={(e) => onUpdate({ estimatedTime: e.target.value })}
            placeholder="15 minutes"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={onSave}>
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h5 className="text-sm font-medium">
              {chapterIndex + 1}.{subIndex + 1} {subSection.title}
            </h5>
            {subSection.description && (
              <p className="text-xs text-gray-600 mt-1">{subSection.description}</p>
            )}
            <span className="text-xs text-gray-500">{subSection.estimatedTime}</span>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
