import React, { useState, useEffect } from 'react';

const MissingLettersGame = () => {
  // Wörterliste nach Kategorien
  const wordCategories = {
    TIERE: ['HUND', 'KATZE', 'MAUS', 'VOGEL', 'FISCH', 'PFERD', 'TIGER', 'ZEBRA', 'HASE', 'IGEL'],
    FARBEN: ['BLAU', 'GRÜN', 'GELB', 'ROT', 'WEISS', 'BRAUN', 'LILA', 'PINK', 'GRAU', 'ORANGE'],
    ESSEN: ['APFEL', 'BROT', 'MILCH', 'KÄSE', 'PIZZA', 'NUDEL', 'WURST', 'SUPPE', 'OBST', 'SALAT'],
    NATUR: ['BAUM', 'BERG', 'FLUSS', 'WALD', 'SONNE', 'WOLKE', 'REGEN', 'STERN', 'BLUME', 'GRAS'],
    REISEN: ['ZELT', 'HOTEL', 'STRAND', 'KOFFER', 'KARTE', 'PASS', 'FLUG', 'BAHN', 'MEER', 'INSEL'],
    HOBBYS: ['SPORT', 'MUSIK', 'LESEN', 'MALEN', 'GARTEN', 'TANZEN', 'KOCHEN', 'FILM', 'KUNST', 'SPIEL']
  };
  
  // State-Variablen
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [missingLetter, setMissingLetter] = useState('');
  const [missingIndex, setMissingIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  // Zufälliges Wort aus einer Kategorie wählen
  const selectRandomWord = () => {
    const categories = Object.keys(wordCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const words = wordCategories[randomCategory];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    setCurrentCategory(randomCategory);
    setCurrentWord(randomWord);
    
    // Zufälligen Buchstaben ausblenden
    const index = Math.floor(Math.random() * randomWord.length);
    const letter = randomWord.charAt(index);
    
    // Wort mit fehlendem Buchstaben erstellen
    let masked = '';
    for (let i = 0; i < randomWord.length; i++) {
      if (i === index) {
        masked += '_';
      } else {
        masked += randomWord.charAt(i);
      }
    }
    
    setMissingLetter(letter);
    setMissingIndex(index);
    setDisplayWord(masked);
    setUserInput('');
    setFeedback('');
    setAnswered(false);
  };
  
  // Überprüfen, ob die Eingabe korrekt ist
  const checkAnswer = () => {
    const userLetterUpper = userInput.toUpperCase();
    
    if (userLetterUpper === missingLetter) {
      setFeedback('Richtig! 😊');
      setScore(score + 1);
    } else {
      setFeedback(`Falsch. Der richtige Buchstabe ist ${missingLetter}`);
    }
    
    setAnswered(true);
  };
  
  // Zur nächsten Runde weitergehen
  const goToNextRound = () => {
    if (round < 10) {
      setRound(round + 1);
      selectRandomWord();
    } else {
      setGameOver(true);
    }
  };
  
  // Spiel starten beim ersten Rendern
  useEffect(() => {
    selectRandomWord();
  }, []);
  
  // Spiel neu starten
  const restartGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    selectRandomWord();
  };
  
  // Eingabefeld-Handler
  const handleInputChange = (e) => {
    // Nur den ersten Buchstaben akzeptieren
    if (e.target.value.length > 0) {
      setUserInput(e.target.value.charAt(0));
    } else {
      setUserInput('');
    }
  };
  
  // Bei Eingabe-Enter-Taste Antwort prüfen
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userInput && !answered) {
      checkAnswer();
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6 mx-auto max-w-lg rounded-lg bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Fehlende Buchstaben Spiel</h1>
      
      <div className="w-full p-4 mb-6 bg-blue-50 rounded-lg">
        <p className="text-lg mb-2">Kategorie: <span className="font-bold">{currentCategory}</span></p>
        <p className="text-lg mb-2">Runde: <span className="font-bold">{round}/10</span></p>
        <p className="text-lg">Punkte: <span className="font-bold">{score}</span></p>
      </div>
      
      {!gameOver ? (
        <>
          <div className="text-center mb-6">
            <p className="text-lg mb-2">Welcher Buchstabe fehlt?</p>
            <div className="flex justify-center items-center space-x-2">
              {displayWord.split('').map((char, index) => (
                <div 
                  key={index} 
                  className={`w-12 h-12 flex items-center justify-center text-2xl font-bold border-2 
                            ${char === '_' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full max-w-xs mb-6">
            <label htmlFor="letterInput" className="block text-lg mb-2 text-center">Deine Antwort:</label>
            <div className="flex justify-center">
              <input
                id="letterInput"
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maxLength="1"
                disabled={answered}
                className="w-16 h-16 text-center text-2xl font-bold border-2 border-blue-500 rounded-md"
                autoFocus
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center mb-6">
            {!answered ? (
              <button
                onClick={checkAnswer}
                disabled={!userInput}
                className={`px-6 py-2 rounded-md text-white font-medium
                          ${userInput ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'}`}
              >
                Prüfen
              </button>
            ) : (
              <button
                onClick={goToNextRound}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Weiter
              </button>
            )}
            
            {feedback && (
              <p className={`mt-4 text-lg font-medium ${feedback.includes('Richtig') ? 'text-green-600' : 'text-red-600'}`}>
                {feedback}
              </p>
            )}
          </div>
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

export default MissingLettersGame;