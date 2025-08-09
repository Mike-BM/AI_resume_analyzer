import React from 'react';
import { DetailedBreakdown, SectionGrade, ATSIssue } from '../../types';
import { BarChart3, AlertTriangle, CheckCircle, XCircle, Award, FileText, Target, Zap } from 'lucide-react';

interface DetailedBreakdownProps {
  breakdown: DetailedBreakdown;
  sectionGrades: SectionGrade[];
  atsIssues: ATSIssue[];
}

const DetailedBreakdown: React.FC<DetailedBreakdownProps> = ({ breakdown, sectionGrades, atsIssues }) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-emerald-600 bg-emerald-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'minor': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 border-l-red-500';
      case 'warning': return 'bg-yellow-50 border-yellow-200 border-l-yellow-500';
      case 'minor': return 'bg-blue-50 border-blue-200 border-l-blue-500';
      default: return 'bg-gray-50 border-gray-200 border-l-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
          <BarChart3 className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Detailed Analysis Breakdown</h2>
          <p className="text-sm text-gray-600">Comprehensive scoring and section-by-section evaluation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Score Components</span>
          </h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Keyword Match</span>
                <span className="text-sm font-bold text-blue-600">{breakdown.keywordMatchPercentage}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${breakdown.keywordMatchPercentage}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Content Quality</span>
                <span className="text-sm font-bold text-emerald-600">{breakdown.contentQualityScore}%</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${breakdown.contentQualityScore}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Formatting</span>
                <span className="text-sm font-bold text-purple-600">{breakdown.formattingScore}%</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${breakdown.formattingScore}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Structure</span>
                <span className="text-sm font-bold text-orange-600">{breakdown.structureScore}%</span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${breakdown.structureScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Grades */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>Section Grades</span>
          </h3>
          
          <div className="space-y-3">
            {sectionGrades.map((section, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{section.section}</h4>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(section.grade)}`}>
                    {section.grade}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {section.strengths.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-emerald-600 mb-1">✓ Strengths:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {section.strengths.slice(0, 2).map((strength, i) => (
                          <li key={i} className="flex items-start space-x-1">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {section.issues.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-red-600 mb-1">⚠ Issues:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {section.issues.slice(0, 2).map((issue, i) => (
                          <li key={i} className="flex items-start space-x-1">
                            <span className="text-red-500 mt-0.5">•</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATS Issues */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-red-600" />
            <span>ATS Issues ({atsIssues.length})</span>
          </h3>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {atsIssues.length > 0 ? (
              atsIssues.map((issue, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 border ${getIssueColor(issue.type)}`}>
                  <div className="flex items-start space-x-3">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{issue.issue}</h4>
                      <p className="text-xs text-gray-600 mb-2">{issue.impact}</p>
                      <div className="p-2 bg-white rounded border border-gray-200">
                        <p className="text-xs font-medium text-gray-700">
                          <span className="text-emerald-600">Solution:</span> {issue.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <div className="p-3 bg-emerald-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">No ATS Issues Found!</h4>
                <p className="text-xs text-gray-600">Your resume formatting is ATS-compatible</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedBreakdown;