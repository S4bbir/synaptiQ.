'use client'

import { useEffect, useRef, useState } from 'react'
import UserMessage from './UserMessage'
import AIMessage from './AIMessage'
import MessageInput from './MessageInput'
import { useChatStore } from '@/store/chatStore'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatInterface() {
  const { messages, isLoading, sendMessageToAI } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [newMessageId, setNewMessageId] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Set new message ID when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setNewMessageId(messages[messages.length - 1].id)
      // Clear the new message ID after animation
      const timer = setTimeout(() => {
        setNewMessageId(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    await sendMessageToAI(content)
  }

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="border-b border-gray-200/60 px-4 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SynaptiQ</h1>
              <p className="text-xs text-gray-500">Academic Research Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center min-h-[calc(100vh-300px)] px-4">
              <div className="text-center space-y-6 max-w-2xl">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Welcome to SynaptiQ</h2>
                  <p className="text-gray-600 text-lg">Your AI-powered academic research assistant</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <button 
                    onClick={() => handleSendMessage("Conduct a systematic literature review on the impact of artificial intelligence on healthcare diagnostics")}
                    className="p-4 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-200 group"
                  >
                    <div className="text-sm font-medium text-gray-900 group-hover:text-violet-600">📚 Literature Review</div>
                    <div className="text-xs text-gray-500 mt-1">Analyze research on AI in healthcare</div>
                  </button>
                  <button 
                    onClick={() => handleSendMessage("Help me write an academic introduction about climate change mitigation strategies")}
                    className="p-4 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-200 group"
                  >
                    <div className="text-sm font-medium text-gray-900 group-hover:text-violet-600">✍️ Academic Writing</div>
                    <div className="text-xs text-gray-500 mt-1">Craft introduction on climate change</div>
                  </button>
                  <button 
                    onClick={() => handleSendMessage("What are the current debates in machine learning ethics?")}
                    className="p-4 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-200 group"
                  >
                    <div className="text-sm font-medium text-gray-900 group-hover:text-violet-600">🔍 Research Analysis</div>
                    <div className="text-xs text-gray-500 mt-1">Explore ML ethics debates</div>
                  </button>
                  <button 
                    onClick={() => handleSendMessage("Generate a research framework for studying remote learning effectiveness")}
                    className="p-4 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-200 group"
                  >
                    <div className="text-sm font-medium text-gray-900 group-hover:text-violet-600">🎯 Research Design</div>
                    <div className="text-xs text-gray-500 mt-1">Framework for remote learning study</div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100/50">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`transition-all duration-500 ease-out ${
                    newMessageId === message.id 
                      ? 'translate-y-2 opacity-0 animate-fadeInUp' 
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  {message.role === 'user' ? (
                    <UserMessage message={message} />
                  ) : (
                    <AIMessage message={message} />
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="bg-gradient-to-b from-gray-50/50 to-white border-b border-gray-100/50 transition-all duration-500 ease-out animate-fadeInUp translate-y-2 opacity-0">
                  <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-900">SynaptiQ</span>
                          <span className="text-xs text-gray-500">AI Research Assistant</span>
                        </div>
                        <div className="flex items-center gap-1.5 py-3">
                          <div className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce"></div>
                          <div className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <span className="ml-2 text-sm text-gray-500">Analyzing research...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200/60 bg-white/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}