import { Send } from 'lucide-react';
import { useState } from 'react';
import { MessageBubble } from './MessageBubble';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export function ChatBox({ messages, onSendMessage }: ChatBoxProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What is the best category?',
    'Where can I reduce costs?',
    'Which item has the highest impact?',
    'Show me spending trends',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#f8fafc]">
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-3">
              AI Data Insights
            </h2>
            <p className="text-[#64748b] mb-8 text-lg">
              Ask me anything about your data and get intelligent insights
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(question)}
                  className="px-6 py-4 text-left text-[#0f172a] bg-white border border-[#e2e8f0] rounded-xl hover:border-[#3b82f6] hover:shadow-lg transition-all group"
                >
                  <span className="text-sm font-medium group-hover:text-[#3b82f6]">{question}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#e2e8f0] bg-white p-6">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask something about your data..."
            className="flex-1 px-5 py-3.5 border border-[#e2e8f0] rounded-xl outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-[#3b82f6] text-white px-6 py-3.5 rounded-xl hover:bg-[#2563eb] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#3b82f6]/20"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
