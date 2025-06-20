
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users, Play, FileText, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Course = () => {
  const { id } = useParams();

  const courseData = {
    title: "Introduction to Machine Learning",
    description: "A comprehensive course covering ML fundamentals, algorithms, and practical applications. Learn from basic concepts to advanced techniques used in industry.",
    instructor: "AI Generated Content",
    duration: "8 hours",
    lessons: 12,
    students: 45,
    rating: 4.8,
    progress: 85,
    chapters: [
      {
        id: 1,
        title: "Introduction to Machine Learning",
        lessons: [
          { id: 1, title: "What is Machine Learning?", duration: "15 min", completed: true },
          { id: 2, title: "Types of Machine Learning", duration: "20 min", completed: true },
          { id: 3, title: "Applications in Real World", duration: "18 min", completed: false }
        ]
      },
      {
        id: 2,
        title: "Supervised Learning",
        lessons: [
          { id: 4, title: "Linear Regression", duration: "25 min", completed: false },
          { id: 5, title: "Logistic Regression", duration: "22 min", completed: false },
          { id: 6, title: "Decision Trees", duration: "30 min", completed: false }
        ]
      },
      {
        id: 3,
        title: "Unsupervised Learning",
        lessons: [
          { id: 7, title: "Clustering Algorithms", duration: "28 min", completed: false },
          { id: 8, title: "K-Means Clustering", duration: "24 min", completed: false },
          { id: 9, title: "Hierarchical Clustering", duration: "26 min", completed: false }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Badge className="mb-2">AI Generated Course</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{courseData.description}</p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{courseData.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{courseData.students} students</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
              <Button asChild variant="outline">
                <Link to={`/quiz/${id}`}>Take Quiz</Link>
              </Button>
            </div>
          </div>

          {/* Course Stats */}
          <Card className="bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{courseData.progress}%</span>
                </div>
                <Progress value={courseData.progress} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completed Lessons</span>
                  <span className="text-sm font-medium">2 / {courseData.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Time Spent</span>
                  <span className="text-sm font-medium">35 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quiz Score</span>
                  <span className="text-sm font-medium">Not taken</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
            
            <div className="space-y-4">
              {courseData.chapters.map((chapter) => (
                <Card key={chapter.id} className="bg-white/70 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">{chapter.title}</CardTitle>
                    <CardDescription>
                      {chapter.lessons.length} lessons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {chapter.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Play className="h-5 w-5 text-gray-400" />
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                              <p className="text-sm text-gray-600">{lesson.duration}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            {lesson.completed ? "Review" : "Start"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/dashboard">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to={`/quiz/${id}`}>
                    <FileText className="h-4 w-4 mr-2" />
                    Take Assessment
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View Students
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-blue-600">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Materials
                </Button>
                <Button variant="ghost" className="w-full justify-start text-blue-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Course Outline
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
