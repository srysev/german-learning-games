import React, { useState, useEffect } from 'react';

const OppositesGame = () => {
  // Words and their opposites
  const wordPairs = [
    // Original adjectives
    { word: 'GROSS', opposite: 'KLEIN', type: 'adjective' },
    { word: 'HELL', opposite: 'DUNKEL', type: 'adjective' },
    { word: 'HOCH', opposite: 'TIEF', type: 'adjective' },
    { word: 'WARM', opposite: 'KALT', type: 'adjective', example: 'Im Sommer ist es WARM, aber im Winter ist es KALT.' },
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
    { word: 'SCHÖN', opposite: 'HÄSSLICH', type: 'adjective', example: 'Es war ein SCHÖNER Tag, aber das Gewitter sah HÄSSLICH aus.' },
    { word: 'GUT', opposite: 'SCHLECHT', type: 'adjective', example: 'Das Essen schmeckt GUT, aber der Kaffee schmeckt SCHLECHT.' },
    { word: 'REICH', opposite: 'ARM', type: 'adjective' },
    { word: 'GLÜCKLICH', opposite: 'TRAURIG', type: 'adjective', example: 'Nach dem Gewinn war sie GLÜCKLICH, nach der Niederlage TRAURIG.' },
    { word: 'LANG', opposite: 'KURZ', type: 'adjective', example: 'Im Sommer trägt man KURZE Hosen, im Winter LANGE Mäntel.' },
    { word: 'BREIT', opposite: 'SCHMAL', type: 'adjective' },
    { word: 'DICK', opposite: 'DÜNN', type: 'adjective' },
    { word: 'JUNG', opposite: 'ALT', type: 'adjective', example: 'Meine Schwester ist noch JUNG, aber mein Großvater ist schon ALT.' },
    { word: 'WILD', opposite: 'ZAHM', type: 'adjective' },
    { word: 'OFFEN', opposite: 'GESCHLOSSEN', type: 'adjective', example: 'Der Laden ist morgens OFFEN und abends GESCHLOSSEN.' },
    { word: 'KLUG', opposite: 'DUMM', type: 'adjective' },
    { word: 'HÄSSLICH', opposite: 'SCHÖN', type: 'adjective' },
    { word: 'SAUBER', opposite: 'SCHMUTZIG', type: 'adjective', example: 'Nach dem Putzen ist alles SAUBER, vor dem Putzen ist es SCHMUTZIG.' },
    { word: 'FLEISSIG', opposite: 'FAUL', type: 'adjective' },
    { word: 'FREUNDLICH', opposite: 'UNFREUNDLICH', type: 'adjective' },
    { word: 'HÖFLICH', opposite: 'UNHÖFLICH', type: 'adjective' },
    { word: 'EINFACH', opposite: 'KOMPLIZIERT', type: 'adjective', example: 'Mathematik kann EINFACH oder KOMPLIZIERT sein, je nach Aufgabe.' },
    { word: 'GESUND', opposite: 'KRANK', type: 'adjective', example: 'Wer Sport treibt, bleibt GESUND. Wer zu viel arbeitet, wird manchmal KRANK.' },
    { word: 'GERADE', opposite: 'KRUMM', type: 'adjective' },
    { word: 'RUHIG', opposite: 'LAUT', type: 'adjective', example: 'Die Bibliothek ist RUHIG, aber die Disco ist LAUT.' },
    { word: 'SÜSS', opposite: 'BITTER', type: 'adjective' },
    { word: 'FRISCH', opposite: 'ABGESTANDEN', type: 'adjective' },
    { word: 'MUTIG', opposite: 'ÄNGSTLICH', type: 'adjective' },
    { word: 'WACH', opposite: 'MÜDE', type: 'adjective', example: 'Morgens bin ich WACH, abends bin ich MÜDE.' },
    { word: 'SICHER', opposite: 'UNSICHER', type: 'adjective' },
    { word: 'FREI', opposite: 'BESETZT', type: 'adjective', example: 'Dieser Platz ist FREI, aber jener ist BESETZT.' },
    { word: 'BILLIG', opposite: 'TEUER', type: 'adjective', example: 'Der Bleistift ist BILLIG, aber der Computer ist TEUER.' },
    { word: 'ORDENTLICH', opposite: 'UNORDENTLICH', type: 'adjective' },
    { word: 'VIEL', opposite: 'WENIG', type: 'adjective' },
    { word: 'TROCKEN', opposite: 'FEUCHT', type: 'adjective' },
    { word: 'LINKS', opposite: 'RECHTS', type: 'adjective', example: 'Das Buch liegt LINKS, die Lampe steht RECHTS.' },
    { word: 'DUNKEL', opposite: 'HELL', type: 'adjective', example: 'In der Nacht ist es DUNKEL, am Tag ist es HELL.' },
    { word: 'POSITIV', opposite: 'NEGATIV', type: 'adjective' },
    { word: 'LEER', opposite: 'VOLL', type: 'adjective', example: 'Das Glas ist halb VOLL oder halb LEER?' },
    
    // Nouns
    { word: 'TAG', opposite: 'NACHT', type: 'noun', example: 'Am TAG arbeiten wir, in der NACHT schlafen wir.' },
    { word: 'ANFANG', opposite: 'ENDE', type: 'noun', example: 'Am ANFANG des Buches ist die Einleitung, am ENDE steht das Fazit.' },
    { word: 'SOMMER', opposite: 'WINTER', type: 'noun', example: 'Im SOMMER schwimmen wir, im WINTER fahren wir Ski.' },
    { word: 'LIEBE', opposite: 'HASS', type: 'noun' },
    { word: 'FREUND', opposite: 'FEIND', type: 'noun' },
    { word: 'FRAGE', opposite: 'ANTWORT', type: 'noun', example: 'Auf jede FRAGE gibt es eine ANTWORT.' },
    { word: 'EINGANG', opposite: 'AUSGANG', type: 'noun', example: 'Der EINGANG ist vorne, der AUSGANG hinten.' },
    { word: 'ERFOLG', opposite: 'MISSERFOLG', type: 'noun' },
    { word: 'WAHRHEIT', opposite: 'LÜGE', type: 'noun' },
    { word: 'STÄRKE', opposite: 'SCHWÄCHE', type: 'noun' },
    { word: 'GEWINN', opposite: 'VERLUST', type: 'noun', example: 'Ein GEWINN macht froh, ein VERLUST macht traurig.' },
    { word: 'MÄNNCHEN', opposite: 'WEIBCHEN', type: 'noun' },
    { word: 'OSTEN', opposite: 'WESTEN', type: 'noun', example: 'Die Sonne geht im OSTEN auf und im WESTEN unter.' },
    { word: 'NORDEN', opposite: 'SÜDEN', type: 'noun' },
    { word: 'KRIEG', opposite: 'FRIEDEN', type: 'noun' },
    { word: 'ABFAHRT', opposite: 'ANKUNFT', type: 'noun', example: 'Die ABFAHRT ist um 8 Uhr, die ANKUNFT um 10 Uhr.' },
    { word: 'AUFSTIEG', opposite: 'ABSTIEG', type: 'noun' },
    { word: 'LICHT', opposite: 'SCHATTEN', type: 'noun', example: 'Wo LICHT ist, da ist auch SCHATTEN.' },
    { word: 'OPTIMIST', opposite: 'PESSIMIST', type: 'noun' },
    { word: 'MORGEN', opposite: 'ABEND', type: 'noun', example: 'Am MORGEN trinke ich Kaffee, am ABEND trinke ich Tee.' },
    { word: 'HITZE', opposite: 'KÄLTE', type: 'noun' },
    { word: 'FREUDE', opposite: 'TRAUER', type: 'noun' },
    { word: 'REICHTUM', opposite: 'ARMUT', type: 'noun' },
    { word: 'MANN', opposite: 'FRAU', type: 'noun', example: 'Der MANN trägt einen Anzug, die FRAU trägt ein Kleid.' },
    { word: 'IMPORT', opposite: 'EXPORT', type: 'noun' },
    { word: 'HEIMAT', opposite: 'FREMDE', type: 'noun' },
    { word: 'SIEG', opposite: 'NIEDERLAGE', type: 'noun' },
    { word: 'ZUKUNFT', opposite: 'VERGANGENHEIT', type: 'noun', example: 'Aus der VERGANGENHEIT lernen wir für die ZUKUNFT.' },
    
    // Verbs
    { word: 'KOMMEN', opposite: 'GEHEN', type: 'verb', example: 'Mein Freund KOMMT um 15 Uhr und GEHT um 18 Uhr.' },
    { word: 'ÖFFNEN', opposite: 'SCHLIESSEN', type: 'verb', example: 'Morgens ÖFFNET das Geschäft, abends SCHLIESST es wieder.' },
    { word: 'KAUFEN', opposite: 'VERKAUFEN', type: 'verb', example: 'Ich KAUFE ein Auto und er VERKAUFT sein Fahrrad.' },
    { word: 'LACHEN', opposite: 'WEINEN', type: 'verb' },
    { word: 'GEBEN', opposite: 'NEHMEN', type: 'verb', example: 'Es ist besser zu GEBEN als zu NEHMEN.' },
    { word: 'STEIGEN', opposite: 'FALLEN', type: 'verb', example: 'Die Preise STEIGEN im Winter und FALLEN im Sommer.' },
    { word: 'LIEBEN', opposite: 'HASSEN', type: 'verb' },
    { word: 'STARTEN', opposite: 'STOPPEN', type: 'verb' },
    { word: 'GEWINNEN', opposite: 'VERLIEREN', type: 'verb', example: 'Man kann nicht immer GEWINNEN, manchmal muss man auch VERLIEREN.' },
    { word: 'VERGESSEN', opposite: 'ERINNERN', type: 'verb', example: 'Ich VERGESSE oft meine Schlüssel, aber ich ERINNERE mich an deinen Geburtstag.' },
    { word: 'ANFANGEN', opposite: 'AUFHÖREN', type: 'verb' },
    { word: 'BAUEN', opposite: 'ZERSTÖREN', type: 'verb' },
    { word: 'EINSTEIGEN', opposite: 'AUSSTEIGEN', type: 'verb', example: 'An der ersten Haltestelle STEIGE ich EIN, an der letzten STEIGE ich AUS.' },
    { word: 'ARBEITEN', opposite: 'ENTSPANNEN', type: 'verb', example: 'Unter der Woche ARBEITE ich, am Wochenende ENTSPANNE ich mich.' },
    { word: 'ANZIEHEN', opposite: 'AUSZIEHEN', type: 'verb' },
    { word: 'EINSCHALTEN', opposite: 'AUSSCHALTEN', type: 'verb', example: 'Abends SCHALTE ich das Licht EIN, nachts SCHALTE ich es AUS.' },
    { word: 'BEGINNEN', opposite: 'ENDEN', type: 'verb' },
    { word: 'HEBEN', opposite: 'SENKEN', type: 'verb' },
    { word: 'WACHEN', opposite: 'SCHLAFEN', type: 'verb', example: 'Tagsüber WACHEN wir, nachts SCHLAFEN wir.' },
    { word: 'VERSTECKEN', opposite: 'FINDEN', type: 'verb', example: 'Die Kinder VERSTECKEN die Ostereier und die Eltern FINDEN sie.' },
    { word: 'HELFEN', opposite: 'BEHINDERN', type: 'verb' },
    { word: 'ANMELDEN', opposite: 'ABMELDEN', type: 'verb' },
    { word: 'EINATMEN', opposite: 'AUSATMEN', type: 'verb', example: 'Beim Yoga tief EINATMEN und langsam AUSATMEN.' },
    { word: 'BESCHLEUNIGEN', opposite: 'BREMSEN', type: 'verb' },
    { word: 'SPAREN', opposite: 'AUSGEBEN', type: 'verb', example: 'Im Winter SPAREN wir Geld, im Sommer GEBEN wir es AUS.' },
    { word: 'HINZUFÜGEN', opposite: 'ENTFERNEN', type: 'verb' },
    { word: 'TEILEN', opposite: 'SAMMELN', type: 'verb' },
    { word: 'ERLAUBEN', opposite: 'VERBIETEN', type: 'verb', example: 'Eltern ERLAUBEN manches und VERBIETEN anderes.' },
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  
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
    setSelectedOption(null);
    setShowNextButton(false);
  };
  
  // Initialize game
  useEffect(() => {
    selectNewWord();
  }, []);
  
  // Check answer
  const checkAnswer = (option) => {
    setSelectedOption(option);
    
    if (option === currentPair.opposite) {
      setFeedback('Richtig! 😊');
      setScore(score + 1);
    } else {
      // Find example sentence if it exists
      const example = currentPair.example ? 
        `\n\nBeispiel: ${currentPair.example}` : '';
      
      setFeedback(`Der Gegensatz von ${currentPair.word} ist ${currentPair.opposite}.${example}`);
    }
    
    setShowNextButton(true);
  };
  
  // Go to next word
  const goToNextWord = () => {
    if (round < 10) {
      setRound(round + 1);
      selectNewWord();
    } else {
      setGameOver(true);
    }
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
                  disabled={selectedOption !== null}
                  className={`py-3 px-6 text-white rounded-md font-medium 
                    ${selectedOption === null ? 'bg-blue-600 hover:bg-blue-700' : 
                      option === currentPair?.opposite ? 'bg-green-600' : 
                      selectedOption === option ? 'bg-amber-500' : 'bg-gray-400'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          {feedback && (
            <div className={`mt-4 p-4 rounded-lg ${feedback.includes('Richtig') ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              <p className="text-lg font-medium whitespace-pre-line">
                {feedback}
              </p>
              
              {showNextButton && (
                <button
                  onClick={goToNextWord}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Weiter
                </button>
              )}
            </div>
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
