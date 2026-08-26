export interface SeoKeyword {
  keyword: string;
  category: 'general' | 'age' | 'vapt' | 'bengali';
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  volumeTier: 'Very High' | 'High' | 'Medium' | 'Low';
  lang: 'en' | 'bn';
}

export interface SeoMetadataProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}
