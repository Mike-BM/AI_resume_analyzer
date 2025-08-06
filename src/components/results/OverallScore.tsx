import React from 'react';
import { TrendingUp, Shield, Award, AlertTriangle } from 'lucide-react';

interface OverallScoreProps {
  overallScore: number;
  atsCompatibility: number;
}

const OverallScore: React.FC<OverallScoreProps> = ({ overallScore, atsCompatibility }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Award className="w-6 h-6 text-emerald-600" />;
    if (score >= 60) return <TrendingUp className="w-6 h-6 text-yellow-600" />;
    return <AlertTriangle className="w-6 h-6 text-red-600" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analysis Overview</h2>
          <p className="text-sm text-gray-600">Comprehensive scoring based on ATS optimization and content quality</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Score */}
        <div className={`p-6 rounded-xl border-2 ${getScoreBg(overallScore)} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -mr-10 -mt-10"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getScoreIcon(overallScore)}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Overall Resume Score</h3>
                <p className="text-xs text-gray-600">Keyword match + Content quality</p>
              </div>
            </div>
            <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                overallScore >= 80 ? 'bg-emerald-500' : 
                overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${overallScore}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {overallScore >= 80 ? 'Excellent match for this role!' :
             overallScore >= 60 ? 'Good foundation, room for improvement' :
             'Significant optimization needed'}
          </p>
        </div>

        {/* ATS Compatibility */}
        <div className={`p-6 rounded-xl border-2 ${getScoreBg(atsCompatibility)} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -mr-10 -mt-10"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ATS Compatibility</h3>
                <p className="text-xs text-gray-600">Automated system parsing</p>
              </div>
            </div>
            <span className={`text-3xl font-bold ${getScoreColor(atsCompatibility)}`}>
              {atsCompatibility}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                atsCompatibility >= 80 ? 'bg-emerald-500' : 
                atsCompatibility >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${atsCompatibility}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {atsCompatibility >= 80 ? 'Highly likely to pass ATS screening' :
             atsCompatibility >= 60 ? 'May pass with some optimization' :
             'Likely to be filtered out by ATS'}
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="p-1 bg-blue-100 rounded">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Analysis Summary</h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              {overallScore >= 80 && atsCompatibility >= 80 ? 
                'Your resume is well-optimized for this role with excellent ATS compatibility. Focus on the minor suggestions below to perfect your application.' :
                overallScore >= 60 || atsCompatibility >= 60 ?
                'Your resume has a solid foundation but needs optimization. Focus on the high-priority suggestions to significantly improve your chances.' :
                'Your resume requires substantial improvements to be competitive for this role. Address the critical issues identified in the analysis below.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallScore;