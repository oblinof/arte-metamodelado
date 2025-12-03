import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ConceptCard from './components/ConceptCard';
import ChatInterface from './components/ChatInterface';
import Workshop from './components/Workshop';
import QuizView from './components/QuizView';
import { ViewState } from './types';
import { CONCEPTS } from './constants';
import { MoveRight, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [mutantPoints, setMutantPoints] = useState(0);
  const [completedQuizIds, setCompletedQuizIds] = useState<number[]>([]);

  const handleUpdatePoints = (points: number) => {
    setMutantPoints(prev => prev + points);
  };

  const handleQuestionComplete = (id: number) => {
    if (!completedQuizIds.includes(id)) {
      setCompletedQuizIds(prev => [...prev, id]);
    }
  };

  const renderHome = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 fade-in">
        <div className="mb-6 relative">
          <div className="absolute -inset-4 bg-green-500/10 blur-xl rounded-full"></div>
          <Zap size={64} className="text-green-500 relative z-10 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
          ARTE <br className="md:hidden" /> METAMODELADO
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed">
          Hackea la percepción. Rompe la Interfaz de Trance. <br/>
          <span className="text-green-500 font-mono text-sm block mt-2">
             PUNTOS DE MUTACIÓN: {mutantPoints}
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setView(ViewState.LEARN)}
            className="group px-8 py-4 bg-gray-100 text-black font-bold text-lg rounded-sm hover:bg-green-400 transition-colors flex items-center gap-2"
          >
            INICIAR PROTOCOLO
            <MoveRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setView(ViewState.QUIZ)}
            className="px-8 py-4 border border-gray-700 text-gray-300 font-mono text-sm rounded-sm hover:border-yellow-500 hover:text-yellow-500 transition-colors"
          >
            // DESAFÍOS
          </button>
        </div>
      </div>
    );
  };

  const renderLearn = () => (
    <div className="max-w-4xl mx-auto py-12 px-4 fade-in">
      <header className="mb-12 border-l-4 border-green-600 pl-6">
        <h2 className="text-3xl font-bold text-white mb-2">Fundamentos del Metamodelo</h2>
        <p className="text-gray-400">
          Una red de ideas para construir tu propia máquina de sabotaje.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {CONCEPTS.map((concept, index) => (
          <ConceptCard key={concept.id} concept={concept} index={index} />
        ))}
      </div>

      <div className="mt-12 text-center">
         <button 
          onClick={() => setView(ViewState.WORKSHOP)}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-green-400 font-mono rounded transition-colors inline-flex items-center gap-2"
        >
          <Zap size={16} />
          APLICAR EN EL LABORATORIO
        </button>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="max-w-5xl mx-auto py-6 px-4 h-full fade-in">
      <ChatInterface />
    </div>
  );

  const renderWorkshop = () => (
     <div className="h-full fade-in">
       <Workshop />
     </div>
  );
  
  const renderQuiz = () => (
    <div className="h-full fade-in">
      <QuizView 
        onUpdatePoints={handleUpdatePoints}
        completedQuestions={completedQuizIds}
        onQuestionComplete={handleQuestionComplete}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-green-900 selection:text-white pb-12">
      <Navigation currentView={view} onNavigate={setView} mutantPoints={mutantPoints} />
      
      <main className="fade-in">
        {view === ViewState.HOME && renderHome()}
        {view === ViewState.LEARN && renderLearn()}
        {view === ViewState.CHAT && renderChat()}
        {view === ViewState.WORKSHOP && renderWorkshop()}
        {view === ViewState.QUIZ && renderQuiz()}
      </main>

      <footer className="fixed bottom-4 right-4 text-[10px] text-gray-700 font-mono pointer-events-none z-0 hidden md:block">
        SYSTEM_STATUS: OPERATIONAL // MUTATION_ACTIVE
      </footer>
    </div>
  );
};

export default App;