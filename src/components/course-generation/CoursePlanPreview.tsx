
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Edit3, CheckCircle } from "lucide-react";
import { useState } from "react";

interface CourseData {
  title: string;
  description: string;
  difficulty: string;
  estimatedDuration: string;
  chapters: Array<{
    id: number;
    title: string;
    summary: string;
    estimatedTime: string;
  }>;
}

interface CoursePlanPreviewProps {
  courseData: CourseData;
  onApprove: () => void;
  onEdit: (field: string, value: any) => void;
}

const CoursePlanPreview = ({ courseData, onApprove, onEdit }: CoursePlanPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(courseData);

  const handleSaveEdit = () => {
    onEdit("title", editedData.title);
    onEdit("description", editedData.description);
    onEdit("difficulty", editedData.difficulty);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Course Overview */}
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Overview
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Course Title</label>
                <Input
                  value={editedData.title}
                  onChange={(e) => setEditedData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={editedData.description}
                  onChange={(e) => setEditedData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit} size="sm">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-900">{courseData.title}</h3>
              <p className="text-gray-600">{courseData.description}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{courseData.estimatedDuration}</span>
                </div>
                <Badge variant="secondary">{courseData.difficulty}</Badge>
                <span>{courseData.chapters.length} chapters</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Chapter List */}
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle>Course Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courseData.chapters.map((chapter, index) => (
              <div key={chapter.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                      <p className="text-sm text-gray-600">{chapter.summary}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{chapter.estimatedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Approval Actions */}
      <div className="flex justify-between">
        <Button variant="outline">
          Generate Different Plan
        </Button>
        <Button 
          onClick={onApprove}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve Plan & Continue
        </Button>
      </div>
    </div>
  );
};

export default CoursePlanPreview;
