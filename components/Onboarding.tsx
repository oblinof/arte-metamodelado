import React, { useState } from 'react';
import { QuizQuestion, ViewState } from '../types';
import { QUIZ_DATA } from '../constants';
import { MoveRight, ShieldAlert, CheckCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  onUpdatePoints: (points: number) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onUpdatePoints }) => {
  const [step, setStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleStart = () => setStep(1);

  const handleOptionSelect = (optionIndex: number, points: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    onUpdatePoints(points);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setStep(2); // Finish screen
    }
  };

  const currentQ = QUIZ_DATA[currentQuestionIndex];

  if (step === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 fade-in">
         <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
          ¿ESTÁS CREANDO O ESTÁS SIENDO EJECUTADO?
        </h2>
        <p className="text-gray-400 max-w-lg mb-8 leading-relaxed">
          El arte contemporáneo te ha atrapado en una interfaz invisible.
          Antes de acceder al laboratorio, debemos diagnosticar tu nivel de captura.
        </p>
        <button 
          onClick={handleStart}
          className="bg-green-600 text-black font-bold py-3 px-8 rounded hover:bg-green-500 transition-all flex items-center gap-2"
        >
          INICIAR DIAGNÓSTICO
          <MoveRight size={20} />
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 fade-in">
        <div className="flex justify-between items-center mb-8 font-mono text-xs text-gray-500">
           <span>PREGUNTA {currentQuestionIndex + 1} / {QUIZ_DATA.length}</span>
           <span>DIAGNOSTICANDO...</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-6">{currentQ.question}</h3>

        <div className="space-y-4">
          {currentQ.options.map((opt, idx) => (
            <div 
              key={idx}
              onClick={() => handleOptionSelect(idx, opt.points)}
              className={`
                p-4 border rounded cursor-pointer transition-all
                ${showFeedback 
                  ? selectedOption === idx 
                    ? 'border-green-500 bg-green-900/20' 
                    : 'border-gray-800 opacity-50'
                  : 'border-gray-700 hover:border-gray-500 hover:bg-gray-900'}
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-4 h-4 rounded-full border ${selectedOption === idx ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}></div>
                <div>
                   <p className="text-gray-200">{opt.text}</p>
                   {showFeedback && selectedOption === idx && (
                     <p className={`mt-2 text-sm font-mono ${opt.points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                       {opt.feedback} <span className="ml-2 font-bold">[{opt.points > 0 ? '+' : ''}{opt.points} PTS]</span>
                     </p>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-8 flex justify-end">
            <button 
              onClick={nextQuestion}
              className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
            >
              {currentQuestionIndex < QUIZ_DATA.length - 1 ? 'SIGUIENTE' : 'FINALIZAR'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 fade-in">
       <CheckCircle size={64} className="text-green-500 mb-6" />
       <h2 className="text-3xl font-bold mb-4 text-white">DIAGNÓSTICO COMPLETADO</h2>
       <p className="text-gray-400 max-w-lg mb-8">
         Has comenzado a acumular Puntos de Mutación. Tu percepción se está abriendo.
         Ahora tienes acceso a los Módulos Conceptuales y al Laboratorio.
       </p>
       <button 
         onClick={onComplete}
         className="border border-green-500 text-green-500 py-3 px-8 rounded hover:bg-green-500/10 transition-all font-mono"
       >
         ACCEDER AL SISTEMA CENTRAL
       </button>
    </div>
  );
};

export default Onboarding;
