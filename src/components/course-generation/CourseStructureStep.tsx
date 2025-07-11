
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { HelpCircle, ArrowLeft, ChevronDown, ChevronUp, Crown, Plus, Edit3, Trash2, GripVertical } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

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
                <Card key={chapter.id} className="border">
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingChapter(editingChapter === chapter.id ? null : chapter.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteChapter(chapter.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Chapter Content */}
                      {editingChapter === chapter.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Chapter Title</Label>
                            <Input
                              value={chapter.title}
                              onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
                              placeholder="Chapter title"
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={chapter.description}
                              onChange={(e) => updateChapter(chapter.id, { description: e.target.value })}
                              placeholder="Chapter description"
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <Label>Estimated Time</Label>
                              <Input
                                value={chapter.estimatedTime}
                                onChange={(e) => updateChapter(chapter.id, { estimatedTime: e.target.value })}
                                placeholder="60 minutes"
                              />
                            </div>
                            <div>
                              <Label>Quizzes</Label>
                              <Input
                                type="number"
                                min="0"
                                value={chapter.quizzes}
                                onChange={(e) => updateChapter(chapter.id, { quizzes: parseInt(e.target.value) || 0 })}
                              />
                            </div>
                            <div>
                              <Label>Assignments</Label>
                              <Input
                                type="number"
                                min="0"
                                value={chapter.assignments}
                                onChange={(e) => updateChapter(chapter.id, { assignments: parseInt(e.target.value) || 0 })}
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addSubSection(chapter.id)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Sub-section
                          </Button>
                        </div>
                        
                        {chapter.subSections.map((subSection, subIndex) => (
                          <div key={subSection.id} className="ml-6 p-3 bg-gray-50 rounded-lg">
                            {editingSubSection === subSection.id ? (
                              <div className="space-y-2">
                                <Input
                                  value={subSection.title}
                                  onChange={(e) => updateSubSection(chapter.id, subSection.id, { title: e.target.value })}
                                  placeholder="Sub-section title"
                                />
                                <Textarea
                                  value={subSection.description}
                                  onChange={(e) => updateSubSection(chapter.id, subSection.id, { description: e.target.value })}
                                  placeholder="Sub-section description"
                                  rows={2}
                                />
                                <Input
                                  value={subSection.estimatedTime}
                                  onChange={(e) => updateSubSection(chapter.id, subSection.id, { estimatedTime: e.target.value })}
                                  placeholder="15 minutes"
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => setEditingSubSection(null)}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingSubSection(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="text-sm font-medium">{chapterIndex + 1}.{subIndex + 1} {subSection.title}</h5>
                                  {subSection.description && (
                                    <p className="text-xs text-gray-600 mt-1">{subSection.description}</p>
                                  )}
                                  <span className="text-xs text-gray-500">{subSection.estimatedTime}</span>
                                </div>
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingSubSection(subSection.id)}
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteSubSection(chapter.id, subSection.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
