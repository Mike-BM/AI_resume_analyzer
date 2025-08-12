import React, { useState } from 'react';
import { Key, Eye, EyeOff, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet, currentApiKey }) => {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    try {
      // Basic validation - just check if it looks like a valid API key
      if (apiKey.startsWith('AIza') && apiKey.length > 30) {
        onApiKeySet(apiKey.trim());
      } else {
        throw new Error('Invalid API key format');
      }
    } catch (error) {
      alert('Invalid API key. Please check your Gemini API key and try again.');
    }
    setIsValidating(false);
          <span>Optional: Enable AI Chat (Free Gemini API):</span>

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
          <Key className="w-5 h-5 text-white" />
          <li>Paste it above for personalized AI resume coaching</li>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Resume Q&A</h3>
          <strong>Note:</strong> The core resume analysis works perfectly without an API key. 
          This optional feature adds personalized AI coaching for advanced users.
        </div>
      </div>

      {!currentApiKey ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key (AIza...)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim() || isValidating}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Validating...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Enable AI Q&A</span>
              </>
            )}
          </button>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span>How to get your Gemini API key:</span>
            </h4>
            <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
              <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">Google AI Studio <ExternalLink className="w-3 h-3 ml-1" /></a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API Key" and select a project</li>
              <li>Copy the generated API key (starts with "AIza")</li>
              <li>Paste it above to enable AI-powered resume advice</li>
            </ol>
            <p className="text-xs text-gray-500 mt-2">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-sm font-medium text-emerald-900">AI Q&A Enabled</p>
              <p className="text-xs text-emerald-700">Ask questions about your resume below</p>
            </div>
          </div>
          <button
            onClick={() => onApiKeySet('')}
            className="text-xs text-emerald-700 hover:text-emerald-900 underline"
          >
            Change API Key
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiKeySetup;