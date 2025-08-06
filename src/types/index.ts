export interface AnalysisResult {
  missingKeywords: MissingKeyword[];
  suggestions: Suggestion[];
  rewrittenSections: RewrittenSection[];
  overallScore: number;
  atsCompatibility: number;
}

export interface MissingKeyword {
  keyword: string;
  category: 'technical' | 'soft' | 'industry' | 'certification';
  importance: 'high' | 'medium' | 'low';
  frequency: number;
}

export interface Suggestion {
  type: 'formatting' | 'content' | 'structure' | 'keywords';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  section?: string;
}

export interface RewrittenSection {
  original: string;
  rewritten: string;
  improvements: string[];
  section: string;
}