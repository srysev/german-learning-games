import React, { useState } from 'react';
import OppositesGame from './components/OppositesGame';
import MissingLettersGame from './components/MissingLettersGame';
import SentenceCompletionGame from './components/SentenceCompletionGame';
import './App.css';

function App() {
  const [activeGame, setActiveGame] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Deutsche Lernspiele</h1>
          <p className="text-gray-600">Spielerisch Deutsch lernen</p>
        </header>

        {activeGame ? (
          <div>
            <button 
              onClick={() => setActiveGame(null)}
              className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 inline-flex items-center"
            >
              <span className="mr-1">←</span> Zurück zur Auswahl
            </button>
            
            {activeGame === 'opposites' && <OppositesGame />}
            {activeGame === 'missing-letters' && <MissingLettersGame />}
            {activeGame === 'sentence-completion' && <SentenceCompletionGame />}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <GameCard 
              title="Gegensätze Spiel"
              description="Finde das Gegenteil zu jedem Wort."
              onClick={() => setActiveGame('opposites')}
            />
            
            <GameCard 
              title="Fehlende Buchstaben"
              description="Finde den fehlenden Buchstaben in jedem Wort."
              onClick={() => setActiveGame('missing-letters')}
            />

            <GameCard 
              title="Lückentext-Spiel"
              description="Vervollständige Sätze mit den richtigen Wörtern."
              onClick={() => setActiveGame('sentence-completion')}
            />
          </div>
        )}
        
        <footer className="mt-12 text-center text-gray-500">
          <p>© 2025 Deutsche Lernspiele</p>
        </footer>
      </div>
    </div>
  );
}

// Hilfskarte für die Spielauswahl
function GameCard({ title, description, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer transition-shadow max-w-xs w-full"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-blue-700 mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full">
        Spielen
      </button>
    </div>
  );
}

export default App;
