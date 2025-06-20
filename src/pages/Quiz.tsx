
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const Quiz = () => {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const quizData = {
    title: "Machine Learning Fundamentals Quiz",
    description: "Test your understanding of basic machine learning concepts",
    timeLimit: "30 minutes",
    totalQuestions: 10,
    questions: [
      {
        id: 1,
        question: "What is the primary goal of supervised learning?",
        options: [
          "To find hidden patterns in data",
          "To learn from labeled training data to make predictions",
          "To reduce the dimensionality of data",
          "To group similar data points together"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which of the following is NOT a type of machine learning?",
        options: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Reinforcement Learning",
          "Deterministic Learning"
        ],
        correctAnswer: 3
      },
      {
        id: 3,
        question: "What is overfitting in machine learning?",
        options: [
          "When a model performs well on training data but poorly on new data",
          "When a model is too simple to capture patterns",
          "When there's too much training data",
          "When the model takes too long to train"
        ],
        correctAnswer: 0
      }
    ]
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] && parseInt(selectedAnswers[index]) === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              </div>
              <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
              <CardDescription className="text-lg">
                You've finished the {quizData.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
                <p className="text-gray-600">Your Score</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{quizData.questions.length}</div>
                  <p className="text-gray-600">Total Questions</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((score / 100) * quizData.questions.length)}
                  </div>
                  <p className="text-gray-600">Correct</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {quizData.questions.length - Math.round((score / 100) * quizData.questions.length)}
                  </div>
                  <p className="text-gray-600">Incorrect</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link to={`/course/${id}`}>Back to Course</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{quizData.title}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{quizData.timeLimit}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {quizData.totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion + 1}. {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion] || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion, value)}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentQuestion === quizData.questions.length - 1 ? "Finish Quiz" : "Next"}
            {currentQuestion !== quizData.questions.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
