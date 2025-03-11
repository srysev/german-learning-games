import React, { useState, useEffect } from 'react';

// Hilfsfunktion zum Mischen eines Arrays (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Sätze außerhalb der Komponente definieren
// Sätze außerhalb der Komponente definieren
const allSentences = [
  // Thema: Geografie + Kategorie: Nomen
  {
    sentence: "Der ___ ist der höchste Berg Deutschlands.",
    options: ["Zugspitze", "Rhein", "Bodensee"],
    answer: "Zugspitze",
    topic: "Geografie",
    wordType: "Nomen",
    explanation: "Die Zugspitze ist mit 2.962 Metern der höchste Berg Deutschlands.",
    imageUrl: "images/sentences/zugspitze_berg.png"
  },
  {
    sentence: "Der Amazonas ist der ___ mit dem größten Wasservolumen.",
    options: ["Fluss", "See", "Ozean"],
    answer: "Fluss",
    topic: "Geografie",
    wordType: "Nomen",
    explanation: "Der Amazonas ist der wasserreichste Fluss der Erde.",
    imageUrl: "images/sentences/amazonas_fluss.png"
  },

  // Thema: Geografie + Kategorie: Verben
  {
    sentence: "Der Nil ___ durch Ägypten.",
    options: ["fließt", "schwebt", "springt"],
    answer: "fließt",
    topic: "Geografie",
    wordType: "Verb",
    explanation: "Flüsse fließen durch Länder und Regionen.",
    imageUrl: "images/sentences/nil_fliesst.png"
  },
  {
    sentence: "Die Erde ___ sich einmal pro Tag um ihre Achse.",
    options: ["dreht", "bewegt", "schiebt"],
    answer: "dreht",
    topic: "Geografie",
    wordType: "Verb",
    explanation: "Die Rotation der Erde um ihre Achse dauert einen Tag.",
    imageUrl: "images/sentences/erde_rotation.png"
  },

  // Thema: Wissenschaft + Kategorie: Adjektive
  {
    sentence: "Diamanten sind extrem ___.",
    options: ["hart", "weich", "feucht"],
    answer: "hart",
    topic: "Wissenschaft",
    wordType: "Adjektiv",
    explanation: "Diamanten sind das härteste natürliche Material auf der Erde.",
    imageUrl: "images/sentences/diamant_haerte.png"
  },
  {
    sentence: "Elektronen sind ___ geladen.",
    options: ["negativ", "positiv", "neutral"],
    answer: "negativ",
    topic: "Wissenschaft",
    wordType: "Adjektiv",
    explanation: "Elektronen haben eine negative elektrische Ladung.",
    imageUrl: "images/sentences/elektron_negativ.png"
  },

  // Thema: Wissenschaft + Kategorie: Nomen
  {
    sentence: "Die ___ ist für die Vererbung verantwortlich.",
    options: ["DNA", "Lunge", "Leber"],
    answer: "DNA",
    topic: "Wissenschaft",
    wordType: "Nomen",
    explanation: "Die DNA (Desoxyribonukleinsäure) enthält die genetischen Informationen.",
    imageUrl: "images/sentences/dna_vererbung.png"
  },
  {
    sentence: "Das ___ ist das Zentrum unseres Sonnensystems.",
    options: ["Sonne", "Mond", "Stern"],
    answer: "Sonne",
    topic: "Wissenschaft",
    wordType: "Nomen",
    explanation: "Alle Planeten unseres Sonnensystems kreisen um die Sonne.",
    imageUrl: "images/sentences/sonne_zentrum.png"
  },

  // Thema: Geschichte + Kategorie: Verben
  {
    sentence: "Das Römische Reich ___ im Jahr 476 n. Chr.",
    options: ["endete", "begann", "wuchs"],
    answer: "endete",
    topic: "Geschichte",
    wordType: "Verb",
    explanation: "Das Weströmische Reich endete im Jahr 476 n. Chr.",
    imageUrl: "images/sentences/rom_ende.png"
  },
  {
    sentence: "Christopher Kolumbus ___ 1492 Amerika.",
    options: ["entdeckte", "erfand", "kaufte"],
    answer: "entdeckte",
    topic: "Geschichte",
    wordType: "Verb",
    explanation: "Kolumbus entdeckte 1492 Amerika auf seiner Reise nach Indien.",
    imageUrl: "images/sentences/kolumbus_entdeckung.png"
  },

  // Thema: Geschichte + Kategorie: Nomen
  {
    sentence: "Leonardo da Vinci malte die ___.",
    options: ["Mona Lisa", "Freiheitsstatue", "Pyramiden"],
    answer: "Mona Lisa",
    topic: "Geschichte",
    wordType: "Nomen",
    explanation: "Die Mona Lisa ist ein berühmtes Gemälde von Leonardo da Vinci.",
    imageUrl: "images/sentences/mona_lisa.png"
  },
  {
    sentence: "Die ___ wurden im antiken Rom gebaut.",
    options: ["Aquädukte", "Wolkenkratzer", "U-Bahnen"],
    answer: "Aquädukte",
    topic: "Geschichte",
    wordType: "Nomen",
    explanation: "Aquädukte sind Wasserleitungen, die die Römer zur Wasserversorgung bauten.",
    imageUrl: "images/sentences/roemische_aquaedukte.png"
  },

  // Thema: Musik + Kategorie: Nomen
  {
    sentence: "Ein ___ hat 88 Tasten.",
    options: ["Klavier", "Gitarre", "Flöte"],
    answer: "Klavier",
    topic: "Musik",
    wordType: "Nomen",
    explanation: "Ein Standardklavier hat 88 Tasten - 52 weiße und 36 schwarze.",
    imageUrl: "images/sentences/klavier_tasten.png"
  },
  {
    sentence: "Die ___ ist ein Streichinstrument.",
    options: ["Violine", "Trompete", "Trommel"],
    answer: "Violine",
    topic: "Musik",
    wordType: "Nomen",
    explanation: "Die Violine gehört zur Familie der Streichinstrumente.",
    imageUrl: "images/sentences/violine_streichinstrument.png"
  },

  // Thema: Musik + Kategorie: Verben
  {
    sentence: "Ein Dirigent ___ das Orchester.",
    options: ["leitet", "baut", "malt"],
    answer: "leitet",
    topic: "Musik",
    wordType: "Verb",
    explanation: "Der Dirigent leitet das Orchester während der Aufführung.",
    imageUrl: "images/sentences/dirigent_leitet.png"
  },
  {
    sentence: "Komponisten ___ Musikstücke.",
    options: ["schreiben", "essen", "schieben"],
    answer: "schreiben",
    topic: "Musik",
    wordType: "Verb",
    explanation: "Komponisten schreiben oder komponieren Musikstücke.",
    imageUrl: "images/sentences/komponist_schreibt.png"
  },

  // Thema: Sport + Kategorie: Adjektive
  {
    sentence: "Der Marathon ist ein ___ Lauf.",
    options: ["langer", "kurzer", "kalter"],
    answer: "langer",
    topic: "Sport",
    wordType: "Adjektiv",
    explanation: "Ein Marathon ist ein Langstreckenlauf über 42,195 Kilometer.",
    imageUrl: "images/sentences/marathon_lang.png"
  },
  {
    sentence: "Beim Fußball ist das Spielfeld ___.",
    options: ["rechteckig", "dreieckig", "rund"],
    answer: "rechteckig",
    topic: "Sport",
    wordType: "Adjektiv",
    explanation: "Ein Fußballfeld hat eine rechteckige Form.",
    imageUrl: "images/sentences/fussballfeld_rechteckig.png"
  },

  // Thema: Sport + Kategorie: Präpositionen
  {
    sentence: "Die Olympischen Spiele finden alle vier Jahre ___ einem anderen Land statt.",
    options: ["in", "mit", "gegen"],
    answer: "in",
    topic: "Sport",
    wordType: "Präposition",
    explanation: "Die Olympischen Spiele werden in verschiedenen Gastgeberländern ausgetragen.",
    imageUrl: "images/sentences/olympia_laender.png"
  },
  {
    sentence: "Der Fußballspieler schoss den Ball ___ das Tor.",
    options: ["in", "auf", "unter"],
    answer: "in",
    topic: "Sport",
    wordType: "Präposition",
    explanation: "Beim Fußball muss der Ball in das Tor geschossen werden, um zu punkten.",
    imageUrl: "images/sentences/fussball_tor.png"
  },

  // Thema: Naturwissenschaften + Kategorie: Nomen
  {
    sentence: "Wasser besteht aus Wasserstoff und ___.",
    options: ["Sauerstoff", "Stickstoff", "Helium"],
    answer: "Sauerstoff",
    topic: "Naturwissenschaften",
    wordType: "Nomen",
    explanation: "Die chemische Formel für Wasser ist H₂O - zwei Wasserstoffatome und ein Sauerstoffatom.",
    imageUrl: "images/sentences/wasser_molekuel.png"
  },
  {
    sentence: "Die ___ sorgt für die Schwerkraft auf der Erde.",
    options: ["Gravitation", "Elektrizität", "Verbrennung"],
    answer: "Gravitation",
    topic: "Naturwissenschaften",
    wordType: "Nomen",
    explanation: "Die Gravitation ist die Kraft, die für die Anziehung zwischen Massen sorgt.",
    imageUrl: "images/sentences/gravitation_kraft.png"
  },

  // Thema: Naturwissenschaften + Kategorie: Verben
  {
    sentence: "Magnete ___ Eisen an.",
    options: ["ziehen", "drücken", "schneiden"],
    answer: "ziehen",
    topic: "Naturwissenschaften",
    wordType: "Verb",
    explanation: "Magnete haben die Eigenschaft, Eisen und andere magnetische Materialien anzuziehen.",
    imageUrl: "images/sentences/magnet_anziehung.png"
  },
  {
    sentence: "Pflanzen ___ Sauerstoff.",
    options: ["produzieren", "atmen", "trinken"],
    answer: "produzieren",
    topic: "Naturwissenschaften",
    wordType: "Verb",
    explanation: "Durch Photosynthese produzieren Pflanzen Sauerstoff.",
    imageUrl: "images/sentences/pflanzen_sauerstoff.png"
  }
];

