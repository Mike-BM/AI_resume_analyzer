import React from 'react';
import { FileText, Target, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/10 rounded-lg">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Resume Analyzer & Enhancer</h1>
            <p className="text-blue-100 text-lg">AI-Powered Professional Resume Optimization</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-200" />
            <div>
              <h3 className="font-semibold">ATS Optimization</h3>
              <p className="text-sm text-blue-100">Maximize compatibility with applicant tracking systems</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-200" />
            <div>
              <h3 className="font-semibold">Keyword Analysis</h3>
              <p className="text-sm text-blue-100">Identify missing skills and industry terms</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-200" />
            <div>
              <h3 className="font-semibold">Content Enhancement</h3>
              <p className="text-sm text-blue-100">Rewrite sections for maximum impact</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;