import React from 'react';
import { AnalysisResult } from '../types';
import MissingKeywords from './results/MissingKeywords';
import SuggestedImprovements from './results/SuggestedImprovements';
import RewrittenSections from './results/RewrittenSections';
import OverallScore from './results/OverallScore';
import DetailedBreakdown from './results/DetailedBreakdown';
import NextSteps from './results/NextSteps';

interface AnalysisResultsProps {
  results: AnalysisResult;
  onDownload: () => void;
  onReAnalyze: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, onDownload, onReAnalyze }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Overall Score */}
      <OverallScore 
        overallScore={results.overallScore}
        atsCompatibility={results.atsCompatibility}
      />

      {/* Detailed Breakdown */}
      <DetailedBreakdown 
        breakdown={results.detailedBreakdown}
        sectionGrades={results.sectionGrades}
        atsIssues={results.atsIssues}
      />

      {/* Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
        <MissingKeywords keywords={results.missingKeywords} />
        <SuggestedImprovements suggestions={results.suggestions} />
        <RewrittenSections sections={results.rewrittenSections} />
      </div>

      {/* Next Steps */}
      <NextSteps 
        nextSteps={results.nextSteps}
        onDownload={onDownload}
        onReAnalyze={onReAnalyze}
      />
    </div>
  );
};

export default AnalysisResults;