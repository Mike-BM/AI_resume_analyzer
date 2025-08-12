export interface AnalysisResult {
  missingKeywords: MissingKeyword[];
  suggestions: Suggestion[];
  rewrittenSections: RewrittenSection[];
  overallScore: number;
  atsCompatibility: number;
  detailedBreakdown: DetailedBreakdown;
  sectionGrades: SectionGrade[];
  atsIssues: ATSIssue[];
  nextSteps: NextStep[];
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

export interface DetailedBreakdown {
  keywordMatchPercentage: number;
  contentQualityScore: number;
  formattingScore: number;
  structureScore: number;
  quantificationLevel: number;
  actionVerbStrength: number;
}

export interface SectionGrade {
  section: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  score: number;
  issues: string[];
  strengths: string[];
}

export interface ATSIssue {
  type: 'critical' | 'warning' | 'minor';
  issue: string;
  impact: string;
  solution: string;
}

export interface NextStep {
  priority: number;
  action: string;
  description: string;
  estimatedImpact: string;
  timeRequired: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ApiKeyConfig {
  geminiApiKey: string;
}