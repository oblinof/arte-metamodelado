import React, { useState } from 'react';
import { generateMutation } from '../services/geminiService';
import { FlaskConical, Shuffle, Sparkles, AlertTriangle } from 'lucide-react';
import { MutationFilter } from '../types';

const FILTERS: { id: MutationFilter; label: string; desc: string }[] = [
  { id: 'GLITCH', label: 'Glitch/Error', desc: 'Inyectar ruido y distorsión.' },
  { id: 'FRAGMENT', label: 'Fragmentar Yo', desc: 'Dividir la perspectiva.' },
  { id: 'SABOTAGE', label: 'Sabotaje', desc: 'Romper la intención original.' },
  { id: 'CODE', label: 'Reescritura', desc: 'Tratar la obra como algoritmo.' },
];

const Workshop: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<MutationFilter>('GLITCH');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMutate = async () => {
    if (!idea.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateMutation(idea, selectedFilter);
      setResult(output);
    } catch (e) {
      setResult("Error en la conexión con la red mutante.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="border border-green-900/50 bg-black/50 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

        <div className="relative z-10">
          <header className="mb-8 flex items-center gap-4">
             <div className="p-3 bg-green-900/20 rounded-full border border-green-900 text-green-500">
               <FlaskConical size={24} />
             </div>
             <div>
               <h2 className="text-2xl font-bold text-white">LABORATORIO DE MUTACIÓN</h2>
               <p className="text-gray-500 text-sm font-mono">Espacio de Beta Perpetuo. Transforma tu idea.</p>
             </div>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2 font-mono text-xs">1. INPUT: IDEA O BLOQUEO</label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Ej: Estoy pintando un retrato realista pero se siente aburrido..."
                  className="w-full bg-gray-900/80 border border-gray-700 text-white p-4 rounded focus:border-green-600 outline-none h-32 resize-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 font-mono text-xs">2. FILTRO METAMODELADO</label>
                <div className="grid grid-cols-2 gap-2">
                  {FILTERS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFilter(f.id)}
                      className={`
                        p-3 border rounded text-left transition-all
                        ${selectedFilter === f.id 
                          ? 'border-green-500 bg-green-900/20 text-green-400' 
                          : 'border-gray-800 text-gray-500 hover:bg-gray-900'}
                      `}
                    >
                      <div className="font-bold text-sm">{f.label}</div>
                      <div className="text-[10px] opacity-70">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleMutate}
                disabled={isLoading || !idea}
                className="w-full bg-gray-100 text-black font-bold py-3 rounded hover:bg-green-400 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Sparkles className="animate-spin" /> : <Shuffle />}
                {isLoading ? 'PROCESANDO...' : 'EJECUTAR MUTACIÓN'}
              </button>
            </div>

            <div className="relative border border-gray-800 bg-gray-950/50 rounded p-6 min-h-[300px] flex flex-col">
               <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-700">OUTPUT_CONSOLE</div>
               
               {!result && !isLoading && (
                 <div className="flex-1 flex flex-col items-center justify-center text-gray-700 space-y-2">
                   <AlertTriangle size={32} />
                   <p className="font-mono text-xs text-center">Esperando datos de entrada...</p>
                 </div>
               )}

               {isLoading && (
                 <div className="flex-1 flex items-center justify-center text-green-500 font-mono text-xs">
                   <span className="typing-effect">Calculando bifurcaciones...</span>
                 </div>
               )}

               {result && (
                 <div className="animate-in fade-in slide-in-from-bottom-4">
                   <h3 className="text-green-500 font-bold mb-4 font-mono text-lg flex items-center gap-2">
                     <Sparkles size={16} /> RESULTADO:
                   </h3>
                   <div className="text-gray-300 whitespace-pre-wrap leading-loose font-mono text-sm">
                     {result}
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