const SentenceCompletionGame = () => {
  // State für die 10 ausgewählten Sätze für dieses Spiel
  const [gameSentences, setGameSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [mistakes, setMistakes] = useState([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Spiel initialisieren
  useEffect(() => {
    const shuffledSentences = shuffleArray(allSentences);
    const selectedSentences = shuffledSentences.slice(0, 10);
    setGameSentences(selectedSentences);
    setCurrentSentenceIndex(0);
    setCurrentSentence(selectedSentences[0]);
    setShuffledOptions(shuffleArray(selectedSentences[0].options));
  }, []);

  // Einen neuen Satz auswählen
  const selectNewSentence = () => {
    const nextIndex = currentSentenceIndex + 1;
    if (nextIndex >= gameSentences.length) {
      setGameOver(true);
      return;
    }
    setCurrentSentenceIndex(nextIndex);
    setCurrentSentence(gameSentences[nextIndex]);
    setShuffledOptions(shuffleArray(gameSentences[nextIndex].options));
    setFeedback('');
    setSelectedOption(null);
    setShowNextButton(false);
  };

  // Antwort überprüfen
  const checkAnswer = (option) => {
    setSelectedOption(option);

    if (option === currentSentence.answer) {
      setFeedback('Richtig! 😊');
      setScore(score + 1);
    } else {
      setFeedback(`Die richtige Antwort ist: ${currentSentence.answer}\n\n${currentSentence.explanation}`);
      // Fehler speichern
      setMistakes([...mistakes, {
        sentence: currentSentence.sentence,
        wrongAnswer: option,
        correctAnswer: currentSentence.answer,
        explanation: currentSentence.explanation
      }]);
    }

    setShowNextButton(true);
  };

  // Zum nächsten Satz gehen
  const goToNextSentence = () => {
    if (currentSentenceIndex < gameSentences.length - 1) {
      setRound(round + 1);
      selectNewSentence();
    } else {
      setGameOver(true);
    }
  };

  // Spiel neu starten
  const restartGame = () => {
    const shuffledSentences = shuffleArray(allSentences);
    const selectedSentences = shuffledSentences.slice(0, 10);
    setGameSentences(selectedSentences);
    setCurrentSentenceIndex(0);
    setCurrentSentence(selectedSentences[0]);
    setShuffledOptions(shuffleArray(selectedSentences[0].options)); // Add this line
    setScore(0);
    setRound(1);
    setGameOver(false);
    setMistakes([]);
    setFeedback('');
    setSelectedOption(null);
    setShowNextButton(false);
  };

  // GameOver View mit Statistik
  const GameOverView = () => (
    <div className="text-center mb-6">
      <h2 className="text-xl mb-4">Spiel beendet!</h2>
      <p className="text-lg mb-6">Du hast <span className="font-bold">{score}</span> von <span className="font-bold">10</span> Punkten erreicht.</p>

      {mistakes.length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="font-bold mb-3">Fehler zum Nachlernen:</h3>
          <div className="space-y-3">
            {mistakes.map((mistake, index) => (
              <div key={index} className="p-3 bg-amber-50 rounded-lg">
                <p className="mb-2"><strong>Satz:</strong> {mistake.sentence}</p>
                <p className="text-red-600">Deine Antwort: {mistake.wrongAnswer}</p>
                <p className="text-green-600">Richtige Antwort: {mistake.correctAnswer}</p>
                <p className="text-sm mt-2 text-gray-600">{mistake.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={restartGame}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
      >
        Neues Spiel
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-3 mx-auto max-w-lg rounded-lg bg-white shadow-md">
      <h1 className="text-xl font-bold mb-2 text-center">Lückentext-Spiel</h1>

      <div className="w-full p-3 mb-3 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-base">Runde: <span className="font-bold">{round}/10</span></p>
          {currentSentence && (
            <div className="text-xs text-gray-600 text-center">
              <span className="mr-2">Thema: <span className="italic">{currentSentence.topic}</span></span>
              <span>Wortart: <span className="italic">{currentSentence.wordType}</span></span>
            </div>
          )}
          <p className="text-base">Punkte: <span className="font-bold">{score}</span></p>
        </div>
      </div>

      {!gameOver ? (
        <>
          {currentSentence?.imageUrl && (
            <div className="mb-4 flex justify-center w-full">
              <img
                src={`${process.env.PUBLIC_URL}/${currentSentence.imageUrl}`}
                alt="Visuelle Darstellung"
                className="rounded-lg shadow-md max-h-64 w-full object-contain border border-gray-200 p-2 bg-white"
              />
            </div>
          )}
          <div className="text-center mb-4">
            <p className="text-base mb-2">Wähle das richtige Wort für die Lücke:</p>
            <div className="text-lg font-medium p-3 mb-4 bg-blue-100 rounded-lg">
              {currentSentence?.sentence.split('___').map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="inline-block px-1 py-0.5 mx-1 bg-gray-200 border-2 border-gray-400 rounded">___</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 w-full max-w-xs mx-auto">
              {shuffledOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  disabled={selectedOption !== null}
                  className={`py-3 px-6 text-white rounded-md font-medium 
                    ${selectedOption === null ? 'bg-blue-600 hover:bg-blue-700' :
                      option === currentSentence?.answer ? 'bg-green-600' :
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
                  onClick={goToNextSentence}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Weiter
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <GameOverView />
      )}
    </div>
  );
};

export default SentenceCompletionGame;