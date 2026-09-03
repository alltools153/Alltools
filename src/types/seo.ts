export interface SeoKeyword {
  keyword: string;
  toolName?: string;
  toolHref?: string;
  category:
    | 'general'
    | 'developer'
    | 'security'
    | 'pdf'
    | 'utility'
    | 'finance'
    | 'age'
    | 'bengali'
    | 'api';
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
