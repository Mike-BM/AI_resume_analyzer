import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { MessageCircle, Send, User, Bot, Loader, AlertCircle } from 'lucide-react';
import { GeminiService } from '../utils/geminiService';

interface ResumeChatProps {
  geminiService: GeminiService;
  resumeText: string;
  jobDescription: string;
  analysisContext?: any;
}

const ResumeChat: React.FC<ResumeChatProps> = ({ 
  geminiService, 
  resumeText, 
  jobDescription, 
  analysisContext 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI resume advisor. I've analyzed your resume and the job description. Ask me anything about how to improve your resume for this specific role!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await geminiService.askResumeQuestion(
        inputMessage.trim(),
        resumeText,
        jobDescription,
        analysisContext
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const suggestedQuestions = [
    "What are the top 3 keywords I should add to my resume?",
    "How can I quantify my achievements with specific numbers?",
    "Which technical skills should I emphasize more?",
    "How can I rewrite my professional summary for impact?",
    "What's the fastest way to improve my ATS score?"
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
          <MessageCircle className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Resume Advisor</h2>
          <p className="text-sm text-gray-600">Get personalized advice powered by Google Gemini</p>
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Suggested questions:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 text-sm text-gray-700"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`p-2 rounded-full ${
              message.type === 'user' 
                ? 'bg-blue-600' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}>
              {message.type === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            <div className={`flex-1 max-w-3xl ${
              message.type === 'user' ? 'text-right' : ''
            }`}>
              <div className={`p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white ml-auto max-w-md'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin text-purple-600" />
                  <p className="text-sm text-gray-600">AI is analyzing your question...</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex space-x-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me anything about improving your resume..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
          <p className="text-xs text-yellow-800">
            <strong>Privacy Note:</strong> Your conversations are processed by Google Gemini AI. 
            Avoid sharing sensitive personal information in your questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeChat;