
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Plus, Users, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

const Dashboard = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "A comprehensive course covering ML fundamentals and algorithms",
      students: 45,
      lessons: 12,
      status: "Published",
      progress: 85
    },
    {
      id: 2,
      title: "Web Development Basics",
      description: "Learn HTML, CSS, and JavaScript from scratch",
      students: 32,
      lessons: 8,
      status: "Draft",
      progress: 60
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Explore data analysis, visualization, and statistical methods",
      students: 28,
      lessons: 15,
      status: "Published",
      progress: 95
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: "ML Algorithms Quiz",
      course: "Introduction to Machine Learning",
      questions: 20,
      attempts: 156
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      course: "Web Development Basics",
      questions: 15,
      attempts: 89
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dashboard",
    "name": "Course Dashboard",
    "description": "Manage your courses, quizzes, and track student progress",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": courses.length,
      "itemListElement": courses.map((course, index) => ({
        "@type": "Course",
        "position": index + 1,
        "name": course.title,
        "description": course.description,
        "courseMode": "online",
        "numberOfStudents": course.students
      }))
    }
  };

  return (
    <>
      <SEO
        title="Dashboard - AI Course Genesis"
        description="Manage your courses, track student progress, and create new content with AI-powered tools."
        keywords="course dashboard, e-learning management, student tracking, course analytics"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Manage your courses, quizzes, and track student progress</p>
            </div>
            <Button asChild className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link to="/upload">
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">105</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quiz Attempts</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Courses Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                        {course.status}
                      </Badge>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{course.students} students</span>
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{course.progress}% complete</span>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/course/${course.id}`}>View Course</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quizzes Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <CardDescription>{quiz.course}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{quiz.questions} questions</span>
                      <span>{quiz.attempts} attempts</span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to={`/quiz/${quiz.id}`}>View Quiz</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
