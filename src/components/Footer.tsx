import React from 'react';
import { Heart, Users, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Resume Analyzer</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional HR tool designed to help job seekers optimize their resumes for ATS systems and impress human recruiters.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>AI-Powered Analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>ATS Optimization</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Content Enhancement</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Tips for Success</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Use keywords from the job description</li>
              <li>• Include quantifiable achievements</li>
              <li>• Keep formatting simple and clean</li>
              <li>• Tailor each resume to the specific role</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Built with professional HR expertise and modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;