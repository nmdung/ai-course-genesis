
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations = {
  vi: {
    // Navbar
    dashboard: 'Bảng điều khiển',
    createCourse: 'Tạo khóa học',
    profile: 'Hồ sơ',
    baseKnowledge: 'Kiến thức cơ bản',
    theme: 'Giao diện',
    language: 'Ngôn ngữ',
    appVersion: 'Phiên bản ứng dụng 1.0.0',
    logout: 'Đăng xuất',
    browseCourses: 'Duyệt khóa học',
    signIn: 'Đăng nhập',
    getStarted: 'Bắt đầu',
    
    // Index page
    heroTitle: 'ELearning AI',
    heroSubtitle: 'Biến đổi tài liệu của bạn thành các khóa học và bài kiểm tra hấp dẫn bằng sức mạnh của AI. Tạo ra những trải nghiệm học tập toàn diện chỉ trong vài phút, không phải hàng giờ.',
    featuresTitle: 'Mọi thứ bạn cần để tạo ra những khóa học tuyệt vời',
    featuresSubtitle: 'Các công cụ AI mạnh mẽ được thiết kế đặc biệt cho giáo viên và học sinh',
    
    // Features
    documentUpload: 'Tải lên tài liệu',
    documentUploadDesc: 'Tải lên PDF, Word docs và tệp văn bản để tạo ra các khóa học toàn diện',
    aiPowered: 'Được hỗ trợ bởi AI',
    aiPoweredDesc: 'AI tiên tiến biến đổi nội dung của bạn thành tài liệu học tập có cấu trúc',
    courseCreation: 'Tạo khóa học',
    courseCreationDesc: 'Tự động tạo ra các khóa học có tổ chức với các chương và phần',
    quizGeneration: 'Tạo bài kiểm tra',
    quizGenerationDesc: 'Tạo ra các bài kiểm tra và đánh giá hấp dẫn từ nội dung của bạn',
    studentManagement: 'Quản lý học sinh',
    studentManagementDesc: 'Theo dõi tiến độ và quản lý hành trình học tập của học sinh',
    assessmentTools: 'Công cụ đánh giá',
    assessmentToolsDesc: 'Các công cụ đánh giá toàn diện để đo lường kết quả học tập',
    
    // Role-based sections
    forEducators: 'Dành cho giáo viên',
    forEducatorsDesc: 'Tạo ra các khóa học hấp dẫn từ tài liệu hiện có của bạn',
    startTeaching: 'Bắt đầu giảng dạy',
    forLearners: 'Dành cho học viên',
    forLearnersDesc: 'Truy cập vào thế giới kiến thức và học tập tương tác',
    startLearning: 'Bắt đầu học',
    
    // Profile page
    profileInformation: 'Thông tin hồ sơ',
    updatePersonalInfo: 'Cập nhật thông tin cá nhân',
    fullName: 'Họ và tên',
    email: 'Email',
    role: 'Vai trò',
    saveChanges: 'Lưu thay đổi',
    settings: 'Cài đặt',
    customizeExperience: 'Tùy chỉnh trải nghiệm của bạn',
    switchTheme: 'Chuyển đổi giữa chế độ sáng và tối',
    emailNotifications: 'Thông báo email',
    receiveUpdates: 'Nhận cập nhật về các khóa học của bạn',
    marketingEmails: 'Email tiếp thị',
    receiveNews: 'Nhận tin tức và cập nhật',
    dangerZone: 'Vùng nguy hiểm',
    irreversibleActions: 'Các hành động không thể hoàn tác sẽ ảnh hưởng đến tài khoản của bạn',
    deleteAccount: 'Xóa tài khoản',
    memberSince: 'Thành viên từ',
    teacher: 'giáo viên',
    student: 'học sinh'
  },
  en: {
    // Navbar
    dashboard: 'Dashboard',
    createCourse: 'Create Course',
    profile: 'Profile',
    baseKnowledge: 'Base Knowledge',
    theme: 'Theme',
    language: 'Language',
    appVersion: 'App Version 1.0.0',
    logout: 'Log out',
    browseCourses: 'Browse Courses',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    
    // Index page
    heroTitle: 'ELearning AI',
    heroSubtitle: 'Transform your documents into engaging courses and quizzes with the power of AI. Create comprehensive learning experiences in minutes, not hours.',
    featuresTitle: 'Everything you need to create amazing courses',
    featuresSubtitle: 'Powerful AI tools designed specifically for educators and learners',
    
    // Features
    documentUpload: 'Document Upload',
    documentUploadDesc: 'Upload PDFs, Word docs, and text files to generate comprehensive courses',
    aiPowered: 'AI-Powered Generation',
    aiPoweredDesc: 'Advanced AI transforms your content into structured learning materials',
    courseCreation: 'Course Creation',
    courseCreationDesc: 'Automatically generate organized courses with chapters and sections',
    quizGeneration: 'Quiz Generation',
    quizGenerationDesc: 'Create engaging quizzes and assessments from your content',
    studentManagement: 'Student Management',
    studentManagementDesc: 'Track progress and manage your students\' learning journey',
    assessmentTools: 'Assessment Tools',
    assessmentToolsDesc: 'Comprehensive evaluation tools to measure learning outcomes',
    
    // Role-based sections
    forEducators: 'For Educators',
    forEducatorsDesc: 'Create engaging courses from your existing materials',
    startTeaching: 'Start Teaching',
    forLearners: 'For Learners',
    forLearnersDesc: 'Access a world of knowledge and interactive learning',
    startLearning: 'Start Learning',
    
    // Profile page
    profileInformation: 'Profile Information',
    updatePersonalInfo: 'Update your personal information',
    fullName: 'Full Name',
    email: 'Email',
    role: 'Role',
    saveChanges: 'Save Changes',
    settings: 'Settings',
    customizeExperience: 'Customize your experience',
    switchTheme: 'Switch between light and dark mode',
    emailNotifications: 'Email Notifications',
    receiveUpdates: 'Receive updates about your courses',
    marketingEmails: 'Marketing Emails',
    receiveNews: 'Receive news and updates',
    dangerZone: 'Danger Zone',
    irreversibleActions: 'Irreversible actions that will affect your account',
    deleteAccount: 'Delete Account',
    memberSince: 'Member since',
    teacher: 'teacher',
    student: 'student'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'vi'; // Default to Vietnamese
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
