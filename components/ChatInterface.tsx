import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Cpu } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Iniciando protocolo de sabotaje cognitivo... Cuéntame sobre tu obra o bloqueo creativo. ¿Buscas validación o mutación?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error crítico en el nodo de conexión. Intenta reformular.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto w-full bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-gray-950 p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-500">
          <Cpu size={20} />
          <span className="font-mono font-bold tracking-wider">GEMINI_METAMODELADOR_V1</span>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-900/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-900/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 animate-pulse"></div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-black/50 backdrop-blur-sm">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[85%] sm:max-w-[75%] rounded-lg p-4 relative
                ${msg.role === 'user' 
                  ? 'bg-gray-800 text-gray-100 border border-gray-700' 
                  : 'bg-green-950/20 text-green-100 border border-green-900/50 font-mono text-sm'}
                ${msg.isError ? 'border-red-500 text-red-400' : ''}
              `}
            >
              {msg.role === 'model' && (
                <Terminal size={14} className="absolute -left-6 top-4 text-green-700 hidden sm:block" />
              )}
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-transparent text-green-500 font-mono text-xs flex items-center gap-2 p-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
              PROCESANDO_SABOTAJE...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-950 border-t border-gray-800">
        <div className="flex items-end gap-2 bg-gray-900 border border-gray-800 p-2 rounded-md focus-within:border-green-700 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe tu obra o dilema para metamodelarlo..."
            className="flex-1 bg-transparent text-white placeholder-gray-600 resize-none outline-none font-mono text-sm p-2 max-h-32 min-h-[44px]"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-green-900/30 text-green-400 hover:text-green-200 hover:bg-green-800/50 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-gray-600 font-mono">
                INPUT: TEXT // OUTPUT: MUTACIÓN COGNITIVA
            </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;