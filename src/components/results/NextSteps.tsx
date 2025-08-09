import React from 'react';
import { NextStep } from '../../types';
import { ArrowRight, Download, RotateCcw, Clock, TrendingUp, Zap } from 'lucide-react';

interface NextStepsProps {
  nextSteps: NextStep[];
  onDownload: () => void;
  onReAnalyze: () => void;
}

const NextSteps: React.FC<NextStepsProps> = ({ nextSteps, onDownload, onReAnalyze }) => {
  const getPriorityColor = (priority: number) => {
    if (priority <= 2) return 'bg-red-100 text-red-800 border-red-200';
    if (priority <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  const getPriorityIcon = (priority: number) => {
    if (priority <= 2) return <Zap className="w-4 h-4 text-red-600" />;
    if (priority <= 3) return <TrendingUp className="w-4 h-4 text-yellow-600" />;
    return <ArrowRight className="w-4 h-4 text-emerald-600" />;
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6 mt-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
          <p className="text-sm text-gray-600">Personalized action plan to optimize your resume</p>
        </div>
      </div>

      {/* Action Items */}
      <div className="space-y-4 mb-6">
        {nextSteps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(step.priority)}`}>
                  #{step.priority}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getPriorityIcon(step.priority)}
                  <h3 className="text-lg font-semibold text-gray-900">{step.action}</h3>
                </div>
                
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{step.description}</p>
                
                <div className="flex items-center space-x-6 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-medium">Impact: {step.estimatedImpact}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-medium">Time: {step.timeRequired}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-blue-200">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download className="w-5 h-5" />
          <span>Download Optimized Resume</span>
        </button>
        
        <button
          onClick={onReAnalyze}
          className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Re-analyze Resume</span>
        </button>
      </div>

      {/* Pro Tips */}
      <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-blue-600" />
          <span>Pro Tips for Maximum Impact</span>
        </h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Focus on high-priority items first - they provide the biggest score improvements</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Use the exact keywords from the job description in your experience bullets</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Save your resume as both .docx and .pdf formats for different ATS systems</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Re-analyze after each major change to track your improvement progress</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NextSteps;