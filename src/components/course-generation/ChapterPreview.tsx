
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Edit3, ArrowLeft, Clock } from "lucide-react";

interface Chapter {
  id: number;
  title: string;
  summary: string;
  content: string;
  estimatedTime: string;
  approved: boolean;
}

interface ChapterPreviewProps {
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  onApprove: () => void;
  onEdit: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
}

const ChapterPreview = ({ 
  chapter, 
  chapterIndex, 
  totalChapters, 
  onApprove, 
  onEdit, 
  onPrevious, 
  canGoBack 
}: ChapterPreviewProps) => {
  return (
    <div className="space-y-6">
      {/* Chapter Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">
            Chapter {chapterIndex + 1} of {totalChapters}
          </Badge>
          <h2 className="text-2xl font-bold text-gray-900">{chapter.title}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Clock className="h-4 w-4" />
            <span>{chapter.estimatedTime}</span>
          </div>
        </div>
        {chapter.approved && (
          <CheckCircle className="h-8 w-8 text-green-600" />
        )}
      </div>

      {/* Chapter Summary */}
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg">Chapter Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{chapter.summary}</p>
        </CardContent>
      </Card>

      {/* Chapter Content Preview */}
      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle className="text-lg">Content Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed">{chapter.content}</p>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> This is a preview of the chapter content. The full content will include interactive elements, examples, and exercises.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          {canGoBack && (
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Chapter
            </Button>
          )}
          <Button variant="outline" onClick={onEdit}>
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Chapter
          </Button>
        </div>
        <Button 
          onClick={onApprove}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {chapterIndex === totalChapters - 1 ? "Approve & Continue" : "Approve & Next"}
        </Button>
      </div>
    </div>
  );
};

export default ChapterPreview;
