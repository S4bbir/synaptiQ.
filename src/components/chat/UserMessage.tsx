'use client'

import { Message } from './ChatInterface'

interface UserMessageProps {
  message: Message
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="bg-white border-b border-gray-100/50 transition-all duration-200">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-4 sm:gap-6">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
          
          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-900">You</span>
            </div>
            <div className="prose prose-sm sm:prose max-w-none">
              <div 
                className="text-gray-800 whitespace-pre-wrap break-words leading-relaxed"
                dangerouslySetInnerHTML={{ __html: message.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}