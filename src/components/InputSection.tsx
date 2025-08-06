import React, { useState } from 'react';
import { Upload, FileText, Briefcase, Zap } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (resume: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleAnalyze = () => {
    if (resume.trim() && jobDescription.trim()) {
      setAnalysisProgress(0);
      onAnalyze(resume, jobDescription);
    }
  };

  // Simulate analysis progress for better UX
  React.useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 200);
      
      return () => clearInterval(interval);
    } else {
      setAnalysisProgress(0);
    }
  }, [isAnalyzing]);

  const canAnalyze = resume.trim().length > 50 && jobDescription.trim().length > 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resume Input */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Your Resume</h2>
              <p className="text-sm text-gray-600">Paste your complete resume text below</p>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume content here...

Include all sections: contact information, professional summary, work experience, education, skills, certifications, etc."
              className="w-full h-80 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm leading-relaxed"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {resume.length} characters
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
            <Upload className="w-4 h-4" />
            <span>Copy and paste your resume content for best results</span>
          </div>
        </div>

        {/* Job Description Input */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Target Job Description</h2>
              <p className="text-sm text-gray-600">Paste the complete job posting</p>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here...

Include all details: job requirements, required skills, qualifications, responsibilities, preferred experience, etc."
              className="w-full h-80 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm leading-relaxed"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {jobDescription.length} characters
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>Include complete job posting for comprehensive analysis</span>
          </div>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center mt-8">
        <div className="text-center">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze || isAnalyzing}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3 ${
              canAnalyze && !isAnalyzing
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Zap className={`w-6 h-6 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing Resume...' : 'Start AI Analysis'}</span>
          </button>
          
          {isAnalyzing && (
            <div className="mt-4 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Analysis Progress</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {analysisProgress < 30 ? 'Extracting keywords and analyzing content...' :
                 analysisProgress < 60 ? 'Comparing with job requirements...' :
                 analysisProgress < 90 ? 'Generating improvement suggestions...' :
                 'Finalizing analysis results...'}
              </p>
            </div>
          )}
        </div>
      </div>

      {!canAnalyze && (
        <p className="text-center text-gray-500 mt-4">
          Please provide substantial content in both fields (minimum 50 characters each) to begin comprehensive analysis
        </p>
      )}
    </div>
  );
};

export default InputSection;