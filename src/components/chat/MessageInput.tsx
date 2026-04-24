'use client'

import { useState, KeyboardEvent } from 'react'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!message.trim() || disabled) return
    onSendMessage(message)
    setMessage('')
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="relative">
      {/* Text Area */}
      <div className="relative border-2 border-gray-200 rounded-2xl bg-white focus-within:border-violet-400 focus-within:shadow-lg focus-within:shadow-violet-500/10 transition-all duration-200">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your research..."
          disabled={disabled}
          className="w-full px-5 py-4 pr-14 bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-400 text-base leading-relaxed min-h-[60px] max-h-[200px]"
          rows={1}
          style={{
            height: 'auto',
            minHeight: '60px'
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = `${Math.min(target.scrollHeight, 200)}px`
          }}
        />
        
        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
          className="absolute right-3 bottom-3 p-2.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
            />
          </svg>
        </button>
      </div>
      
      {/* Helper Text */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500 px-1">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Press Enter to send, Shift + Enter for new line
        </span>
        <span className={`font-medium ${message.length > 1800 ? 'text-orange-500' : 'text-gray-400'}`}>
          {message.length}/2000
        </span>
      </div>
    </div>
  )
}