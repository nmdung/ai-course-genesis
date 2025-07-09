
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

const CourseGenerationLoading = () => {
  return (
    <>
      <SEO
        title="Generating Course - AI Course Genesis"
        description="AI is analyzing your content and creating a comprehensive course structure..."
        keywords="AI course generation, automated course creation, e-learning AI"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="bg-white/70 backdrop-blur-sm border-0">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <Loader2 className="h-16 w-16 animate-spin mx-auto text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Generating Your Course</h2>
                <p className="text-gray-600">
                  AI is analyzing your description and creating a comprehensive course structure...
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Processing your course description</div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CourseGenerationLoading;
