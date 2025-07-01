
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Globe, Lock, CreditCard, Settings } from "lucide-react";
import { useState } from "react";

interface CourseData {
  title: string;
  description: string;
  difficulty: string;
  estimatedDuration: string;
  chapters: any[];
}

interface CourseSettings {
  visibility: "public" | "private" | "paid";
  price?: number;
  currency: string;
  category: string;
  tags: string[];
  prerequisites: string;
  learningObjectives: string[];
  generateQuiz: boolean;
  allowComments: boolean;
  allowRatings: boolean;
}

interface CourseSettingsProps {
  courseData: CourseData;
  onFinalize: (settings: CourseSettings) => void;
}

const CourseSettingsComponent = ({ courseData, onFinalize }: CourseSettingsProps) => {
  const [settings, setSettings] = useState<CourseSettings>({
    visibility: "public",
    currency: "USD",
    category: "Technology",
    tags: [],
    prerequisites: "",
    learningObjectives: [],
    generateQuiz: true,
    allowComments: true,
    allowRatings: true,
  });

  const [tagInput, setTagInput] = useState("");
  const [objectiveInput, setObjectiveInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !settings.tags.includes(tagInput.trim())) {
      setSettings(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSettings(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddObjective = () => {
    if (objectiveInput.trim() && !settings.learningObjectives.includes(objectiveInput.trim())) {
      setSettings(prev => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, objectiveInput.trim()]
      }));
      setObjectiveInput("");
    }
  };

  const handleRemoveObjective = (objectiveToRemove: string) => {
    setSettings(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter(obj => obj !== objectiveToRemove)
    }));
  };

  const handleFinalize = () => {
    onFinalize(settings);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Settings</h2>
        <p className="text-gray-600">Configure your course visibility, pricing, and additional settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visibility & Pricing */}
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Visibility & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                   onClick={() => setSettings(prev => ({ ...prev, visibility: "public" }))}>
                <input
                  type="radio"
                  name="visibility"
                  checked={settings.visibility === "public"}
                  onChange={() => setSettings(prev => ({ ...prev, visibility: "public" }))}
                  className="h-4 w-4 text-blue-600"
                />
                <Globe className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Public</div>
                  <div className="text-sm text-gray-500">Anyone can access this course</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                   onClick={() => setSettings(prev => ({ ...prev, visibility: "private" }))}>
                <input
                  type="radio"
                  name="visibility"
                  checked={settings.visibility === "private"}
                  onChange={() => setSettings(prev => ({ ...prev, visibility: "private" }))}
                  className="h-4 w-4 text-blue-600"
                />
                <Lock className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium">Private</div>
                  <div className="text-sm text-gray-500">Only logged-in users can access</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                   onClick={() => setSettings(prev => ({ ...prev, visibility: "paid" }))}>
                <input
                  type="radio"
                  name="visibility"
                  checked={settings.visibility === "paid"}
                  onChange={() => setSettings(prev => ({ ...prev, visibility: "paid" }))}
                  className="h-4 w-4 text-blue-600"
                />
                <CreditCard className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">Paid</div>
                  <div className="text-sm text-gray-500">Users must pay to access</div>
                </div>
              </div>
            </div>

            {settings.visibility === "paid" && (
              <div className="space-y-3 pt-3 border-t">
                <Label>Course Price</Label>
                <div className="flex gap-2">
                  <Select value={settings.currency} onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={settings.price || ""}
                    onChange={(e) => setSettings(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    className="flex-1"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Course Details */}
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={settings.category} onValueChange={(value) => setSettings(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Prerequisites</Label>
              <Textarea
                placeholder="What should students know before taking this course?"
                value={settings.prerequisites}
                onChange={(e) => setSettings(prev => ({ ...prev, prerequisites: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag} variant="outline" size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {settings.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Objectives */}
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Learning Objectives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="What will students learn?"
                value={objectiveInput}
                onChange={(e) => setObjectiveInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddObjective()}
              />
              <Button onClick={handleAddObjective} variant="outline" size="sm">Add</Button>
            </div>
            <div className="space-y-2">
              {settings.learningObjectives.map((objective, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{objective}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveObjective(objective)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Generate Quiz</Label>
                <p className="text-sm text-gray-500">Auto-generate quiz questions from content</p>
              </div>
              <Switch
                checked={settings.generateQuiz}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, generateQuiz: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Comments</Label>
                <p className="text-sm text-gray-500">Students can leave comments on lessons</p>
              </div>
              <Switch
                checked={settings.allowComments}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowComments: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Ratings</Label>
                <p className="text-sm text-gray-500">Students can rate the course</p>
              </div>
              <Switch
                checked={settings.allowRatings}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowRatings: checked }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Finalize Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleFinalize}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
        >
          Create Course
        </Button>
      </div>
    </div>
  );
};

export default CourseSettingsComponent;
