import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type GenerationStep = "describe" | "source" | "learner" | "structure" | "planning" | "preview" | "settings" | "complete";

interface Chapter {
  id: number;
  title: string;
  summary: string;
  content: string;
  estimatedTime: string;
  approved: boolean;
}

interface CourseData {
  title: string;
  description: string;
  difficulty: string;
  estimatedDuration: string;
  chapters: Chapter[];
  objectives?: string[];
  tags?: string[];
}

interface CourseStructure {
  sections: number;
  pagesPerSection: number;
  quizzesPerSection: number;
  questionsPerQuiz: number;
  courseSummary: boolean;
  generateAIImages: boolean;
}

export const useCourseGeneration = () => {
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<GenerationStep>("describe");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [courseDescription, setCourseDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [sourceType, setSourceType] = useState<string>("");
  const [sourceFiles, setSourceFiles] = useState<string>("");
  const [courseStructure, setCourseStructure] = useState<CourseStructure>({
    sections: 3,
    pagesPerSection: 1,
    quizzesPerSection: 1,
    questionsPerQuiz: 1,
    courseSummary: true,
    generateAIImages: false
  });
  
  const [courseData, setCourseData] = useState<CourseData>({
    title: "Introduction to Machine Learning",
    description: "A comprehensive course covering ML fundamentals, algorithms, and practical applications.",
    difficulty: "intermediate",
    estimatedDuration: "8 hours",
    objectives: [
      "Understand the fundamental concepts of machine learning",
      "Learn to implement supervised and unsupervised learning algorithms",
      "Apply machine learning techniques to real-world problems",
      "Evaluate and optimize machine learning models",
      "Use popular ML libraries and frameworks"
    ],
    tags: ["Machine Learning", "AI", "Python", "Data Science", "Algorithms"],
    chapters: [
      {
        id: 1,
        title: "What is Machine Learning?",
        summary: "Introduction to machine learning concepts, types, and applications in modern technology.",
        content: "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed...",
        estimatedTime: "45 minutes",
        approved: false
      },
      {
        id: 2,
        title: "Supervised Learning",
        summary: "Understanding supervised learning algorithms including regression and classification techniques.",
        content: "Supervised learning uses labeled training data to learn a mapping function from input variables to output variables...",
        estimatedTime: "90 minutes",
        approved: false
      },
      {
        id: 3,
        title: "Unsupervised Learning",
        summary: "Exploring clustering, dimensionality reduction, and pattern recognition without labeled data.",
        content: "Unsupervised learning finds hidden patterns in data without using labeled examples...",
        estimatedTime: "75 minutes",
        approved: false
      }
    ]
  });

  const handleDescribeNext = () => {
    if (!courseDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe your course before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep("source");
  };

  const handleSourceNext = (type: string, files: string) => {
    setSourceType(type);
    setSourceFiles(files);
    setCurrentStep("learner");
  };

  const handleSourceBack = () => {
    setCurrentStep("describe");
  };

  const handleLearnerNext = () => {
    if (!targetAudience.trim()) {
      toast({
        title: "Target Audience Required",
        description: "Please describe your target learner before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep("structure");
  };

  const handleLearnerBack = () => {
    setCurrentStep("source");
  };

  const handleStructureNext = () => {
    setCurrentStep("planning");
    setIsGenerating(true);
    
    // Simulate AI course generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Course Plan Generated!",
        description: "Review the course structure and approve each chapter.",
      });
    }, 3000);
  };

  const handleStructureBack = () => {
    setCurrentStep("learner");
  };

  const handleApprovePlan = () => {
    setCurrentStep("preview");
  };

  const handleApproveChapter = () => {
    const updatedChapters = [...courseData.chapters];
    updatedChapters[currentChapterIndex].approved = true;
    setCourseData(prev => ({ ...prev, chapters: updatedChapters }));

    if (currentChapterIndex < courseData.chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    } else {
      setCurrentStep("settings");
    }
  };

  const handleEditChapter = () => {
    // TODO: Open chapter editor
    toast({
      title: "Chapter Editor",
      description: "Chapter editing functionality will be available soon.",
    });
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  const handleFinalizeCourse = (settings: any) => {
    // TODO: Save course with settings
    setCurrentStep("complete");
    toast({
      title: "Course Created Successfully!",
      description: "Your course has been generated and is ready for students.",
    });
  };

  return {
    currentStep,
    isGenerating,
    currentChapterIndex,
    courseDescription,
    targetAudience,
    sourceType,
    sourceFiles,
    courseStructure,
    courseData,
    setCourseDescription,
    setTargetAudience,
    setCourseStructure,
    setCourseData,
    handleDescribeNext,
    handleSourceNext,
    handleSourceBack,
    handleLearnerNext,
    handleLearnerBack,
    handleStructureNext,
    handleStructureBack,
    handleApprovePlan,
    handleApproveChapter,
    handleEditChapter,
    handlePreviousChapter,
    handleFinalizeCourse
  };
};
