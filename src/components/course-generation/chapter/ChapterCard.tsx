
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Trash2, GripVertical, Plus } from "lucide-react";
import { SubSectionItem } from "./SubSectionItem";

interface SubSection {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  subSections: SubSection[];
  quizzes: number;
  assignments: number;
}

interface ChapterCardProps {
  chapter: Chapter;
  chapterIndex: number;
  isEditing: boolean;
  editingSubSection: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Chapter>) => void;
  onAddSubSection: () => void;
  onUpdateSubSection: (subSectionId: string, updates: Partial<SubSection>) => void;
  onDeleteSubSection: (subSectionId: string) => void;
  onEditSubSection: (subSectionId: string | null) => void;
}

export const ChapterCard = ({
  chapter,
  chapterIndex,
  isEditing,
  editingSubSection,
  onEdit,
  onDelete,
  onUpdate,
  onAddSubSection,
  onUpdateSubSection,
  onDeleteSubSection,
  onEditSubSection
}: ChapterCardProps) => {
  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Chapter Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                {chapterIndex + 1}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chapter Content */}
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <Label>Chapter Title</Label>
                <Input
                  value={chapter.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="Chapter title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={chapter.description}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Chapter description"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Estimated Time</Label>
                  <Input
                    value={chapter.estimatedTime}
                    onChange={(e) => onUpdate({ estimatedTime: e.target.value })}
                    placeholder="60 minutes"
                  />
                </div>
                <div>
                  <Label>Quizzes</Label>
                  <Input
                    type="number"
                    min="0"
                    value={chapter.quizzes}
                    onChange={(e) => onUpdate({ quizzes: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Assignments</Label>
                  <Input
                    type="number"
                    min="0"
                    value={chapter.assignments}
                    onChange={(e) => onUpdate({ assignments: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="font-medium text-gray-900">{chapter.title}</h4>
              {chapter.description && (
                <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
              )}
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>{chapter.estimatedTime}</span>
                <span>{chapter.quizzes} quiz{chapter.quizzes !== 1 ? 'es' : ''}</span>
                <span>{chapter.assignments} assignment{chapter.assignments !== 1 ? 's' : ''}</span>
              </div>
            </div>
          )}

          {/* Sub-sections */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Sub-sections</Label>
              <Button variant="ghost" size="sm" onClick={onAddSubSection}>
                <Plus className="h-3 w-3 mr-1" />
                Add Sub-section
              </Button>
            </div>
            
            {chapter.subSections.map((subSection, subIndex) => (
              <SubSectionItem
                key={subSection.id}
                subSection={subSection}
                chapterIndex={chapterIndex}
                subIndex={subIndex}
                isEditing={editingSubSection === subSection.id}
                onUpdate={(updates) => onUpdateSubSection(subSection.id, updates)}
                onDelete={() => onDeleteSubSection(subSection.id)}
                onEdit={() => onEditSubSection(subSection.id)}
                onSave={() => onEditSubSection(null)}
                onCancel={() => onEditSubSection(null)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
