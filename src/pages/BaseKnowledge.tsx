
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, Loader2, CheckCircle, Trash2, Download } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const BaseKnowledgePage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  // Mock data for base knowledge files
  const baseKnowledgeFiles = [
    { 
      id: "1", 
      name: "Machine Learning Basics.pdf", 
      size: "2.3 MB", 
      uploadDate: "2024-01-15",
      description: "Comprehensive guide to ML fundamentals",
      fileType: "PDF"
    },
    { 
      id: "2", 
      name: "Python Programming Guide.docx", 
      size: "1.8 MB", 
      uploadDate: "2024-01-20",
      description: "Advanced Python programming concepts",
      fileType: "DOCX"
    },
    { 
      id: "3", 
      name: "Data Structures Notes.txt", 
      size: "856 KB", 
      uploadDate: "2024-01-25",
      description: "Complete notes on data structures and algorithms",
      fileType: "TXT"
    },
    { 
      id: "4", 
      name: "Web Development Fundamentals.pdf", 
      size: "3.1 MB", 
      uploadDate: "2024-02-01",
      description: "Frontend and backend web development basics",
      fileType: "PDF"
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setSelectedFile(null);
    setDescription("");
    
    toast({
      title: "File Uploaded Successfully!",
      description: `${selectedFile.name} has been added to your base knowledge.`,
    });
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    // Simulate delete process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "File Deleted",
      description: `${fileName} has been removed from your base knowledge.`,
    });
  };

  const formatFileSize = (bytes: string) => bytes;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Base Knowledge Management</h1>
          <p className="text-gray-600">Upload and manage your document library for course creation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Document
                </CardTitle>
                <CardDescription>
                  Add new documents to your base knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Select File</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                  />
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</p>
                </div>

                {selectedFile && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the document content"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleUpload}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Files List Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Your Base Knowledge Files</CardTitle>
                <CardDescription>
                  {baseKnowledgeFiles.length} documents in your library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {baseKnowledgeFiles.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{file.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {file.fileType}
                            </span>
                          </TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{formatDate(file.uploadDate)}</TableCell>
                          <TableCell>
                            <p className="text-sm text-gray-600 max-w-xs truncate">
                              {file.description}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 justify-end">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDelete(file.id, file.name)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {baseKnowledgeFiles.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No documents uploaded yet</p>
                    <p className="text-sm text-gray-400">Upload your first document to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseKnowledgePage;
