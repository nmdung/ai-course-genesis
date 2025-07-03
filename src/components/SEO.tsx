
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import StructuredData from './StructuredData';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "AI Course Genesis - Create Courses with AI",
  description = "Transform your documents into engaging courses with AI. Create, manage, and share educational content effortlessly.",
  keywords = "AI education, course creation, e-learning, artificial intelligence, online courses, educational technology",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = window.location.href,
  type = "website",
  author = "AI Course Genesis",
  structuredData
}) => {
  useSEO({
    title,
    description,
    keywords,
    image,
    url,
    type,
    author
  });

  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
    </>
  );
};

export default SEO;
