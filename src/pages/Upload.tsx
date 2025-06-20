
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const UploadPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setUploadComplete(true);
    
    toast({
      title: "Course Generated Successfully!",
      description: "Your document has been processed and course content is ready.",
    });
  };

  const handleGenerate = async () => {
    setIsProcessing(true);
    
    // Simulate course generation
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setIsProcessing(false);
    setUploadComplete(true);
    
    toast({
      title: "Course Generated Successfully!",
      description: "Your course and quiz have been created and are ready for review.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
          <p className="text-gray-600">Upload your documents and let AI generate engaging course content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Document
              </CardTitle>
              <CardDescription>
                Upload PDF, Word, or text files to generate your course content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                />
                <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX, TXT up to 10MB</p>
              </div>

              {isUploading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Uploading document...</span>
                </div>
              )}

              {isProcessing && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>AI is processing your document...</span>
                </div>
              )}

              {uploadComplete && (
                <div className="flex items-center justify-center py-4 text-green-600">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>Document processed successfully!</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configuration Section */}
          <Card className="bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Course Configuration</CardTitle>
              <CardDescription>
                Customize how your course content will be generated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  placeholder="Enter course title"
                  defaultValue="My New Course"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-description">Course Description</Label>
                <Textarea
                  id="course-description"
                  placeholder="Brief description of the course"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select defaultValue="intermediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-type">Generate</Label>
                <Select defaultValue="both">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course">Course Only</SelectItem>
                    <SelectItem value="quiz">Quiz Only</SelectItem>
                    <SelectItem value="both">Course + Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Generating Course...
                  </>
                ) : (
                  "Generate Course & Quiz"
                )}
              </Button>

              {uploadComplete && (
                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1">
                      <Link to="/dashboard">View Dashboard</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to="/course/1">Preview Course</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
