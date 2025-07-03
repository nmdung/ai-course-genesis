
import { useEffect } from 'react';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // Update document title
    if (seoData.title) {
      document.title = seoData.title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    if (seoData.description) {
      updateMetaTag('description', seoData.description);
    }
    if (seoData.keywords) {
      updateMetaTag('keywords', seoData.keywords);
    }
    if (seoData.author) {
      updateMetaTag('author', seoData.author);
    }

    // Open Graph tags
    if (seoData.title) {
      updateMetaTag('og:title', seoData.title, true);
    }
    if (seoData.description) {
      updateMetaTag('og:description', seoData.description, true);
    }
    if (seoData.image) {
      updateMetaTag('og:image', seoData.image, true);
    }
    if (seoData.url) {
      updateMetaTag('og:url', seoData.url, true);
    }
    if (seoData.type) {
      updateMetaTag('og:type', seoData.type, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    if (seoData.title) {
      updateMetaTag('twitter:title', seoData.title);
    }
    if (seoData.description) {
      updateMetaTag('twitter:description', seoData.description);
    }
    if (seoData.image) {
      updateMetaTag('twitter:image', seoData.image);
    }

    // Cleanup function
    return () => {
      // We don't remove meta tags on cleanup to avoid flickering
      // They will be updated when the component mounts again
    };
  }, [seoData]);
};
