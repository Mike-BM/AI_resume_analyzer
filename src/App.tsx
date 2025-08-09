import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import AnalysisResults from './components/AnalysisResults';
import Footer from './components/Footer';
import { ResumeAnalyzer } from './utils/resumeAnalyzer';
import { AnalysisResult } from './types';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysisData, setLastAnalysisData] = useState<{resume: string, jobDescription: string} | null>(null);

  const handleAnalyze = async (resume: string, jobDescription: string) => {
    setIsAnalyzing(true);
    
    try {
    // Simulate realistic processing time for comprehensive analysis
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const analyzer = new ResumeAnalyzer();
    const result = analyzer.analyze(resume, jobDescription);
    
    setAnalysisResult(result);
      setLastAnalysisData({ resume, jobDescription });
    } catch (error) {
      console.error('Analysis error:', error);
      alert(error instanceof Error ? error.message : 'Analysis failed. Please check your inputs and try again.');
    }
    setIsAnalyzing(false);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setLastAnalysisData(null);
  };

  const handleDownloadOptimized = () => {
    if (!analysisResult || !lastAnalysisData) return;
    
    // Create optimized resume content
    let optimizedContent = lastAnalysisData.resume;
    
    // Apply rewritten sections
    analysisResult.rewrittenSections.forEach(section => {
      optimizedContent = optimizedContent.replace(section.original, section.rewritten);
    });
    
    // Add missing high-priority keywords note
    const criticalKeywords = analysisResult.missingKeywords
      .filter(k => k.importance === 'high')
      .slice(0, 10)
      .map(k => k.keyword);
    
    if (criticalKeywords.length > 0) {
      optimizedContent += `\n\n--- OPTIMIZATION NOTES ---\nConsider incorporating these critical keywords: ${criticalKeywords.join(', ')}\n`;
    }
    
    // Create and download file
    const blob = new Blob([optimizedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReAnalyze = () => {
    if (lastAnalysisData) {
      handleAnalyze(lastAnalysisData.resume, lastAnalysisData.jobDescription);
    } else {
      handleNewAnalysis();
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {!analysisResult ? (
        <InputSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
                <p className="text-sm text-gray-600 mt-1">Comprehensive AI-powered resume optimization results</p>
              </div>
              <button
                onClick={handleNewAnalysis}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
          <AnalysisResults 
            results={analysisResult} 
            onDownload={handleDownloadOptimized}
            onReAnalyze={handleReAnalyze}
          />
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default App;