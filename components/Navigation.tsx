import React from 'react';
import { ViewState } from '../types';
import { BrainCircuit, Sparkles, FlaskConical, Home, Trophy } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  mutantPoints: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, mutantPoints }) => {
  const navItemClass = (view: ViewState) => `
    flex items-center gap-2 px-3 py-2 cursor-pointer transition-all duration-300 border-b-2 text-sm sm:text-base
    ${currentView === view 
      ? 'border-green-500 text-green-400 bg-green-900/10' 
      : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700'}
  `;

  return (
    <nav className="w-full border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-3">
        <div 
          className="font-bold text-lg tracking-tighter text-white cursor-pointer hover:text-green-500 transition-colors flex items-center gap-2"
          onClick={() => onNavigate(ViewState.HOME)}
        >
          METAMODELO<span className="text-green-500 animate-pulse">_</span>
          <span className="hidden sm:block text-xs font-mono text-gray-600 border border-gray-800 px-2 py-0.5 rounded bg-gray-900">
            PTS: {mutantPoints}
          </span>
        </div>
        
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
           <button 
            onClick={() => onNavigate(ViewState.HOME)}
            className={navItemClass(ViewState.HOME)}
          >
            <Home size={16} />
            <span className="hidden sm:inline">Inicio</span>
          </button>

          <button 
            onClick={() => onNavigate(ViewState.LEARN)}
            className={navItemClass(ViewState.LEARN)}
          >
            <BrainCircuit size={16} />
            <span className="hidden sm:inline">Conceptos</span>
          </button>
          
          <button 
            onClick={() => onNavigate(ViewState.QUIZ)}
            className={navItemClass(ViewState.QUIZ)}
          >
            <Trophy size={16} />
            <span className="hidden sm:inline">Desafíos</span>
          </button>
          
          <button 
            onClick={() => onNavigate(ViewState.WORKSHOP)}
            className={navItemClass(ViewState.WORKSHOP)}
          >
            <FlaskConical size={16} />
            <span className="hidden sm:inline">Lab</span>
          </button>

          <button 
            onClick={() => onNavigate(ViewState.CHAT)}
            className={navItemClass(ViewState.CHAT)}
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">AI_Chat</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;