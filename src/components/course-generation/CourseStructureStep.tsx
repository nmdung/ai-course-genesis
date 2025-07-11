
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowLeft, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { ChapterCard } from "./chapter/ChapterCard";
import { AdvancedSettings } from "./chapter/AdvancedSettings";

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

interface CourseStructure {
  chapters: Chapter[];
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
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [editingSubSection, setEditingSubSection] = useState<string | null>(null);
  const isPaidUser = false; // This would come from your auth/subscription context

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: `Chapter ${courseStructure.chapters.length + 1}`,
      description: "",
      estimatedTime: "60 minutes",
      subSections: [],
      quizzes: 1,
      assignments: 0
    };
    
    setCourseStructure({
      ...courseStructure,
      chapters: [...courseStructure.chapters, newChapter]
    });
    setEditingChapter(newChapter.id);
  };

  const updateChapter = (chapterId: string, updates: Partial<Chapter>) => {
    setCourseStructure({
      ...courseStructure,
      chapters: courseStructure.chapters.map(chapter =>
        chapter.id === chapterId ? { ...chapter, ...updates } : chapter
      )
    });
  };

  const deleteChapter = (chapterId: string) => {
    setCourseStructure({
      ...courseStructure,
      chapters: courseStructure.chapters.filter(chapter => chapter.id !== chapterId)
    });
  };

  const addSubSection = (chapterId: string) => {
    const chapter = courseStructure.chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    const newSubSection: SubSection = {
      id: `subsection-${Date.now()}`,
      title: `${chapter.subSections.length + 1}.1 New Sub-section`,
      description: "",
      estimatedTime: "15 minutes"
    };

    updateChapter(chapterId, {
      subSections: [...chapter.subSections, newSubSection]
    });
    setEditingSubSection(newSubSection.id);
  };

  const updateSubSection = (chapterId: string, subSectionId: string, updates: Partial<SubSection>) => {
    const chapter = courseStructure.chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    const updatedSubSections = chapter.subSections.map(sub =>
      sub.id === subSectionId ? { ...sub, ...updates } : sub
    );

    updateChapter(chapterId, { subSections: updatedSubSections });
  };

  const deleteSubSection = (chapterId: string, subSectionId: string) => {
    const chapter = courseStructure.chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    updateChapter(chapterId, {
      subSections: chapter.subSections.filter(sub => sub.id !== subSectionId)
    });
  };

  const handleAdvancedChange = (field: keyof CourseStructure, value: boolean) => {
    if (field === 'generateAIImages' && !isPaidUser) {
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
              <p>Define your course structure by adding chapters, sub-sections, quizzes, and assignments. Each chapter can have multiple sub-sections with their own content and timing.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chapters List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Chapters</h3>
            <Button onClick={addChapter} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Chapter
            </Button>
          </div>

          {courseStructure.chapters.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No chapters added yet. Click "Add Chapter" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {courseStructure.chapters.map((chapter, chapterIndex) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  chapterIndex={chapterIndex}
                  isEditing={editingChapter === chapter.id}
                  editingSubSection={editingSubSection}
                  onEdit={() => setEditingChapter(editingChapter === chapter.id ? null : chapter.id)}
                  onDelete={() => deleteChapter(chapter.id)}
                  onUpdate={(updates) => updateChapter(chapter.id, updates)}
                  onAddSubSection={() => addSubSection(chapter.id)}
                  onUpdateSubSection={(subSectionId, updates) => updateSubSection(chapter.id, subSectionId, updates)}
                  onDeleteSubSection={(subSectionId) => deleteSubSection(chapter.id, subSectionId)}
                  onEditSubSection={setEditingSubSection}
                />
              ))}
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
          <AdvancedSettings
            courseStructure={courseStructure}
            isPaidUser={isPaidUser}
            onAdvancedChange={handleAdvancedChange}
          />
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
            disabled={courseStructure.chapters.length === 0}
          >
            Next: Planning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseStructureStep;
