
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye } from "lucide-react";

interface CourseCompleteStepProps {
  courseTitle: string;
  onViewCourse: () => void;
  onBackToDashboard: () => void;
}

const CourseCompleteStep = ({
  courseTitle,
  onViewCourse,
  onBackToDashboard
}: CourseCompleteStepProps) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Course Created Successfully!</h2>
          <p className="text-gray-600">
            Your course "{courseTitle}" has been generated and is ready for students.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={onViewCourse}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Course
            </Button>
            <Button 
              variant="outline"
              onClick={onBackToDashboard}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCompleteStep;
