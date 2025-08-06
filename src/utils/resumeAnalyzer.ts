import { AnalysisResult, MissingKeyword, Suggestion, RewrittenSection } from '../types';

export class ResumeAnalyzer {
  // Common stop words that should be filtered out during analysis
  private commonWords = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had',
    'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
  ]);

  // Comprehensive technical skills database for accurate categorization
  private technicalKeywords = new Set([
    // Programming Languages
    'javascript', 'python', 'java', 'typescript', 'c++', 'c#', 'php', 'ruby', 'go', 'rust',
    'swift', 'kotlin', 'scala', 'r', 'matlab', 'perl', 'shell', 'bash', 'powershell',
    
    // Frontend Technologies
    'react', 'angular', 'vue', 'svelte', 'html', 'css', 'sass', 'scss', 'less', 'bootstrap',
    'tailwind', 'material-ui', 'chakra-ui', 'styled-components', 'webpack', 'vite', 'parcel',
    'babel', 'eslint', 'prettier', 'jest', 'cypress', 'playwright', 'storybook',
    
    // Backend Technologies
    'node.js', 'express', 'fastify', 'koa', 'django', 'flask', 'fastapi', 'spring', 'laravel',
    'rails', 'asp.net', 'gin', 'fiber', 'actix', 'rocket', 'sinatra', 'phoenix',
    
    // Databases
    'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis', 'elasticsearch', 'cassandra',
    'dynamodb', 'firestore', 'couchdb', 'neo4j', 'influxdb', 'clickhouse',
    
    // Cloud & DevOps
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins',
    'gitlab-ci', 'github-actions', 'circleci', 'travis-ci', 'helm', 'istio', 'prometheus',
    'grafana', 'elk', 'datadog', 'newrelic', 'splunk',
    
    // Development Practices
    'git', 'ci/cd', 'agile', 'scrum', 'kanban', 'tdd', 'bdd', 'microservices', 'api',
    'rest', 'graphql', 'grpc', 'soap', 'oauth', 'jwt', 'ssl', 'https', 'websockets',
    
    // Data & Analytics
    'sql', 'nosql', 'etl', 'data-warehouse', 'big-data', 'hadoop', 'spark', 'kafka',
    'airflow', 'tableau', 'power-bi', 'looker', 'pandas', 'numpy', 'scikit-learn',
    'tensorflow', 'pytorch', 'keras', 'opencv'
  ]);

  // Soft skills that are commonly valued across industries
  private softSkills = new Set([
    'leadership', 'communication', 'collaboration', 'teamwork', 'problem-solving',
    'analytical', 'creative', 'innovative', 'strategic', 'detail-oriented',
    'organized', 'adaptable', 'flexible', 'motivated', 'proactive', 'initiative',
    'mentoring', 'coaching', 'presentation', 'negotiation', 'conflict-resolution',
    'time-management', 'project-management', 'stakeholder-management', 'customer-service',
    'cross-functional', 'multitasking', 'prioritization', 'decision-making'
  ]);

  // Industry-specific terms and certifications
  private industryTerms = new Set([
    'fintech', 'healthtech', 'edtech', 'e-commerce', 'saas', 'b2b', 'b2c',
    'startup', 'enterprise', 'scalability', 'performance', 'security', 'compliance',
    'gdpr', 'hipaa', 'sox', 'pci-dss', 'iso-27001', 'agile-methodology',
    'digital-transformation', 'automation', 'machine-learning', 'artificial-intelligence',
    'blockchain', 'cryptocurrency', 'iot', 'ar', 'vr', 'mobile-first', 'responsive-design'
  ]);

  // Strong action verbs for resume enhancement
  private strongActionVerbs = [
    'achieved', 'accelerated', 'accomplished', 'advanced', 'amplified', 'architected',
    'automated', 'built', 'collaborated', 'created', 'delivered', 'designed',
    'developed', 'drove', 'enhanced', 'established', 'executed', 'expanded',
    'generated', 'implemented', 'improved', 'increased', 'initiated', 'innovated',
    'launched', 'led', 'managed', 'optimized', 'orchestrated', 'pioneered',
    'reduced', 'revolutionized', 'scaled', 'spearheaded', 'streamlined', 'transformed'
  ];

  // Weak phrases that should be replaced
  private weakPhrases = [
    'responsible for', 'worked on', 'helped with', 'involved in', 'assisted with',
    'participated in', 'contributed to', 'was part of', 'handled', 'dealt with',
    'took care of', 'managed to', 'tried to', 'attempted to'
  ];

  /**
   * Main analysis method that orchestrates the entire resume analysis process
   * @param resume - The candidate's resume text
   * @param jobDescription - The target job description
   * @returns Complete analysis results with scores and recommendations
   */
  analyze(resume: string, jobDescription: string): AnalysisResult {
    console.log('🔍 Starting comprehensive resume analysis...');
    
    // Step 1: Extract and normalize keywords from both documents
    const resumeWords = this.extractKeywords(resume.toLowerCase());
    const jobWords = this.extractKeywords(jobDescription.toLowerCase());
    
    console.log(`📊 Extracted ${resumeWords.size} unique keywords from resume`);
    console.log(`📊 Extracted ${jobWords.size} unique keywords from job description`);
    
    // Step 2: Identify missing critical keywords
    const missingKeywords = this.findMissingKeywords(resumeWords, jobWords, jobDescription);
    console.log(`❌ Found ${missingKeywords.length} missing keywords`);
    
    // Step 3: Generate actionable improvement suggestions
    const suggestions = this.generateSuggestions(resume, jobDescription, missingKeywords);
    console.log(`💡 Generated ${suggestions.length} improvement suggestions`);
    
    // Step 4: Rewrite weak sections with enhanced versions
    const rewrittenSections = this.rewriteSections(resume, jobDescription, missingKeywords);
    console.log(`✏️ Rewrote ${rewrittenSections.length} sections`);
    
    // Step 5: Calculate comprehensive scoring metrics
    const overallScore = this.calculateOverallScore(resume, jobDescription, missingKeywords);
    const atsCompatibility = this.calculateATSCompatibility(resume, missingKeywords);
    
    console.log(`📈 Overall Score: ${overallScore}%`);
    console.log(`🤖 ATS Compatibility: ${atsCompatibility}%`);
    
    return {
      missingKeywords,
      suggestions,
      rewrittenSections,
      overallScore,
      atsCompatibility
    };
  }

  /**
   * Extracts meaningful keywords from text, filtering out common words
   * Uses advanced text processing to identify compound terms and technical phrases
   */
  private extractKeywords(text: string): Set<string> {
    // Remove special characters but preserve hyphens and dots for technical terms
    const cleanText = text.replace(/[^\w\s.-]/g, ' ');
    
    // Split into words and phrases
    const words = cleanText.split(/\s+/)
      .map(word => word.trim().toLowerCase())
      .filter(word => word.length > 2 && !this.commonWords.has(word));
    
    // Extract both individual words and meaningful phrases
    const keywords = new Set<string>();
    
    // Add individual words
    words.forEach(word => {
      if (this.isSignificantKeyword(word)) {
        keywords.add(word);
      }
    });
    
    // Extract compound technical terms (e.g., "machine learning", "data science")
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      if (this.isSignificantPhrase(phrase)) {
        keywords.add(phrase);
      }
    }
    
    // Extract three-word technical phrases
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      if (this.isSignificantPhrase(phrase)) {
        keywords.add(phrase);
      }
    }
    
    return keywords;
  }

  /**
   * Determines if a single word is significant for analysis
   */
  private isSignificantKeyword(word: string): boolean {
    return this.technicalKeywords.has(word) || 
           this.softSkills.has(word) || 
           this.industryTerms.has(word) ||
           word.length > 4; // Include longer words that might be domain-specific
  }

  /**
   * Determines if a phrase is significant for analysis
   */
  private isSignificantPhrase(phrase: string): boolean {
    const technicalPhrases = [
      'machine learning', 'data science', 'artificial intelligence', 'cloud computing',
      'software development', 'web development', 'mobile development', 'full stack',
      'front end', 'back end', 'database design', 'system architecture', 'api development',
      'user experience', 'user interface', 'project management', 'agile development',
      'continuous integration', 'continuous deployment', 'test driven development'
    ];
    
    return technicalPhrases.includes(phrase) || 
           (phrase.includes('development') || phrase.includes('management') || phrase.includes('analysis'));
  }

  /**
   * Identifies keywords present in job description but missing from resume
   * Prioritizes based on frequency and context within the job posting
   */
  private findMissingKeywords(resumeWords: Set<string>, jobWords: Set<string>, jobDescription: string): MissingKeyword[] {
    const missing: MissingKeyword[] = [];
    const jobText = jobDescription.toLowerCase();
    
    // Analyze each keyword from the job description
    jobWords.forEach(word => {
      if (!resumeWords.has(word) && word.length > 2) {
        // Count frequency in job description
        const frequency = this.countWordFrequency(word, jobText);
        
        // Only include keywords that appear multiple times or are highly significant
        if (frequency >= 2 || this.isHighValueKeyword(word)) {
          const category = this.categorizeKeyword(word);
          const importance = this.determineImportance(word, frequency, jobText);
          
          missing.push({
            keyword: word,
            category,
            importance,
            frequency
          });
        }
      }
    });

    // Sort by importance and frequency, limit to most critical
    return missing
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.importance] - priorityOrder[a.importance];
        return priorityDiff !== 0 ? priorityDiff : b.frequency - a.frequency;
      })
      .slice(0, 25); // Limit to top 25 most critical missing keywords
  }

  /**
   * Counts how many times a word appears in text, including partial matches
   */
  private countWordFrequency(word: string, text: string): number {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  }

  /**
   * Determines if a keyword is inherently high-value regardless of frequency
   */
  private isHighValueKeyword(word: string): boolean {
    const highValueTerms = [
      'required', 'must', 'essential', 'critical', 'mandatory', 'preferred',
      'senior', 'lead', 'principal', 'architect', 'expert', 'advanced'
    ];
    
    return this.technicalKeywords.has(word) || 
           highValueTerms.some(term => word.includes(term));
  }

  /**
   * Categorizes keywords into technical, soft skills, industry terms, or certifications
   */
  private categorizeKeyword(word: string): 'technical' | 'soft' | 'industry' | 'certification' {
    if (this.technicalKeywords.has(word) || 
        word.includes('js') || word.includes('sql') || word.includes('api') ||
        word.includes('framework') || word.includes('library')) {
      return 'technical';
    }
    
    if (this.softSkills.has(word) || 
        word.includes('leadership') || word.includes('communication') ||
        word.includes('management') || word.includes('collaboration')) {
      return 'soft';
    }
    
    if (word.includes('certified') || word.includes('certificate') || 
        word.includes('license') || word.includes('certification') ||
        word.includes('aws') || word.includes('azure') || word.includes('google')) {
      return 'certification';
    }
    
    return 'industry';
  }

  /**
   * Determines the importance level of a missing keyword based on context and frequency
   */
  private determineImportance(word: string, frequency: number, jobText: string): 'high' | 'medium' | 'low' {
    // Check if keyword appears in critical sections
    const criticalSections = [
      'required', 'must have', 'essential', 'mandatory', 'qualifications',
      'requirements', 'skills needed', 'experience with', 'proficiency in'
    ];
    
    const appearsInCriticalContext = criticalSections.some(section => 
      jobText.includes(`${section}`) && jobText.indexOf(word) > jobText.indexOf(section) &&
      jobText.indexOf(word) < jobText.indexOf(section) + 200
    );
    
    // High importance criteria
    if (frequency >= 4 || appearsInCriticalContext || 
        this.technicalKeywords.has(word) && frequency >= 3) {
      return 'high';
    }
    
    // Medium importance criteria
    if (frequency >= 3 || this.technicalKeywords.has(word) || 
        this.softSkills.has(word) && frequency >= 2) {
      return 'medium';
    }
    
    return 'low';
  }

  /**
   * Generates comprehensive suggestions for resume improvement
   * Covers formatting, content, structure, and keyword optimization
   */
  private generateSuggestions(resume: string, jobDescription: string, missingKeywords: MissingKeyword[]): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Critical missing keywords
    const highPriorityMissing = missingKeywords.filter(k => k.importance === 'high');
    if (highPriorityMissing.length > 0) {
      suggestions.push({
        type: 'keywords',
        title: 'Add Critical Missing Keywords',
        description: `Your resume is missing ${highPriorityMissing.length} high-priority keywords that appear frequently in the job description. Focus on incorporating: ${highPriorityMissing.slice(0, 5).map(k => k.keyword).join(', ')}. These should be naturally integrated into your experience descriptions and skills section.`,
        priority: 'high'
      });
    }

    // Technical skills gap analysis
    const technicalMissing = missingKeywords.filter(k => k.category === 'technical');
    if (technicalMissing.length > 3) {
      suggestions.push({
        type: 'keywords',
        title: 'Expand Technical Skills Section',
        description: `Add a comprehensive technical skills section including: ${technicalMissing.slice(0, 8).map(k => k.keyword).join(', ')}. Group skills by category (Programming Languages, Frameworks, Tools, etc.) for better readability.`,
        priority: 'high',
        section: 'Technical Skills'
      });
    }

    // ATS formatting issues
    if (this.hasATSFormattingIssues(resume)) {
      suggestions.push({
        type: 'formatting',
        title: 'Fix ATS Compatibility Issues',
        description: 'Your resume contains formatting that may cause ATS parsing errors. Use standard bullet points (•), avoid tables/columns, remove graphics, and use standard section headers like "Work Experience" and "Education".',
        priority: 'high',
        section: 'Formatting'
      });
    }

    // Quantification analysis
    const quantificationScore = this.analyzeQuantification(resume);
    if (quantificationScore < 3) {
      suggestions.push({
        type: 'content',
        title: 'Add Quantifiable Achievements',
        description: 'Include specific numbers, percentages, and metrics to demonstrate impact. Examples: "Increased sales by 25%", "Managed team of 12", "Reduced processing time by 40%", "Handled 500+ customer inquiries daily".',
        priority: 'high',
        section: 'Work Experience'
      });
    }

    // Professional summary analysis
    if (!this.hasProfessionalSummary(resume)) {
      suggestions.push({
        type: 'structure',
        title: 'Add Professional Summary',
        description: 'Include a compelling 3-4 line professional summary at the top highlighting your key qualifications, years of experience, and value proposition aligned with the target role.',
        priority: 'medium',
        section: 'Professional Summary'
      });
    }

    // Action verb strength analysis
    const weakVerbCount = this.countWeakVerbs(resume);
    if (weakVerbCount > 3) {
      suggestions.push({
        type: 'content',
        title: 'Strengthen Action Verbs',
        description: `Replace ${weakVerbCount} instances of weak language with powerful action verbs. Instead of "responsible for" use "led", "managed", or "oversaw". Replace "worked on" with "developed", "implemented", or "executed".`,
        priority: 'medium',
        section: 'Work Experience'
      });
    }

    // Skills section optimization
    if (!this.hasWellStructuredSkillsSection(resume)) {
      suggestions.push({
        type: 'structure',
        title: 'Optimize Skills Section',
        description: 'Create a well-organized skills section with categories: Technical Skills, Programming Languages, Frameworks/Libraries, Tools & Platforms, and Soft Skills. This improves ATS parsing and recruiter scanning.',
        priority: 'medium',
        section: 'Skills'
      });
    }

    // Industry-specific terminology
    const industryMissing = missingKeywords.filter(k => k.category === 'industry');
    if (industryMissing.length > 2) {
      suggestions.push({
        type: 'keywords',
        title: 'Include Industry Terminology',
        description: `Incorporate industry-specific terms: ${industryMissing.slice(0, 5).map(k => k.keyword).join(', ')}. This demonstrates domain knowledge and improves keyword matching.`,
        priority: 'medium',
        section: 'Experience'
      });
    }

    // Certification recommendations
    const certificationMissing = missingKeywords.filter(k => k.category === 'certification');
    if (certificationMissing.length > 0) {
      suggestions.push({
        type: 'keywords',
        title: 'Highlight Relevant Certifications',
        description: `If you have certifications in ${certificationMissing.slice(0, 3).map(k => k.keyword).join(', ')}, make sure they're prominently displayed. If not, consider pursuing these certifications to strengthen your candidacy.`,
        priority: 'low',
        section: 'Certifications'
      });
    }

    return suggestions.slice(0, 10); // Limit to top 10 most impactful suggestions
  }

  /**
   * Checks for common ATS formatting issues
   */
  private hasATSFormattingIssues(resume: string): boolean {
    const atsUnfriendlyElements = [
      /\|/, // Pipe characters
      /→/, // Arrow symbols
      /●/, // Bullet symbols that aren't standard
      /\t/, // Tab characters
      /\u2022/, // Unicode bullet points
      /{.*}/, // Curly braces (often from templates)
    ];
    
    return atsUnfriendlyElements.some(pattern => pattern.test(resume)) ||
           !resume.includes('•') && !resume.includes('-'); // No bullet points at all
  }

  /**
   * Analyzes the level of quantification in the resume
   */
  private analyzeQuantification(resume: string): number {
    const numbers = resume.match(/\d+/g) || [];
    const percentages = resume.match(/\d+%/g) || [];
    const currencies = resume.match(/\$[\d,]+/g) || [];
    
    return numbers.length + percentages.length * 2 + currencies.length * 2;
  }

  /**
   * Checks if resume has a professional summary section
   */
  private hasProfessionalSummary(resume: string): boolean {
    const summaryIndicators = [
      'summary', 'profile', 'objective', 'overview', 'about'
    ];
    
    return summaryIndicators.some(indicator => 
      resume.toLowerCase().includes(indicator)
    );
  }

  /**
   * Counts instances of weak verbs and phrases
   */
  private countWeakVerbs(resume: string): number {
    const lowerResume = resume.toLowerCase();
    return this.weakPhrases.reduce((count, phrase) => {
      const matches = lowerResume.match(new RegExp(phrase, 'g'));
      return count + (matches ? matches.length : 0);
    }, 0);
  }

  /**
   * Checks if resume has a well-structured skills section
   */
  private hasWellStructuredSkillsSection(resume: string): boolean {
    const skillsSection = resume.toLowerCase().includes('skills');
    const hasCategories = resume.toLowerCase().includes('technical') || 
                         resume.toLowerCase().includes('programming');
    
    return skillsSection && hasCategories;
  }

  /**
   * Rewrites weak sections of the resume with enhanced versions
   * Focuses on impact, specificity, and keyword optimization
   */
  private rewriteSections(resume: string, jobDescription: string, missingKeywords: MissingKeyword[]): RewrittenSection[] {
    const sections: RewrittenSection[] = [];
    const resumeLines = resume.split('\n').filter(line => line.trim().length > 10);
    
    resumeLines.forEach((line, index) => {
      if (this.isWeakBulletPoint(line)) {
        const enhanced = this.enhanceBulletPoint(line, missingKeywords, jobDescription);
        if (enhanced !== line.trim()) {
          sections.push({
            original: line.trim(),
            rewritten: enhanced,
            improvements: this.getImprovementDetails(line, enhanced),
            section: this.identifySection(line, resume, index)
          });
        }
      }
    });

    // Also check for weak summary/objective sections
    const summarySection = this.extractSummarySection(resume);
    if (summarySection && this.isWeakSummary(summarySection)) {
      const enhancedSummary = this.enhanceSummary(summarySection, missingKeywords, jobDescription);
      sections.push({
        original: summarySection,
        rewritten: enhancedSummary,
        improvements: this.getImprovementDetails(summarySection, enhancedSummary),
        section: 'Professional Summary'
      });
    }

    return sections.slice(0, 8); // Limit to most impactful rewrites
  }

  /**
   * Identifies weak bullet points that need enhancement
   */
  private isWeakBulletPoint(line: string): boolean {
    const lowerLine = line.toLowerCase().trim();
    
    // Check for weak language patterns
    const hasWeakLanguage = this.weakPhrases.some(phrase => lowerLine.includes(phrase));
    
    // Check for lack of quantification
    const lacksNumbers = !/\d+/.test(line);
    
    // Check for vague language
    const vagueTerms = ['various', 'multiple', 'several', 'many', 'some', 'different'];
    const hasVagueLanguage = vagueTerms.some(term => lowerLine.includes(term));
    
    // Check for passive voice indicators
    const passiveIndicators = ['was', 'were', 'been', 'being'];
    const hasPassiveVoice = passiveIndicators.some(indicator => lowerLine.includes(indicator));
    
    return (hasWeakLanguage || (lacksNumbers && line.length > 30) || hasVagueLanguage || hasPassiveVoice) &&
           line.length > 20; // Only process substantial bullet points
  }

  /**
   * Enhances a bullet point with stronger language, quantification, and keywords
   */
  private enhanceBulletPoint(line: string, missingKeywords: MissingKeyword[], jobDescription: string): string {
    let enhanced = line.trim();
    
    // Replace weak language with strong action verbs
    this.weakPhrases.forEach(weakPhrase => {
      if (enhanced.toLowerCase().includes(weakPhrase)) {
        const replacement = this.getStrongReplacement(weakPhrase);
        enhanced = enhanced.replace(new RegExp(weakPhrase, 'gi'), replacement);
      }
    });
    
    // Add quantification where missing
    enhanced = this.addQuantification(enhanced);
    
    // Incorporate relevant missing keywords naturally
    enhanced = this.incorporateKeywords(enhanced, missingKeywords);
    
    // Improve specificity
    enhanced = this.improveSpecificity(enhanced);
    
    // Ensure proper formatting
    enhanced = this.formatBulletPoint(enhanced);
    
    return enhanced;
  }

  /**
   * Gets strong replacement for weak phrases
   */
  private getStrongReplacement(weakPhrase: string): string {
    const replacements: { [key: string]: string[] } = {
      'responsible for': ['Led', 'Managed', 'Oversaw', 'Directed', 'Coordinated'],
      'worked on': ['Developed', 'Built', 'Created', 'Implemented', 'Designed'],
      'helped with': ['Collaborated on', 'Contributed to', 'Supported', 'Facilitated'],
      'involved in': ['Participated in', 'Contributed to', 'Engaged in', 'Executed'],
      'assisted with': ['Supported', 'Facilitated', 'Enabled', 'Contributed to'],
      'participated in': ['Engaged in', 'Contributed to', 'Collaborated on', 'Executed'],
      'handled': ['Managed', 'Processed', 'Executed', 'Administered'],
      'dealt with': ['Managed', 'Resolved', 'Addressed', 'Handled']
    };
    
    const options = replacements[weakPhrase.toLowerCase()] || ['Executed'];
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Adds quantification to bullet points where appropriate
   */
  private addQuantification(text: string): string {
    let enhanced = text;
    
    // Add quantification suggestions based on context
    const quantificationMap: { [key: string]: string } = {
      'projects': 'projects (5+ concurrent initiatives)',
      'team': 'cross-functional team of 8+ members',
      'customers': 'customers (500+ daily interactions)',
      'improved': 'improved by 25%',
      'increased': 'increased by 30%',
      'reduced': 'reduced by 40%',
      'managed': 'managed ($2M+ budget)',
      'led': 'led (12-person team)',
      'developed': 'developed (3 major applications)',
      'implemented': 'implemented (company-wide system)'
    };
    
    // Only add quantification if none exists
    if (!/\d+/.test(enhanced)) {
      Object.entries(quantificationMap).forEach(([keyword, replacement]) => {
        if (enhanced.toLowerCase().includes(keyword) && !enhanced.includes('(')) {
          enhanced = enhanced.replace(new RegExp(keyword, 'gi'), replacement);
        }
      });
    }
    
    return enhanced;
  }

  /**
   * Incorporates relevant missing keywords naturally into the text
   */
  private incorporateKeywords(text: string, missingKeywords: MissingKeyword[]): string {
    let enhanced = text;
    
    // Get high-priority technical keywords that could fit naturally
    const relevantKeywords = missingKeywords
      .filter(k => k.importance === 'high' && k.category === 'technical')
      .slice(0, 2);
    
    relevantKeywords.forEach(keyword => {
      if (!enhanced.toLowerCase().includes(keyword.keyword)) {
        // Try to incorporate keyword naturally based on context
        if (enhanced.toLowerCase().includes('using') || enhanced.toLowerCase().includes('with')) {
          enhanced = enhanced.replace(/using/gi, `using ${keyword.keyword} and`);
        } else if (enhanced.toLowerCase().includes('developed') || enhanced.toLowerCase().includes('built')) {
          enhanced = enhanced.replace(/developed/gi, `developed using ${keyword.keyword}`);
        }
      }
    });
    
    return enhanced;
  }

  /**
   * Improves specificity by replacing vague terms
   */
  private improveSpecificity(text: string): string {
    const specificityMap: { [key: string]: string } = {
      'various': 'multiple enterprise-level',
      'several': '5+',
      'many': 'numerous',
      'different': 'diverse',
      'multiple': 'cross-functional',
      'some': 'key',
      'large': 'enterprise-scale',
      'small': 'agile',
      'big': 'large-scale'
    };
    
    let enhanced = text;
    Object.entries(specificityMap).forEach(([vague, specific]) => {
      enhanced = enhanced.replace(new RegExp(`\\b${vague}\\b`, 'gi'), specific);
    });
    
    return enhanced;
  }

  /**
   * Ensures proper bullet point formatting
   */
  private formatBulletPoint(text: string): string {
    let formatted = text.trim();
    
    // Ensure it starts with a capital letter
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    // Ensure it ends with proper punctuation
    if (!formatted.endsWith('.') && !formatted.endsWith(';')) {
      formatted += '.';
    }
    
    return formatted;
  }

  /**
   * Extracts summary section from resume
   */
  private extractSummarySection(resume: string): string | null {
    const lines = resume.split('\n');
    const summaryIndicators = ['summary', 'profile', 'objective', 'overview'];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (summaryIndicators.some(indicator => line.includes(indicator))) {
        // Extract the next few lines as the summary
        const summaryLines = [];
        for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
          if (lines[j].trim() && !lines[j].toLowerCase().includes('experience') && 
              !lines[j].toLowerCase().includes('education')) {
            summaryLines.push(lines[j].trim());
          } else {
            break;
          }
        }
        return summaryLines.join(' ');
      }
    }
    
    return null;
  }

  /**
   * Checks if summary section is weak
   */
  private isWeakSummary(summary: string): boolean {
    const weakSummaryIndicators = [
      'seeking', 'looking for', 'hoping to', 'want to', 'desire to',
      'hardworking', 'dedicated', 'motivated individual',
      'team player', 'detail oriented', 'fast learner'
    ];
    
    const lowerSummary = summary.toLowerCase();
    return weakSummaryIndicators.some(indicator => lowerSummary.includes(indicator)) ||
           summary.length < 100 || !/\d+/.test(summary);
  }

  /**
   * Enhances a weak summary section
   */
  private enhanceSummary(summary: string, missingKeywords: MissingKeyword[], jobDescription: string): string {
    const keySkills = missingKeywords
      .filter(k => k.importance === 'high')
      .slice(0, 4)
      .map(k => k.keyword)
      .join(', ');
    
    return `Experienced professional with 5+ years of expertise in ${keySkills}. Proven track record of delivering high-impact solutions and driving measurable results in fast-paced environments. Strong background in cross-functional collaboration and technical leadership, with demonstrated ability to scale systems and optimize performance by 30%+.`;
  }

  /**
   * Gets detailed improvement explanations
   */
  private getImprovementDetails(original: string, enhanced: string): string[] {
    const improvements: string[] = [];
    
    if (this.weakPhrases.some(phrase => original.toLowerCase().includes(phrase))) {
      improvements.push('Replaced passive language with strong action verbs');
    }
    
    if (!/\d+/.test(original) && /\d+/.test(enhanced)) {
      improvements.push('Added quantifiable metrics and specific numbers');
    }
    
    if (enhanced.length > original.length + 20) {
      improvements.push('Enhanced with specific technical details and context');
    }
    
    if (enhanced.includes('using') && !original.includes('using')) {
      improvements.push('Incorporated relevant technical keywords');
    }
    
    improvements.push('Optimized for ATS keyword matching and recruiter appeal');
    
    return improvements;
  }

  /**
   * Identifies which section of the resume a line belongs to
   */
  private identifySection(line: string, resume: string, lineIndex: number): string {
    const resumeLines = resume.split('\n');
    const currentLineIndex = resumeLines.findIndex(l => l.includes(line.substring(0, 20)));
    
    if (currentLineIndex === -1) return 'Professional Experience';
    
    // Look backwards for section headers
    for (let i = currentLineIndex; i >= 0; i--) {
      const headerLine = resumeLines[i].toUpperCase().trim();
      
      if (headerLine.includes('EXPERIENCE') || headerLine.includes('EMPLOYMENT') || headerLine.includes('WORK')) {
        return 'Work Experience';
      }
      if (headerLine.includes('EDUCATION')) {
        return 'Education';
      }
      if (headerLine.includes('SKILLS')) {
        return 'Skills';
      }
      if (headerLine.includes('PROJECT')) {
        return 'Projects';
      }
      if (headerLine.includes('SUMMARY') || headerLine.includes('PROFILE')) {
        return 'Professional Summary';
      }
      if (headerLine.includes('ACHIEVEMENT') || headerLine.includes('ACCOMPLISHMENT')) {
        return 'Achievements';
      }
    }
    
    return 'Professional Experience';
  }

  /**
   * Calculates overall resume score based on multiple factors
   */
  private calculateOverallScore(resume: string, jobDescription: string, missingKeywords: MissingKeyword[]): number {
    let score = 100;
    
    // Keyword matching (40% of score)
    const highPriorityMissing = missingKeywords.filter(k => k.importance === 'high').length;
    const mediumPriorityMissing = missingKeywords.filter(k => k.importance === 'medium').length;
    
    score -= highPriorityMissing * 8; // -8 points per high-priority missing keyword
    score -= mediumPriorityMissing * 4; // -4 points per medium-priority missing keyword
    
    // Formatting and structure (25% of score)
    if (this.hasATSFormattingIssues(resume)) {
      score -= 15;
    }
    
    if (!this.hasProfessionalSummary(resume)) {
      score -= 10;
    }
    
    if (!this.hasWellStructuredSkillsSection(resume)) {
      score -= 8;
    }
    
    // Content quality (25% of score)
    const quantificationScore = this.analyzeQuantification(resume);
    if (quantificationScore < 3) {
      score -= 12;
    } else if (quantificationScore < 6) {
      score -= 6;
    }
    
    const weakVerbCount = this.countWeakVerbs(resume);
    score -= Math.min(weakVerbCount * 2, 10); // Max 10 points deduction
    
    // Length and completeness (10% of score)
    if (resume.length < 500) {
      score -= 15; // Too short
    } else if (resume.length > 4000) {
      score -= 5; // Might be too long
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Calculates ATS compatibility score
   */
  private calculateATSCompatibility(resume: string, missingKeywords: MissingKeyword[]): number {
    let score = 100;
    
    // Formatting issues (major impact on ATS)
    if (this.hasATSFormattingIssues(resume)) {
      score -= 20;
    }
    
    // Missing critical keywords
    const criticalMissing = missingKeywords.filter(k => k.importance === 'high').length;
    score -= criticalMissing * 6;
    
    // Section structure
    const requiredSections = ['experience', 'education', 'skills'];
    const lowerResume = resume.toLowerCase();
    const missingSections = requiredSections.filter(section => !lowerResume.includes(section));
    score -= missingSections.length * 10;
    
    // File format simulation (assuming plain text is good)
    // In real implementation, this would check actual file format
    
    // Keyword density
    const resumeWords = resume.toLowerCase().split(/\s+/).length;
    const technicalKeywordCount = Array.from(this.technicalKeywords)
      .filter(keyword => resume.toLowerCase().includes(keyword)).length;
    
    const keywordDensity = (technicalKeywordCount / resumeWords) * 100;
    if (keywordDensity < 2) {
      score -= 15; // Too few technical keywords
    }
    
    // Standard formatting elements
    if (!resume.includes('•') && !resume.includes('-') && !resume.includes('*')) {
      score -= 10; // No bullet points
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }
}