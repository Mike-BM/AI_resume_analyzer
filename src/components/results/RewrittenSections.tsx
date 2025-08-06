import React, { useState } from 'react';
import { RewrittenSection } from '../../types';
import { Edit3, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface RewrittenSectionsProps {
  sections: RewrittenSection[];
}

const RewrittenSections: React.FC<RewrittenSectionsProps> = ({ sections }) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [copiedSections, setCopiedSections] = useState<Set<number>>(new Set());

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSections(new Set([...copiedSections, index]));
      setTimeout(() => {
        setCopiedSections(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Edit3 className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Rewritten Sections</h3>
          <p className="text-sm text-gray-600">AI-enhanced versions of weak sections with stronger impact</p>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sections.map((section, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900">{section.section}</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200">
                    {section.improvements.length} improvements
                  </span>
                </div>
                {expandedSections.has(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {expandedSections.has(index) && (
              <div className="border-t border-gray-200 p-4">
                {/* Original */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                    <span>Original Version:</span>
                  </h5>
                  <div className="p-4 bg-red-50 border-l-4 border-l-red-400 border border-red-200 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed italic">{section.original}</p>
                  </div>
                </div>

                {/* Rewritten */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
                      <span>AI-Enhanced Version:</span>
                    </h5>
                    <button
                      onClick={() => copyToClipboard(section.rewritten, index)}
                      className="flex items-center space-x-1 px-3 py-1 text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full hover:from-blue-200 hover:to-indigo-200 transition-all duration-200 border border-blue-200 font-medium"
                    >
                      {copiedSections.has(index) ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-emerald-50 border-l-4 border-l-emerald-400 border border-emerald-200 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{section.rewritten}</p>
                  </div>
                </div>

                {/* Improvements */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                    <span>Key Improvements Made:</span>
                  </h5>
                  <ul className="space-y-2">
                    {section.improvements.map((improvement, improvementIndex) => (
                      <li key={improvementIndex} className="flex items-start space-x-3 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="text-center py-8">
          <div className="p-3 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Edit3 className="w-8 h-8 text-emerald-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Strong Content Quality!</h4>
          <p className="text-gray-600">Your resume content is well-written with no sections requiring major rewrites.</p>
        </div>
      )}
    </div>
  );
};

export default RewrittenSections;