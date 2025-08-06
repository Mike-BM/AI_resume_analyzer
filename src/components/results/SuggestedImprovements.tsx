import React from 'react';
import { Suggestion } from '../../types';
import { Lightbulb, FileText, Settings, Hash, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

interface SuggestedImprovementsProps {
  suggestions: Suggestion[];
}

const SuggestedImprovements: React.FC<SuggestedImprovementsProps> = ({ suggestions }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'formatting': return <FileText className="w-4 h-4" />;
      case 'content': return <Lightbulb className="w-4 h-4" />;
      case 'structure': return <Settings className="w-4 h-4" />;
      case 'keywords': return <Hash className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-emerald-600 bg-emerald-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <TrendingUp className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const highPrioritySuggestions = suggestions.filter(s => s.priority === 'high');
  const mediumPrioritySuggestions = suggestions.filter(s => s.priority === 'medium');
  const lowPrioritySuggestions = suggestions.filter(s => s.priority === 'low');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Suggested Improvements</h3>
          <p className="text-sm text-gray-600">AI-powered recommendations to optimize your resume for this role</p>
        </div>
      </div>

      <div className="space-y-6 max-h-96 overflow-y-auto">
        {/* High Priority Suggestions */}
        {highPrioritySuggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Critical Improvements Needed ({highPrioritySuggestions.length})</span>
            </h4>
            <div className="space-y-3">
              {highPrioritySuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 bg-red-50 border-l-4 border-l-red-500 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className={`p-1.5 rounded ${getPriorityColor(suggestion.priority)}`}>
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">{suggestion.title}</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">{suggestion.description}</p>
                      {suggestion.section && (
                        <span className="inline-block mt-2 px-2 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-600 font-medium">
                          {suggestion.section}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medium Priority Suggestions */}
        {mediumPrioritySuggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-yellow-600 mb-3 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Recommended Enhancements ({mediumPrioritySuggestions.length})</span>
            </h4>
            <div className="space-y-3">
              {mediumPrioritySuggestions.slice(0, 3).map((suggestion, index) => (
                <div key={index} className="p-4 bg-yellow-50 border-l-4 border-l-yellow-500 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className={`p-1.5 rounded ${getPriorityColor(suggestion.priority)}`}>
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">{suggestion.title}</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">{suggestion.description}</p>
                      {suggestion.section && (
                        <span className="inline-block mt-2 px-2 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-600 font-medium">
                          {suggestion.section}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Low Priority Suggestions */}
        {lowPrioritySuggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-emerald-600 mb-3 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Polish & Optimization ({lowPrioritySuggestions.length})</span>
            </h4>
            <div className="space-y-2">
              {lowPrioritySuggestions.slice(0, 4).map((suggestion, index) => (
                <div key={index} className="p-3 bg-emerald-50 border-l-4 border-l-emerald-500 border border-emerald-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1 rounded ${getPriorityColor(suggestion.priority)}`}>
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 text-sm">{suggestion.title}</h5>
                      <p className="text-xs text-gray-600 leading-relaxed">{suggestion.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {suggestions.length === 0 && (
        <div className="text-center py-8">
          <div className="p-3 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Resume Looks Great!</h4>
          <p className="text-gray-600">Your resume is well-optimized with no major improvements needed.</p>
        </div>
      )}
    </div>
  );
};

export default SuggestedImprovements;