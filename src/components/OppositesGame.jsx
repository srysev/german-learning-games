import React, { useState, useEffect } from 'react';

const OppositesGame = () => {
  // Wörter und ihre Gegensätze
  const wordPairs = [
    { word: 'GROSS', opposite: 'KLEIN' },
    { word: 'HELL', opposite: 'DUNKEL' },
    { word: 'HOCH', opposite: 'TIEF' },
    { word: 'WARM', opposite: 'KALT' },
    { word: 'SCHNELL', opposite: 'LANGSAM' },
    { word: 'ALT', opposite: 'NEU' },
    { word: 'VOLL', opposite: 'LEER' },
    { word: 'SCHWER', opposite: 'LEICHT' },
    { word: 'LAUT', opposite: 'LEISE' },
    { word: 'STARK', opposite: 'SCHWACH' },
    { word: 'HART', opposite: 'WEICH' },
    { word: 'SAUER', opposite: 'SÜSS' },
    { word: 'NASS', opposite: 'TROCKEN' },
    { word: 'FRÜH', opposite: 'SPÄT' },
    { word: 'VORNE', opposite: 'HINTEN' }
  ];
  
  // Multiple-Choice-Optionen generieren
  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    const otherAnswers = wordPairs
      .map(pair => pair.opposite)
      .filter(opposite => opposite !== correctAnswer);
    
    // Zufällige falsche Antworten hinzufügen
    while (options.length < 3 && otherAnswers.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherAnswers.length);
      const option = otherAnswers.splice(randomIndex, 1)[0];
      options.push(option);
    }
    
    // Optionen mischen
    return options.sort(() => Math.random() - 0.5);
  };
  
  // State-Variablen
  const [currentPair, setCurrentPair] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [usedWords, setUsedWords] = useState([]);
  
  // Neues Wort auswählen
  const selectNewWord = () => {
    // Verfügbare Wörter (die noch nicht verwendet wurden)
    const availableWords = wordPairs.filter(pair => !usedWords.includes(pair.word));
    
    if (availableWords.length === 0) {
      // Alle Wörter wurden verwendet
      setGameOver(true);
      return;
    }
    
    // Zufälliges Wort auswählen
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedPair = availableWords[randomIndex];
    
    setCurrentPair(selectedPair);
    setOptions(generateOptions(selectedPair.opposite));
    setUsedWords([...usedWords, selectedPair.word]);
    setFeedback('');
  };
  
  // Spiel initialisieren
  useEffect(() => {
    selectNewWord();
  }, []);
  
  // Antwort prüfen
  const checkAnswer = (selectedOption) => {
    if (selectedOption === currentPair.opposite) {
      setFeedback('Richtig! 😊');
      setScore(score + 1);
    } else {
      setFeedback(`Falsch. Der Gegensatz von ${currentPair.word} ist ${currentPair.opposite}.`);
    }
    
    // Verzögerung, dann nächstes Wort
    setTimeout(() => {
      if (round < 10) {
        setRound(round + 1);
        selectNewWord();
      } else {
        setGameOver(true);
      }
    }, 1500);
  };
  
  // Spiel neu starten
  const restartGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setUsedWords([]);
    selectNewWord();
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6 mx-auto max-w-lg rounded-lg bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Gegensätze Spiel</h1>
      
      <div className="w-full p-4 mb-6 bg-blue-50 rounded-lg">
        <p className="text-lg mb-2">Runde: <span className="font-bold">{round}/10</span></p>
        <p className="text-lg">Punkte: <span className="font-bold">{score}</span></p>
      </div>
      
      {!gameOver ? (
        <>
          <div className="text-center mb-6">
            <p className="text-lg mb-2">Was ist das Gegenteil von:</p>
            <div className="text-3xl font-bold p-4 mb-4 bg-blue-100 rounded-lg">
              {currentPair?.word}
            </div>
            
            <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          {feedback && (
            <p className={`mt-4 text-lg font-medium ${feedback.includes('Richtig') ? 'text-green-600' : 'text-red-600'}`}>
              {feedback}
            </p>
          )}
        </>
      ) : (
        <div className="text-center mb-6">
          <p className="text-xl mb-4">Spiel beendet!</p>
          <p className="text-lg mb-6">Du hast <span className="font-bold">{score}</span> von <span className="font-bold">10</span> Punkten erreicht.</p>
          
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
          >
            Neues Spiel
          </button>
        </div>
      )}
    </div>
  );
};

export default OppositesGame;
