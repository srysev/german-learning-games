import React, { useState, useEffect } from 'react';

const OppositesGame = () => {
  // Words and their opposites
  const wordPairs = [
    // Original adjectives
    { word: 'GROSS', opposite: 'KLEIN', type: 'adjective' },
    { word: 'HELL', opposite: 'DUNKEL', type: 'adjective' },
    { word: 'HOCH', opposite: 'TIEF', type: 'adjective' },
    { word: 'WARM', opposite: 'KALT', type: 'adjective' },
    { word: 'SCHNELL', opposite: 'LANGSAM', type: 'adjective' },
    { word: 'ALT', opposite: 'NEU', type: 'adjective' },
    { word: 'VOLL', opposite: 'LEER', type: 'adjective' },
    { word: 'SCHWER', opposite: 'LEICHT', type: 'adjective' },
    { word: 'LAUT', opposite: 'LEISE', type: 'adjective' },
    { word: 'STARK', opposite: 'SCHWACH', type: 'adjective' },
    { word: 'HART', opposite: 'WEICH', type: 'adjective' },
    { word: 'SAUER', opposite: 'SÜSS', type: 'adjective' },
    { word: 'NASS', opposite: 'TROCKEN', type: 'adjective' },
    { word: 'FRÜH', opposite: 'SPÄT', type: 'adjective' },
    { word: 'VORNE', opposite: 'HINTEN', type: 'adjective' },
    
    // More adjectives
    { word: 'HEISS', opposite: 'KALT', type: 'adjective' },
    { word: 'SCHÖN', opposite: 'HÄSSLICH', type: 'adjective' },
    { word: 'GUT', opposite: 'SCHLECHT', type: 'adjective' },
    { word: 'REICH', opposite: 'ARM', type: 'adjective' },
    { word: 'GLÜCKLICH', opposite: 'TRAURIG', type: 'adjective' },
    { word: 'LANG', opposite: 'KURZ', type: 'adjective' },
    { word: 'BREIT', opposite: 'SCHMAL', type: 'adjective' },
    { word: 'DICK', opposite: 'DÜNN', type: 'adjective' },
    { word: 'JUNG', opposite: 'ALT', type: 'adjective' },
    { word: 'WILD', opposite: 'ZAHM', type: 'adjective' },
    { word: 'OFFEN', opposite: 'GESCHLOSSEN', type: 'adjective' },
    { word: 'KLUG', opposite: 'DUMM', type: 'adjective' },
    { word: 'HÄSSLICH', opposite: 'SCHÖN', type: 'adjective' },
    { word: 'SAUBER', opposite: 'SCHMUTZIG', type: 'adjective' },
    { word: 'FLEISSIG', opposite: 'FAUL', type: 'adjective' },
    { word: 'FREUNDLICH', opposite: 'UNFREUNDLICH', type: 'adjective' },
    { word: 'HÖFLICH', opposite: 'UNHÖFLICH', type: 'adjective' },
    { word: 'EINFACH', opposite: 'KOMPLIZIERT', type: 'adjective' },
    { word: 'GESUND', opposite: 'KRANK', type: 'adjective' },
    { word: 'GERADE', opposite: 'KRUMM', type: 'adjective' },
    { word: 'RUHIG', opposite: 'LAUT', type: 'adjective' },
    { word: 'SÜSS', opposite: 'BITTER', type: 'adjective' },
    { word: 'FRISCH', opposite: 'ABGESTANDEN', type: 'adjective' },
    { word: 'MUTIG', opposite: 'ÄNGSTLICH', type: 'adjective' },
    { word: 'WACH', opposite: 'MÜDE', type: 'adjective' },
    { word: 'SICHER', opposite: 'UNSICHER', type: 'adjective' },
    { word: 'FREI', opposite: 'BESETZT', type: 'adjective' },
    { word: 'BILLIG', opposite: 'TEUER', type: 'adjective' },
    { word: 'ORDENTLICH', opposite: 'UNORDENTLICH', type: 'adjective' },
    { word: 'VIEL', opposite: 'WENIG', type: 'adjective' },
    { word: 'TROCKEN', opposite: 'FEUCHT', type: 'adjective' },
    { word: 'LINKS', opposite: 'RECHTS', type: 'adjective' },
    { word: 'DUNKEL', opposite: 'HELL', type: 'adjective' },
    { word: 'POSITIV', opposite: 'NEGATIV', type: 'adjective' },
    { word: 'LEER', opposite: 'VOLL', type: 'adjective' },
    
    // Nouns
    { word: 'TAG', opposite: 'NACHT', type: 'noun' },
    { word: 'ANFANG', opposite: 'ENDE', type: 'noun' },
    { word: 'SOMMER', opposite: 'WINTER', type: 'noun' },
    { word: 'LIEBE', opposite: 'HASS', type: 'noun' },
    { word: 'FREUND', opposite: 'FEIND', type: 'noun' },
    { word: 'FRAGE', opposite: 'ANTWORT', type: 'noun' },
    { word: 'EINGANG', opposite: 'AUSGANG', type: 'noun' },
    { word: 'ERFOLG', opposite: 'MISSERFOLG', type: 'noun' },
    { word: 'WAHRHEIT', opposite: 'LÜGE', type: 'noun' },
    { word: 'STÄRKE', opposite: 'SCHWÄCHE', type: 'noun' },
    { word: 'GEWINN', opposite: 'VERLUST', type: 'noun' },
    { word: 'MÄNNCHEN', opposite: 'WEIBCHEN', type: 'noun' },
    { word: 'OSTEN', opposite: 'WESTEN', type: 'noun' },
    { word: 'NORDEN', opposite: 'SÜDEN', type: 'noun' },
    { word: 'KRIEG', opposite: 'FRIEDEN', type: 'noun' },
    { word: 'ABFAHRT', opposite: 'ANKUNFT', type: 'noun' },
    { word: 'AUFSTIEG', opposite: 'ABSTIEG', type: 'noun' },
    { word: 'LICHT', opposite: 'SCHATTEN', type: 'noun' },
    { word: 'OPTIMIST', opposite: 'PESSIMIST', type: 'noun' },
    { word: 'MORGEN', opposite: 'ABEND', type: 'noun' },
    { word: 'HITZE', opposite: 'KÄLTE', type: 'noun' },
    { word: 'FREUDE', opposite: 'TRAUER', type: 'noun' },
    { word: 'REICHTUM', opposite: 'ARMUT', type: 'noun' },
    { word: 'MANN', opposite: 'FRAU', type: 'noun' },
    { word: 'IMPORT', opposite: 'EXPORT', type: 'noun' },
    { word: 'HEIMAT', opposite: 'FREMDE', type: 'noun' },
    { word: 'SIEG', opposite: 'NIEDERLAGE', type: 'noun' },
    { word: 'ZUKUNFT', opposite: 'VERGANGENHEIT', type: 'noun' },
    
    // Verbs
    { word: 'KOMMEN', opposite: 'GEHEN', type: 'verb' },
    { word: 'ÖFFNEN', opposite: 'SCHLIESSEN', type: 'verb' },
    { word: 'KAUFEN', opposite: 'VERKAUFEN', type: 'verb' },
    { word: 'LACHEN', opposite: 'WEINEN', type: 'verb' },
    { word: 'GEBEN', opposite: 'NEHMEN', type: 'verb' },
    { word: 'STEIGEN', opposite: 'FALLEN', type: 'verb' },
    { word: 'LIEBEN', opposite: 'HASSEN', type: 'verb' },
    { word: 'STARTEN', opposite: 'STOPPEN', type: 'verb' },
    { word: 'GEWINNEN', opposite: 'VERLIEREN', type: 'verb' },
    { word: 'VERGESSEN', opposite: 'ERINNERN', type: 'verb' },
    { word: 'ANFANGEN', opposite: 'AUFHÖREN', type: 'verb' },
    { word: 'BAUEN', opposite: 'ZERSTÖREN', type: 'verb' },
    { word: 'EINSTEIGEN', opposite: 'AUSSTEIGEN', type: 'verb' },
    { word: 'ARBEITEN', opposite: 'ENTSPANNEN', type: 'verb' },
    { word: 'ANZIEHEN', opposite: 'AUSZIEHEN', type: 'verb' },
    { word: 'EINSCHALTEN', opposite: 'AUSSCHALTEN', type: 'verb' },
    { word: 'BEGINNEN', opposite: 'ENDEN', type: 'verb' },
    { word: 'HEBEN', opposite: 'SENKEN', type: 'verb' },
    { word: 'WACHEN', opposite: 'SCHLAFEN', type: 'verb' },
    { word: 'VERSTECKEN', opposite: 'FINDEN', type: 'verb' },
    { word: 'HELFEN', opposite: 'BEHINDERN', type: 'verb' },
    { word: 'ANMELDEN', opposite: 'ABMELDEN', type: 'verb' },
    { word: 'EINATMEN', opposite: 'AUSATMEN', type: 'verb' },
    { word: 'BESCHLEUNIGEN', opposite: 'BREMSEN', type: 'verb' },
    { word: 'SPAREN', opposite: 'AUSGEBEN', type: 'verb' },
    { word: 'HINZUFÜGEN', opposite: 'ENTFERNEN', type: 'verb' },
    { word: 'TEILEN', opposite: 'SAMMELN', type: 'verb' },
    { word: 'ERLAUBEN', opposite: 'VERBIETEN', type: 'verb' },
    { word: 'VERBINDEN', opposite: 'TRENNEN', type: 'verb' }
  ];
  
  // Generate multiple-choice options
  const generateOptions = (correctAnswer, wordType) => {
    const options = [correctAnswer];
    const otherAnswers = wordPairs
      .filter(pair => pair.type === wordType) // Filter by same word type
      .map(pair => pair.opposite)
      .filter(opposite => opposite !== correctAnswer);
    
    // Add random incorrect answers
    while (options.length < 3 && otherAnswers.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherAnswers.length);
      const option = otherAnswers.splice(randomIndex, 1)[0];
      options.push(option);
    }
    
    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
  };
  
  // State variables
  const [currentPair, setCurrentPair] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [usedWords, setUsedWords] = useState([]);
  
  // Select a new word
  const selectNewWord = () => {
    // Available words (that haven't been used yet)
    const availableWords = wordPairs.filter(pair => !usedWords.includes(pair.word));
    
    if (availableWords.length === 0) {
      // All words have been used
      setGameOver(true);
      return;
    }
    
    // Select a random word
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedPair = availableWords[randomIndex];
    
    setCurrentPair(selectedPair);
    setOptions(generateOptions(selectedPair.opposite, selectedPair.type));
    setUsedWords([...usedWords, selectedPair.word]);
    setFeedback('');
  };
  
  // Initialize game
  useEffect(() => {
    selectNewWord();
  }, []);
  
  // Check answer
  const checkAnswer = (selectedOption) => {
    if (selectedOption === currentPair.opposite) {
      setFeedback('Richtig! 😊');
      setScore(score + 1);
    } else {
      setFeedback(`Falsch. Der Gegensatz von ${currentPair.word} ist ${currentPair.opposite}.`);
    }
    
    // Delay, then next word
    setTimeout(() => {
      if (round < 10) {
        setRound(round + 1);
        selectNewWord();
      } else {
        setGameOver(true);
      }
    }, 1500);
  };
  
  // Restart game
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
        {currentPair && (
          <p className="text-sm text-gray-600 mt-1">Wortart: <span className="italic">
            {currentPair.type === 'adjective' ? 'Adjektiv' : 
             currentPair.type === 'noun' ? 'Nomen' : 'Verb'}
          </span></p>
        )}
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
