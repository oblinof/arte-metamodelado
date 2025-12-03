import React, { useState } from 'react';
import { Concept } from '../types';
import { Eye, EyeOff, Activity, ChevronDown, ChevronUp } from 'lucide-react';

interface ConceptCardProps {
  concept: Concept;
  index: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, index }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showLongText, setShowLongText] = useState(false);

  return (
    <div 
      className={`
        relative overflow-hidden border border-gray-800 bg-gray-950 p-6 rounded-sm transition-all duration-500
        hover:border-gray-600 group mb-6
      `}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-200 font-mono">
          <span className="text-green-600 mr-2">0{index + 1}.</span>
          {concept.title}
        </h3>
        <button 
          onClick={() => setIsRevealed(!isRevealed)}
          className="text-gray-500 hover:text-green-400 transition-colors p-2"
        >
          {isRevealed ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="relative min-h-[100px]">
        {/* The "Mask" / Default State */}
        <div 
          className={`
            absolute top-0 left-0 w-full transition-all duration-500
            ${isRevealed ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
          `}
        >
          <p className="text-gray-400 font-light text-lg mb-4">{concept.shortDesc}</p>
          <div className="flex items-center text-xs text-green-800 font-mono gap-2 mt-2">
            <Activity size={12} />
            <span>ESTADO: LATENTE</span>
          </div>
        </div>

        {/* The "Revealed" / Metamodeled State */}
        <div 
          className={`
            transition-all duration-500 flex flex-col
            ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute top-0'}
          `}
        >
          <div className="text-xs font-mono text-green-500 mb-2 glitch-text animate-pulse">
            {concept.glitchText}
          </div>
          <p className="text-gray-300 leading-relaxed border-l-2 border-green-500 pl-4 mb-4">
            {concept.fullDesc}
          </p>

          {concept.longContent && (
             <div className="mt-2">
                <button 
                  onClick={() => setShowLongText(!showLongText)}
                  className="text-xs font-mono text-gray-500 hover:text-white flex items-center gap-1 mb-2"
                >
                  {showLongText ? '[-_] MINIMIZAR DATOS' : '[+_] ACCEDER A ARCHIVO COMPLETO'}
                  {showLongText ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                
                {showLongText && (
                  <div className="bg-black/40 p-4 rounded text-sm text-gray-400 font-mono whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-top-2 border border-gray-900">
                    {concept.longContent}
                  </div>
                )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptCard;
