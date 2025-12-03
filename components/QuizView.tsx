import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCcw, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { OCTOPUS_PROMPTS } from '../constants';

interface QuizViewProps {
  onUpdatePoints: (points: number) => void;
  completedQuestions: number[];
  onQuestionComplete: (id: number) => void;
}

type OctopusState = 'IDLE' | 'THINKING' | 'WAITING_INPUT' | 'FEEDBACK';

const PsychoOctopus: React.FC<QuizViewProps> = ({ onUpdatePoints }) => {
  const [octopusState, setOctopusState] = useState<OctopusState>('IDLE');
  const [userInput, setUserInput] = useState('');
  const [octopusMessage, setOctopusMessage] = useState<string>("Saludos, entidad de carbono. Soy la Red. ¿Cuál es tu estado perceptivo hoy?");
  const [currentConcept, setCurrentConcept] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [pointsEarned, setPointsEarned] = useState<number>(0);

  // Animation refs for "breathing" effect
  const blobRef = useRef<HTMLDivElement>(null);

  const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Phase 1: User submits mood -> Octopus generates Concept & Question
  const handleMoodSubmit = async () => {
    if (!userInput.trim()) return;
    
    setOctopusState('THINKING');
    const mood = userInput;
    setUserInput(''); // Clear input for next phase

    try {
      const ai = getAI();
      const prompt = OCTOPUS_PROMPTS.ANALYSIS(mood);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      
      const data = JSON.parse(response.text || '{}');
      
      setCurrentConcept(data.concept);
      setCurrentQuestion(data.question);
      setOctopusMessage(`Detecto una vibración en torno a: ${data.concept}. \n\n${data.thought} \n\n${data.question}`);
      setOctopusState('WAITING_INPUT');

    } catch (e) {
      console.error(e);
      setOctopusMessage("La conexión psíquica ha fallado. La realidad es inestable. Intenta de nuevo.");
      setOctopusState('IDLE');
    }
  };

  // Phase 2: User answers question -> Octopus gives feedback & points
  const handleAnswerSubmit = async () => {
    if (!userInput.trim()) return;

    setOctopusState('THINKING');
    const answer = userInput;
    setUserInput('');

    try {
      const ai = getAI();
      const prompt = OCTOPUS_PROMPTS.FEEDBACK(currentQuestion, answer);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      
      const data = JSON.parse(response.text || '{}');
      
      setPointsEarned(data.points);
      onUpdatePoints(data.points);
      setOctopusMessage(data.feedback);
      setOctopusState('FEEDBACK');

    } catch (e) {
      setOctopusMessage("Error al procesar tu mutación. Intenta de nuevo.");
      setOctopusState('WAITING_INPUT');
    }
  };

  const handleReset = () => {
    setOctopusState('IDLE');
    setOctopusMessage("La Red está lista. ¿Cuál es tu estado perceptivo hoy?");
    setUserInput('');
    setPointsEarned(0);
    setCurrentConcept('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (octopusState === 'IDLE') handleMoodSubmit();
      if (octopusState === 'WAITING_INPUT') handleAnswerSubmit();
    }
  };

  // Helper to determine blob animation speed based on state
  const getBlobClass = () => {
    const base = "absolute inset-0 rounded-full blur-xl transition-all duration-1000 mix-blend-screen ";
    if (octopusState === 'THINKING') return base + "animate-spin-fast bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-80";
    if (octopusState === 'FEEDBACK') return base + "animate-pulse-slow bg-gradient-to-r from-green-400 via-emerald-600 to-blue-500 opacity-60";
    return base + "animate-blob bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40";
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 relative overflow-hidden fade-in min-h-[80vh]">
      
      {/* Background Noise/Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* THE PSYCHEDELIC OCTOPUS */}
      <div className="relative w-64 h-64 md:w-96 md:h-96 mb-8 flex items-center justify-center">
        {/* Layer 1 */}
        <div className={`${getBlobClass()} delay-0 transform scale-110`}></div>
        {/* Layer 2 */}
        <div className={`${getBlobClass()} animation-delay-2000 rotate-45 transform scale-90`}></div>
        {/* Layer 3 */}
        <div className={`${getBlobClass()} animation-delay-4000 -rotate-45 transform scale-105`}></div>
        
        {/* Eyes / Face */}
        <div className="relative z-10 flex flex-col items-center">
            <div className="flex gap-8 mb-4 transition-all duration-500">
                <div className={`w-4 h-4 md:w-6 md:h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] ${octopusState === 'THINKING' ? 'animate-ping' : ''}`}></div>
                <div className={`w-4 h-4 md:w-6 md:h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] ${octopusState === 'THINKING' ? 'animate-ping' : ''}`}></div>
            </div>
            {octopusState === 'THINKING' && <div className="text-xs font-mono text-white animate-pulse">SINTETIZANDO...</div>}
        </div>
      </div>

      {/* CHAT INTERFACE */}
      <div className="w-full max-w-2xl relative z-20">
        
        {/* Octopus Message Bubble */}
        <div className="bg-black/60 backdrop-blur-md border border-gray-700 p-6 rounded-2xl mb-6 shadow-2xl relative">
            <div className="absolute -top-3 left-6 flex items-center gap-2 bg-black border border-gray-700 px-3 py-1 rounded-full text-xs font-mono text-purple-400">
                <BrainCircuit size={12} />
                PULPO_METAMODELADO
            </div>
            
            {currentConcept && octopusState !== 'IDLE' && (
                <div className="text-xs font-mono text-green-500 mb-2 uppercase tracking-widest glitch-text">
                    >> CONCEPTO: {currentConcept}
                </div>
            )}

            <div className="text-lg md:text-xl text-gray-100 font-light leading-relaxed whitespace-pre-wrap">
                {octopusMessage}
            </div>

            {octopusState === 'FEEDBACK' && (
                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-green-500 font-bold font-mono text-xl">+{pointsEarned} PTS</span>
                    <button 
                        onClick={handleReset}
                        className="text-sm flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <RefreshCcw size={14} /> OTRA MUTACIÓN
                    </button>
                </div>
            )}
        </div>

        {/* Input Area */}
        {octopusState !== 'FEEDBACK' && (
             <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-gray-900 rounded-lg p-2 border border-gray-800">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={octopusState === 'THINKING'}
                        placeholder={octopusState === 'IDLE' ? "Escribe tu estado de ánimo (ej: aburrido, bloqueado, ansioso)..." : "Responde al pulpo..."}
                        className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500 font-mono text-sm disabled:opacity-50"
                        autoFocus
                    />
                    <button
                        onClick={octopusState === 'IDLE' ? handleMoodSubmit : handleAnswerSubmit}
                        disabled={!userInput.trim() || octopusState === 'THINKING'}
                        className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-all disabled:opacity-50 disabled:grayscale"
                    >
                        {octopusState === 'THINKING' ? <Sparkles className="animate-spin" size={20} /> : <Send size={20} />}
                    </button>
                </div>
            </div>
        )}
      </div>

      <style>{`
        @keyframes blob {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animate-spin-fast {
            animation: spin 1s linear infinite;
        }
        .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default PsychoOctopus;