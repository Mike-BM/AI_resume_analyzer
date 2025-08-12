import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage } from '../types';

export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.initialize(apiKey);
    }
  }

  initialize(apiKey: string) {
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    } catch (error) {
      console.error('Failed to initialize Gemini API:', error);
      throw new Error('Invalid API key or initialization failed');
    }
  }

  isInitialized(): boolean {
    return this.model !== null;
  }

  async askResumeQuestion(
    question: string, 
    resumeText: string, 
    jobDescription: string,
    analysisContext?: any
  ): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API not initialized. Please provide a valid API key.');
    }

    const contextPrompt = `
You are a professional HR expert and resume optimization specialist. You have access to:

RESUME CONTENT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

${analysisContext ? `PREVIOUS ANALYSIS RESULTS:
- Overall Score: ${analysisContext.overallScore}%
- ATS Compatibility: ${analysisContext.atsCompatibility}%
- Missing Keywords: ${analysisContext.missingKeywords?.slice(0, 5).map(k => k.keyword).join(', ')}
` : ''}

USER QUESTION: ${question}

Please provide specific, actionable advice for improving this resume for the target job. Focus on:
1. Concrete suggestions with examples
2. ATS optimization tips
3. Keyword integration strategies
4. Content enhancement recommendations
5. Formatting and structure improvements

Keep your response professional, detailed, and directly applicable to their specific situation.
`;

    try {
      const result = await this.model.generateContent(contextPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to get response from AI. Please check your API key and try again.');
    }
  }

  async generateResumeInsights(resumeText: string, jobDescription: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API not initialized');
    }

    const prompt = `
Analyze this resume against the job description and provide 3-5 key insights:

RESUME: ${resumeText}
JOB DESCRIPTION: ${jobDescription}

Provide specific, actionable insights focusing on the biggest opportunities for improvement.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating insights:', error);
      throw new Error('Failed to generate insights');
    }
  }
}