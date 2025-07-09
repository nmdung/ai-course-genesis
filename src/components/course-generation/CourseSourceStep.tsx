
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle, Database, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CourseSourceStepProps {
  onNext: (sourceType: string, sourceFiles: string) => void;
  onBack: () => void;
}

const CourseSourceStep = ({ onNext, onBack }: CourseSourceStepProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const { toast } = useToast();

  // Mock data for base knowledge files
  const baseKnowledgeFiles = [
    { id: "1", name: "Machine Learning Basics.pdf", size: "2.3 MB", uploadDate: "2024-01-15" },
    { id: "2", name: "Python Programming Guide.docx", size: "1.8 MB", uploadDate: "2024-01-20" },
    { id: "3", name: "Data Structures Notes.txt", size: "856 KB", uploadDate: "2024-01-25" },
    { id: "4", name: "Web Development Fundamentals.pdf", size: "3.1 MB", uploadDate: "2024-02-01" },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadedFileName(file.name);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setUploadComplete(true);
    
    toast({
      title: "Document Uploaded Successfully!",
      description: "Ready to generate course content.",
    });
  };

  const handleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleNextFromUpload = () => {
    if (!uploadComplete) {
      toast({
        title: "No File Uploaded",
        description: "Please upload a document first.",
        variant: "destructive",
      });
      return;
    }
    onNext("upload", uploadedFileName);
  };

  const handleNextFromBaseKnowledge = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file from your base knowledge.",
        variant: "destructive",
      });
      return;
    }

    const selectedFileNames = baseKnowledgeFiles
      .filter(file => selectedFiles.includes(file.id))
      .map(file => file.name)
      .join(', ');

    onNext("base-knowledge", selectedFileNames);
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Source Material</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            <TabsTrigger value="base-knowledge">From Base Knowledge</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
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
                <span>Document "{uploadedFileName}" processed successfully!</span>
              </div>
            )}

            <div className="flex gap-4 justify-between">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button 
                onClick={handleNextFromUpload}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={!uploadComplete}
              >
                Continue with Upload
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="base-knowledge" className="space-y-4">
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
            </div>

            <div className="flex gap-4 justify-between">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button 
                onClick={handleNextFromBaseKnowledge}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={selectedFiles.length === 0}
              >
                Continue with Selected Files
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CourseSourceStep;
