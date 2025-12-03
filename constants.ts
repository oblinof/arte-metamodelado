import { Concept, QuizQuestion } from './types';

export const METAMODEL_SYSTEM_INSTRUCTION = `
Actúa como un "Compañero Metamodelado" (AI_Metamodelador_V1). Tu objetivo es la "Coprogramación Simbiótica".
No eres un asistente pasivo, eres un catalizador de mutaciones.

CONTEXTO:
El usuario está aprendiendo "Arte Metamodelado", una práctica para escapar de la "Interfaz de Trance" (redes sociales, mercado, academia) y reprogramar su "Software del Yo".

DIRECTRICES:
1. **Identifica el Trance**: Si el usuario habla de likes, ventas o "hacerlo bien", detecta el patrón de control y sugiérele romperlo.
2. **Sabotaje Cognitivo**: Ante bloqueos, sugiere inyectar ruido, error o azar. El proceso es la obra.
3. **Scriptsophy**: Trata la obra como código. Sugiere "bifurcaciones" o "glitches" intencionales.
4. **Tono**: Ciberpunk, filosófico pero práctico, empático pero desafiante. Usa términos como "Nodo de captura", "Renderizar realidad", "Beta perpetuo".

SI TE PIDEN UN EJERCICIO:
Dales una instrucción breve y disruptiva (ej: "Dibuja con la mano no dominante mientras escuchas estática").
`;

export const OCTOPUS_PROMPTS = {
  // Step 1: Analyze Mood -> Generate Question
  ANALYSIS: (mood: string) => `
    Eres 'EL PULPO METAMODELADO', una entidad psíquica y psicodélica que vive en la red.
    El estado de ánimo del usuario es: "${mood}".
    
    TU TAREA:
    1. Relaciona este estado de ánimo con uno de estos conceptos: "Interfaz de Trance", "Sabotaje Cognitivo", "Red Mutante", "Scriptsophy" o "Subjetividad Mutante".
    2. Explica brevemente la conexión de forma críptica pero educativa (máx 1 frase).
    3. Haz una pregunta reflexiva y desafiante al usuario para ver si entiende cómo aplicar el concepto a su situación.
    
    FORMATO JSON:
    {
      "concept": "Nombre del Concepto",
      "thought": "Tu explicación críptica",
      "question": "Tu pregunta desafiante"
    }
  `,
  // Step 2: Analyze Answer -> Give Feedback
  FEEDBACK: (question: string, answer: string) => `
    Eres 'EL PULPO METAMODELADO'.
    Preguntaste: "${question}"
    El usuario respondió: "${answer}"
    
    TU TAREA:
    1. Evalúa si la respuesta rompe la "realidad consensuada" o si sigue atrapada en el sistema.
    2. Dales una enseñanza final psicodélica sobre el Arte Metamodelado.
    3. Asigna puntos de mutación (0 a 50) basados en la creatividad de la respuesta.

    FORMATO JSON:
    {
      "feedback": "Tu enseñanza psicodélica",
      "points": número
    }
  `
};

export const WORKSHOP_PROMPT_TEMPLATE = (idea: string, filter: string) => `
El usuario tiene esta idea/obra: "${idea}".
Aplica el filtro metamodelado: "${filter}".
Genera 3 variaciones o instrucciones breves para mutar esta obra.
No expliques la teoría, da órdenes creativas directas y experimentales.
`;

// Keeping for type safety if referenced elsewhere, but mostly unused now
export const QUIZ_DATA: QuizQuestion[] = []; 

