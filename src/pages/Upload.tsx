import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Loader2, CheckCircle, Database, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const UploadPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for base knowledge files
  const baseKnowledgeFiles = [
    { id: "1", name: "Machine Learning Basics.pdf", size: "2.3 MB", uploadDate: "2024-01-15" },
    { id: "2", name: "Python Programming Guide.docx", size: "1.8 MB", uploadDate: "2024-01-20" },
    { id: "3", name: "Data Structures Notes.txt", size: "856 KB", uploadDate: "2024-01-25" },
    { id: "4", name: "Web Development Fundamentals.pdf", size: "3.1 MB", uploadDate: "2024-02-01" },
  ];

  const handleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setUploadComplete(true);
    
    toast({
      title: "Document Uploaded Successfully!",
      description: "Ready to generate course content.",
    });
  };

  const handleGenerateFromUpload = async () => {
    // Redirect to course generation page with upload source
    navigate(`/course-generation?source=upload&files=uploaded-document.pdf`);
  };

  const handleGenerateFromBaseKnowledge = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file from your base knowledge.",
        variant: "destructive",
      });
      return;
    }

    // Get selected file names for URL
    const selectedFileNames = baseKnowledgeFiles
      .filter(file => selectedFiles.includes(file.id))
      .map(file => file.name)
      .join(',');

    // Redirect to course generation page with base knowledge source
    navigate(`/course-generation?source=base-knowledge&files=${encodeURIComponent(selectedFileNames)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
          <p className="text-gray-600">Upload documents or select from your base knowledge to generate course content</p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            <TabsTrigger value="base-knowledge">From Base Knowledge</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
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
                    onClick={handleGenerateFromUpload}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!uploadComplete}
                  >
                    Generate Course & Quiz
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="base-knowledge">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Base Knowledge Files Selection */}
              <Card className="bg-white/70 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Select from Base Knowledge
                  </CardTitle>
                  <CardDescription>
                    Select files from your uploaded base knowledge to create a new course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {baseKnowledgeFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedFiles.includes(file.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleFileSelection(file.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedFiles.includes(file.id)}
                              onChange={() => handleFileSelection(file.id)}
                              className="h-4 w-4 text-blue-600"
                            />
                            <FileText className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size} • {file.uploadDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedFiles.length} file(s) selected
                    </p>
                    <Button 
                      onClick={handleGenerateFromBaseKnowledge}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={selectedFiles.length === 0}
                    >
                      Generate Course from Selected Files
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Course Configuration for Base Knowledge */}
              <Card className="bg-white/70 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Course Configuration</CardTitle>
                  <CardDescription>
                    Customize how your course content will be generated from selected files
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bk-course-title">Course Title</Label>
                    <Input
                      id="bk-course-title"
                      placeholder="Enter course title"
                      defaultValue="My New Course"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bk-course-description">Course Description</Label>
                    <Textarea
                      id="bk-course-description"
                      placeholder="Brief description of the course"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bk-difficulty">Difficulty Level</Label>
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
                    <Label htmlFor="bk-content-type">Generate</Label>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UploadPage;
