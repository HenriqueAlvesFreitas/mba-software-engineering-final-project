import type { Message } from './ChatBox';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
          <Bot className="text-white" size={20} />
        </div>
      )}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`max-w-[600px] px-5 py-3 rounded-2xl ${
            isUser
              ? 'bg-[#3b82f6] text-white rounded-tr-sm'
              : 'bg-white border border-[#e2e8f0] text-[#0f172a] rounded-tl-sm'
          }`}
        >
          <p className="leading-relaxed">{message.text}</p>
        </div>
        <p
          className={`text-xs mt-1 px-1 ${
            isUser ? 'text-[#94a3b8]' : 'text-[#94a3b8]'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center flex-shrink-0">
          <User className="text-white" size={20} />
        </div>
      )}
    </div>
  );
}