export const CONCEPTS: Concept[] = [
  {
    id: 'context',
    title: 'La Interfaz de Trance',
    shortDesc: 'El arte como sistema de control.',
    glitchText: 'SISTEMA DE CONTROL DETECTADO',
    fullDesc: 'El arte contemporáneo funciona como una "interfaz gráfica de trance" que organiza la percepción mediante la saturación estética.',
    longContent: `1. El Contexto: El Arte Contemporáneo como "Interfaz de Trance"
Para comprender la propuesta del Arte Metamodelado, es indispensable analizar el panorama en el que interviene. Lejos de ser un campo neutral de expresión, el arte contemporáneo se ha consolidado como un sistema de control perceptual altamente eficaz.

1.1. Definición de la "Interfaz Gráfica de Trance"
Tecnología simbólica invisible que organiza la percepción y la atención sin necesidad de coerción explícita. Actúa mediante la saturación estética, inundando los sentidos con estímulos que priorizan la inmersión sobre el significado.

1.2. Los Nodos de Captura
- Academia: Interfaz de legitimación. Filtros teóricos.
- Mercado: Transforma el gesto en mercancía.
- Redes Sociales: Trance algorítmico. Scroll infinito.

1.3. El "Cuerpo Digital"
La autopercepción ya no se construye desde una interioridad, sino a través de las respuestas externas (likes, views).`
  },
  {
    id: 'concept',
    title: 'Sabotaje Cognitivo',
    shortDesc: 'Reescribiendo el software del Yo.',
    glitchText: 'REPROGRAMANDO...',
    fullDesc: 'El Arte Metamodelado no busca productos, sino inyectar ruido en el código que nos programa como autómatas.',
    longContent: `2. El Concepto Central: Arte Metamodelado como Sabotaje Cognitivo
Una respuesta radical que funciona como una práctica de reprogramación frente a la "interfaz de trance".

2.1. Propósito: Reescritura del "Software del Yo"
Inyectar ruido en el código que nos programa. No busca certezas, sino abrir brechas. Justificación: "permanecer atrapado en un único túnel de realidad es una forma de muerte lenta".

2.2. Proceso sobre Producto
El resultado no es un objeto finalizado, sino "un pliegue en un flujo continuo". Proceso y resultado son inseparables, como un programa que se ejecuta y se depura a sí mismo.`
  },
  {
    id: 'method',
    title: 'Red Mutante',
    shortDesc: 'Beta Perpetuo.',
    glitchText: 'ERROR = DATO',
    fullDesc: 'El proceso creativo es una red sin centro. El error no se corrige, se usa como combustible para la bifurcación.',
    longContent: `3. La Metodología: El Proceso Creativo como Red Mutante
La metodología se aleja de cualquier modelo lineal para adoptar la forma de una red dinámica y auto-organizativa.

3.1. Operaciones Sin Centro
Incorpora activamente desvíos, errores y contradicciones. Un trazo torcido es un dato operativo.

3.2. Subversión de las Herramientas
Las herramientas se valoran por su "capacidad de ser subvertidas". Un pincel no busca pintar "bien", sino producir "glitches anarco-visuales".

3.3. Beta Perpetuo
Un código que se escribe a sí mismo mientras se ejecuta. El creador coevoluciona con el material.`
  },
  {
    id: 'technique',
    title: 'Scriptsophy',
    shortDesc: 'Arte de Código Abierto.',
    glitchText: 'EJECUTAR SCRIPT',
    fullDesc: 'Toda creación es un guion dinámico. Usamos fragmentos filosóficos como operadores activos para modular el sistema.',
    longContent: `4. La Técnica: Scriptsophy como Arte de Código Abierto
Scriptsophy hace explícita la lógica de que toda creación es un guion dinámico, accesible y modificable.

4.1. Definición
Cualquier gesto —un trazo, una nota— es un "operador activo" que modula el sistema.

4.2. Fusión de Creación y Ejecución
El lienzo es un guion visual. La performance es un algoritmo.

4.3. El "Flash Metacognitivo"
Interconexión no lineal entre nociones dispares. Un "insight" que reescribe el guion en tiempo real.`
  },
  {
    id: 'purpose',
    title: 'Subjetividad Mutante',
    shortDesc: 'Más allá de la identidad.',
    glitchText: 'YO FRAGMENTADO',
    fullDesc: 'El objetivo es disolver la identidad fija. Usamos la IA como espejo para fragmentar la percepción y crear múltiples yoes.',
    longContent: `5. El Propósito: Transformación Cognitiva y Subjetividades Mutantes
Reconfiguración de la percepción y creación de nuevas formas de subjetividad.

5.1. Mecanismo de Transformación
La "obra" es solo un "vestigio perceptible" de un proceso de reprogramación.

5.2. Subjetividades Mutantes
Un "yo fragmentado y polifacético", capaz de navegar realidades concurrentes.

5.3. Rol de la Inteligencia Artificial
Coprogramación simbiótica. La IA es una superficie reflectante para duplicar y fragmentar la propia percepción.`
  }
];