import React from 'react';
import { AnalysisResult } from '../types';
import MissingKeywords from './results/MissingKeywords';
import SuggestedImprovements from './results/SuggestedImprovements';
import RewrittenSections from './results/RewrittenSections';
import OverallScore from './results/OverallScore';

interface AnalysisResultsProps {
  results: AnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Overall Score */}
      <OverallScore 
        overallScore={results.overallScore}
        atsCompatibility={results.atsCompatibility}
      />

      {/* Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
        <MissingKeywords keywords={results.missingKeywords} />
        <SuggestedImprovements suggestions={results.suggestions} />
        <RewrittenSections sections={results.rewrittenSections} />
      </div>
    </div>
  );
};

export default AnalysisResults;