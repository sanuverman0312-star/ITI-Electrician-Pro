export const questionsData = [
  {
    id: 'q1',
    question: "Ohm's Law का formula क्या है?",
    questionEnglish: "What is the formula of Ohm's Law?",
    options: [
      "A. V = I × R",
      "B. P = V × I",
      "C. I = V + R",
      "D. R = V - I"
    ],
    correctAnswer: "A",
    explanation: "Ohm's Law के अनुसार, Voltage (V) = Current (I) × Resistance (R). यह electrical circuits का basic formula है जो voltage, current और resistance के बीच relation बताता है।",
    category: "Basic Electricity",
    difficulty: "easy",
    year: "1st",
    relatedTopic: "Ohm's Law"
  },
  {
    id: 'q2',
    question: "भारत में standard AC supply voltage कितनी होती है?",
    questionEnglish: "What is the standard AC supply voltage in India?",
    options: [
      "A. 110V",
      "B. 230V",
      "C. 440V",
      "D. 330V"
    ],
    correctAnswer: "B",
    explanation: "भारत में single phase AC supply voltage 230V होती है। Three phase supply 440V होती है। यह standard voltage घरों और offices में use होती है।",
    category: "Basic Electricity",
    difficulty: "easy",
    year: "1st",
    relatedTopic: "AC Supply"
  },
  {
    id: 'q3',
    question: "एक circuit में 230V पर 10A current flow हो रहा है। Total power कितनी होगी?",
    questionEnglish: "In a circuit, 10A current is flowing at 230V. What will be the total power?",
    options: [
      "A. 2300 Watts",
      "B. 23 Watts",
      "C. 230 Watts",
      "D. 2.3 Watts"
    ],
    correctAnswer: "A",
    explanation: "Power (P) = Voltage (V) × Current (I)\nP = 230V × 10A = 2300 Watts या 2.3 kW\n\nयह formula हर electrical load की power calculate करने में use होता है।",
    category: "Power Calculation",
    difficulty: "medium",
    year: "1st",
    relatedTopic: "Power Formula"
  },
  {
    id: 'q4',
    question: "Good conductor कौन सा material है?",
    questionEnglish: "Which is a good conductor?",
    options: [
      "A. Rubber",
      "B. Copper",
      "C. Glass",
      "D. Wood"
    ],
    correctAnswer: "B",
    explanation: "Copper एक excellent conductor है। इसकी conductivity बहुत high होती है, इसलिए electrical wiring में सबसे ज्यादा copper का use होता है। Aluminum भी conductor है लेकिन copper से कम effective है।",
    category: "Basic Electricity",
    difficulty: "easy",
    year: "1st",
    relatedTopic: "Conductors & Insulators"
  },
  {
    id: 'q5',
    question: "MCB का full form क्या है?",
    questionEnglish: "What is the full form of MCB?",
    options: [
      "A. Main Circuit Breaker",
      "B. Miniature Circuit Breaker",
      "C. Manual Circuit Breaker",
      "D. Magnetic Circuit Breaker"
    ],
    correctAnswer: "B",
    explanation: "MCB का full form 'Miniature Circuit Breaker' है। यह एक automatic switch है जो overload या short circuit होने पर circuit को disconnect कर देता है। यह fuse wire का modern replacement है।",
    category: "Protection Devices",
    difficulty: "easy",
    year: "2nd",
    relatedTopic: "MCB & Protection"
  },
  {
    id: 'q6',
    question: "किस motor में high starting torque होता है?",
    questionEnglish: "Which motor has high starting torque?",
    options: [
      "A. DC Shunt Motor",
      "B. DC Series Motor",
      "C. AC Synchronous Motor",
      "D. DC Compound Motor"
    ],
    correctAnswer: "B",
    explanation: "DC Series Motor में सबसे high starting torque होता है। इसलिए इसका use electric trains, cranes और hoists में होता है जहाँ heavy load को start करना होता है।",
    category: "Electrical Machines",
    difficulty: "medium",
    year: "2nd",
    relatedTopic: "DC Motors"
  },
  {
    id: 'q7',
    question: "Transformer किस principle पर काम करता है?",
    questionEnglish: "Transformer works on which principle?",
    options: [
      "A. Electrostatic Induction",
      "B. Electromagnetic Induction",
      "C. Mutual Induction",
      "D. Self Induction"
    ],
    correctAnswer: "C",
    explanation: "Transformer 'Mutual Induction' के principle पर काम करता है। जब एक coil में changing current flow होता है, तो nearby दूसरे coil में voltage induce होता है।",
    category: "Transformers",
    difficulty: "medium",
    year: "2nd",
    relatedTopic: "Transformer Basics"
  },
  {
    id: 'q8',
    question: "Earthing का main purpose क्या है?",
    questionEnglish: "What is the main purpose of earthing?",
    options: [
      "A. Save electricity",
      "B. Increase voltage",
      "C. Safety from electric shock",
      "D. Reduce current"
    ],
    correctAnswer: "C",
    explanation: "Earthing का main purpose safety provide करना है। यह leakage current को safely ground में भेज देता है और electric shock से बचाता है। यह electrical installation का जरूरी part है।",
    category: "Safety & Earthing",
    difficulty: "easy",
    year: "1st",
    relatedTopic: "Earthing System"
  },
  {
    id: 'q9',
    question: "1 kWh में कितने Wh (Watt-hour) होते हैं?",
    questionEnglish: "How many Wh (Watt-hours) are in 1 kWh?",
    options: [
      "A. 100 Wh",
      "B. 1000 Wh",
      "C. 10000 Wh",
      "D. 10 Wh"
    ],
    correctAnswer: "B",
    explanation: "1 kWh = 1000 Wh (Watt-hours)\nयह electrical energy का unit है। बिजली का bill kWh (Unit) में calculate होता है। 1 kWh का मतलब है 1000W का load 1 घंटे तक चलाना।",
    category: "Units & Measurements",
    difficulty: "easy",
    year: "1st",
    relatedTopic: "Electrical Units"
  },
  {
    id: 'q10',
    question: "RCCB की sensitivity residential area के लिए कितनी होनी चाहिए?",
    questionEnglish: "What should be the sensitivity of RCCB for residential area?",
    options: [
      "A. 10 mA",
      "B. 30 mA",
      "C. 100 mA",
      "D. 300 mA"
    ],
    correctAnswer: "B",
    explanation: "Residential area के लिए RCCB की sensitivity 30 mA होनी चाहिए। यह human safety के लिए सबसे appropriate है। 30 mA से ज्यादा current dangerous हो सकता है।",
    category: "Protection Devices",
    difficulty: "medium",
    year: "2nd",
    relatedTopic: "RCCB"
  },
  // Add 490 more questions to reach 500+
];

// Utility functions
export const getQuestionsByCategory = (category) => {
  return questionsData.filter(q => q.category === category);
};

export const getQuestionsByYear = (year) => {
  return questionsData.filter(q => q.year === year);
};

export const getQuestionsByDifficulty = (difficulty) => {
  return questionsData.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count) => {
  const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};