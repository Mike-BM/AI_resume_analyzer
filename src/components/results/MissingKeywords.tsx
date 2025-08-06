import React from 'react';
import { MissingKeyword } from '../../types';
import { AlertCircle, Tag, TrendingUp } from 'lucide-react';

interface MissingKeywordsProps {
  keywords: MissingKeyword[];
}

const MissingKeywords: React.FC<MissingKeywordsProps> = ({ keywords }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800 border-blue-200 font-medium';
      case 'soft': return 'bg-emerald-100 text-emerald-800 border-emerald-200 font-medium';
      case 'industry': return 'bg-purple-100 text-purple-800 border-purple-200 font-medium';
      case 'certification': return 'bg-orange-100 text-orange-800 border-orange-200 font-medium';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 font-medium';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Tag className="w-4 h-4 text-green-500" />;
      default: return <Tag className="w-4 h-4 text-gray-500" />;
    }
  };

  const highPriorityKeywords = keywords.filter(k => k.importance === 'high');
  const mediumPriorityKeywords = keywords.filter(k => k.importance === 'medium');
  const lowPriorityKeywords = keywords.filter(k => k.importance === 'low');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Missing Keywords</h3>
          <p className="text-sm text-gray-600">Keywords from job description missing in your resume - prioritized by importance</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* High Priority */}
        {highPriorityKeywords.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>Critical Missing Keywords ({highPriorityKeywords.length})</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {highPriorityKeywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 border-l-4 border-l-red-500 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getImportanceIcon(keyword.importance)}
                    <span className="font-medium text-gray-900">{keyword.keyword}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(keyword.category)}`}>
                      {keyword.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Appears {keyword.frequency}x in job posting
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medium Priority */}
        {mediumPriorityKeywords.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-yellow-600 mb-3 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Important Keywords ({mediumPriorityKeywords.length})</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {mediumPriorityKeywords.slice(0, 5).map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 border-l-4 border-l-yellow-500 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getImportanceIcon(keyword.importance)}
                    <span className="font-medium text-gray-900">{keyword.keyword}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(keyword.category)}`}>
                      {keyword.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {keyword.frequency}x mentioned
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Low Priority */}
        {lowPriorityKeywords.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-green-600 mb-3 flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>Additional Keywords ({lowPriorityKeywords.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lowPriorityKeywords.slice(0, 6).map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900 font-medium">{keyword.keyword}</span>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(keyword.category)}`}>
                      {keyword.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{keyword.frequency}x</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {keywords.length === 0 && (
        <div className="text-center py-8">
          <div className="p-3 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Excellent Keyword Coverage!</h4>
          <p className="text-gray-600">Your resume contains all the important keywords from the job description.</p>
        </div>
      )}
    </div>
  );
};

export default MissingKeywords;