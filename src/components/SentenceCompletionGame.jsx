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
const allSentences = [
  // Thema: Geografie + Kategorie: Nomen
  { 
    sentence: "Die ___ ist der höchste Berg Deutschlands.", 
    options: ["Zugspitze", "Rhein", "Bodensee"], 
    answer: "Zugspitze",
    topic: "Geografie",
    wordType: "Nomen",
    explanation: "Die Zugspitze ist mit 2.962 Metern der höchste Berg Deutschlands."
  },
  { 
    sentence: "Der Amazonas ist der ___ mit dem größten Wasservolumen.", 
    options: ["Fluss", "See", "Ozean"], 
    answer: "Fluss",
    topic: "Geografie",
    wordType: "Nomen",
    explanation: "Der Amazonas ist der wasserreichste Fluss der Erde."
  },
  
  // Thema: Geografie + Kategorie: Verben
  { 
    sentence: "Der Nil ___ durch Ägypten.", 
    options: ["fließt", "schwebt", "springt"], 
    answer: "fließt",
    topic: "Geografie",
    wordType: "Verb",
    explanation: "Flüsse fließen durch Länder und Regionen."
  },
  { 
    sentence: "Die Erde ___ sich einmal pro Tag um ihre Achse.", 
    options: ["dreht", "schwebt", "schiebt"], 
    answer: "dreht",
    topic: "Geografie",
    wordType: "Verb",
    explanation: "Die Rotation der Erde um ihre Achse dauert einen Tag."
  },
  
  // Thema: Wissenschaft + Kategorie: Adjektive
  { 
    sentence: "Diamanten sind extrem ___.", 
    options: ["hart", "weich", "feucht"], 
    answer: "hart",
    topic: "Wissenschaft",
    wordType: "Adjektiv",
    explanation: "Diamanten sind das härteste natürliche Material auf der Erde."
  },
  { 
    sentence: "Elektronen sind ___ geladen.", 
    options: ["negativ", "positiv", "neutral"], 
    answer: "negativ",
    topic: "Wissenschaft",
    wordType: "Adjektiv",
    explanation: "Elektronen haben eine negative elektrische Ladung."
  },
  
  // Thema: Wissenschaft + Kategorie: Nomen
  { 
    sentence: "Die ___ ist für die Vererbung verantwortlich.", 
    options: ["DNA", "Lunge", "Leber"], 
    answer: "DNA",
    topic: "Wissenschaft",
    wordType: "Nomen",
    explanation: "Die DNA (Desoxyribonukleinsäure) enthält die genetischen Informationen."
  },
  { 
    sentence: "Die ___ ist das Zentrum unseres Sonnensystems.", 
    options: ["Sonne", "Mond", "Stern"], 
    answer: "Sonne",
    topic: "Wissenschaft",
    wordType: "Nomen",
    explanation: "Alle Planeten unseres Sonnensystems kreisen um die Sonne."
  },
  
  // Thema: Geschichte + Kategorie: Verben
  { 
    sentence: "Das Römische Reich ___ im Jahr 476 n. Chr.", 
    options: ["endete", "begann", "wuchs"], 
    answer: "endete",
    topic: "Geschichte",
    wordType: "Verb",
    explanation: "Das Weströmische Reich endete im Jahr 476 n. Chr."
  },
  { 
    sentence: "Christopher Kolumbus ___ 1492 Amerika.", 
    options: ["entdeckte", "erfand", "kaufte"], 
    answer: "entdeckte",
    topic: "Geschichte",
    wordType: "Verb",
    explanation: "Kolumbus entdeckte 1492 Amerika auf seiner Reise nach Indien."
  },
  
  // Thema: Geschichte + Kategorie: Nomen
  { 
    sentence: "Leonardo da Vinci malte die ___.", 
    options: ["Mona Lisa", "Freiheitsstatue", "Pyramiden"], 
    answer: "Mona Lisa",
    topic: "Geschichte",
    wordType: "Nomen",
    explanation: "Die Mona Lisa ist ein berühmtes Gemälde von Leonardo da Vinci."
  },
  { 
    sentence: "Die ___ wurden im antiken Rom gebaut.", 
    options: ["Aquädukte", "Wolkenkratzer", "U-Bahnen"], 
    answer: "Aquädukte",
    topic: "Geschichte",
    wordType: "Nomen",
    explanation: "Aquädukte sind Wasserleitungen, die die Römer zur Wasserversorgung bauten."
  },
  
  // Thema: Musik + Kategorie: Nomen
  { 
    sentence: "Ein ___ hat 88 Tasten.", 
    options: ["Klavier", "Gitarre", "Flöte"], 
    answer: "Klavier",
    topic: "Musik",
    wordType: "Nomen",
    explanation: "Ein Standardklavier hat 88 Tasten - 52 weiße und 36 schwarze."
  },
  { 
    sentence: "Die ___ ist ein Streichinstrument.", 
    options: ["Violine", "Trompete", "Trommel"], 
    answer: "Violine",
    topic: "Musik",
    wordType: "Nomen",
    explanation: "Die Violine gehört zur Familie der Streichinstrumente."
  },
  
  // Thema: Musik + Kategorie: Verben
  { 
    sentence: "Ein Dirigent ___ das Orchester.", 
    options: ["leitet", "baut", "malt"], 
    answer: "leitet",
    topic: "Musik",
    wordType: "Verb",
    explanation: "Der Dirigent leitet das Orchester während der Aufführung."
  },
  { 
    sentence: "Komponisten ___ Musikstücke.", 
    options: ["komponieren", "reparieren", "kochen"], 
    answer: "komponieren",
    topic: "Musik",
    wordType: "Verb",
    explanation: "Komponisten komponieren Musikstücke, das heißt, sie erschaffen und notieren neue musikalische Werke."
  },
  
  // Thema: Sport + Kategorie: Adjektive
  { 
    sentence: "Der Marathon ist ein ___ Lauf.", 
    options: ["langer", "kurzer", "kalter"], 
    answer: "langer",
    topic: "Sport",
    wordType: "Adjektiv",
    explanation: "Ein Marathon ist ein Langstreckenlauf über 42,195 Kilometer."
  },
  { 
    sentence: "Beim Fußball ist das Spielfeld ___.", 
    options: ["rechteckig", "dreieckig", "rund"], 
    answer: "rechteckig",
    topic: "Sport",
    wordType: "Adjektiv",
    explanation: "Ein Fußballfeld hat eine rechteckige Form."
  },
  
  // Thema: Sport + Kategorie: Präpositionen
  { 
    sentence: "Die Olympischen Spiele finden alle vier Jahre ___ einem anderen Land statt.", 
    options: ["in", "mit", "gegen"], 
    answer: "in",
    topic: "Sport",
    wordType: "Präposition",
    explanation: "Die Olympischen Spiele werden in verschiedenen Gastgeberländern ausgetragen."
  },
  { 
    sentence: "Der Fußballspieler erzielte ein Tor, indem er den Ball ___ das Netz schoss.", 
    options: ["in", "neben", "über"], 
    answer: "in",
    topic: "Sport",
    wordType: "Präposition",
    explanation: "Wenn ein Tor erzielt wird, geht der Ball in das Netz oder Tor."
  },
  
  // Thema: Naturwissenschaften + Kategorie: Nomen
  { 
    sentence: "Wasser besteht aus Wasserstoff und ___.", 
    options: ["Sauerstoff", "Stickstoff", "Helium"], 
    answer: "Sauerstoff",
    topic: "Naturwissenschaften",
    wordType: "Nomen",
    explanation: "Die chemische Formel für Wasser ist H₂O - zwei Wasserstoffatome und ein Sauerstoffatom."
  },
  { 
    sentence: "Die ___ sorgt für die Schwerkraft auf der Erde.", 
    options: ["Gravitation", "Elektrizität", "Verbrennung"], 
    answer: "Gravitation",
    topic: "Naturwissenschaften",
    wordType: "Nomen",
    explanation: "Die Gravitation ist die Kraft, die für die Anziehung zwischen Massen sorgt."
  },
  
  // Thema: Naturwissenschaften + Kategorie: Verben
  { 
    sentence: "Magnete ___ Eisen an.", 
    options: ["ziehen", "drücken", "schneiden"], 
    answer: "ziehen",
    topic: "Naturwissenschaften",
    wordType: "Verb",
    explanation: "Magnete haben die Eigenschaft, Eisen und andere magnetische Materialien anzuziehen."
  },
  { 
    sentence: "Pflanzen ___ Sauerstoff.", 
    options: ["produzieren", "atmen", "trinken"], 
    answer: "produzieren",
    topic: "Naturwissenschaften",
    wordType: "Verb",
    explanation: "Durch Photosynthese produzieren Pflanzen Sauerstoff."
  },
  // 30 zusätzliche einfachere und alltagsnahe Sätze für das SentenceCompletionGame
  // Alltagssituationen
  { 
    sentence: "Zum Zähneputzen braucht man eine ___.", 
    options: ["Zahnbürste", "Gabel", "Schere"], 
    answer: "Zahnbürste",
    topic: "Alltag",
    wordType: "Nomen",
    explanation: "Man benutzt eine Zahnbürste, um die Zähne zu putzen."
  },
  { 
    sentence: "Morgens ___ viele Menschen Kaffee.", 
    options: ["trinken", "essen", "lesen"], 
    answer: "trinken",
    topic: "Alltag",
    wordType: "Verb",
    explanation: "Kaffee ist ein Getränk, das viele Menschen morgens trinken."
  },
  { 
    sentence: "In der Nacht ist es normalerweise ___.", 
    options: ["dunkel", "hell", "laut"], 
    answer: "dunkel",
    topic: "Alltag",
    wordType: "Adjektiv",
    explanation: "Wenn die Sonne weg ist, wird es dunkel in der Nacht."
  },
  
  // Essen und Trinken
  { 
    sentence: "Brot kann man beim ___ kaufen.", 
    options: ["Bäcker", "Metzger", "Friseur"], 
    answer: "Bäcker",
    topic: "Essen",
    wordType: "Nomen",
    explanation: "Ein Bäcker stellt Brot und andere Backwaren her und verkauft sie."
  },
  { 
    sentence: "Äpfel wachsen an einem ___.", 
    options: ["Baum", "Strauch", "Boden"], 
    answer: "Baum",
    topic: "Essen",
    wordType: "Nomen",
    explanation: "Äpfel sind Früchte, die an Apfelbäumen wachsen."
  },
  { 
    sentence: "Suppe isst man mit einem ___.", 
    options: ["Löffel", "Messer", "Glas"], 
    answer: "Löffel",
    topic: "Essen",
    wordType: "Nomen",
    explanation: "Ein Löffel ist das passende Besteck zum Essen von Suppe."
  },
  
  // Freizeit und Hobbys
  { 
    sentence: "Im Kino kann man ___ anschauen.", 
    options: ["Filme", "Bücher", "Fische"], 
    answer: "Filme",
    topic: "Freizeit",
    wordType: "Nomen",
    explanation: "Kinos sind Orte, wo Filme auf großen Leinwänden gezeigt werden."
  },
  { 
    sentence: "Mit einem Ball kann man ___ spielen.", 
    options: ["Fußball", "Schach", "Karten"], 
    answer: "Fußball",
    topic: "Freizeit",
    wordType: "Nomen",
    explanation: "Fußball ist ein beliebtes Ballspiel, das mit den Füßen gespielt wird."
  },
  { 
    sentence: "Zum Schwimmen geht man ins ___.", 
    options: ["Schwimmbad", "Theater", "Restaurant"], 
    answer: "Schwimmbad",
    topic: "Freizeit",
    wordType: "Nomen",
    explanation: "Ein Schwimmbad ist ein Ort mit Becken voller Wasser zum Schwimmen."
  },
  
  // Familie und soziale Beziehungen
  { 
    sentence: "Die Tochter meiner Schwester ist meine ___.", 
    options: ["Nichte", "Cousine", "Tante"], 
    answer: "Nichte",
    topic: "Familie",
    wordType: "Nomen",
    explanation: "Die Kinder der eigenen Geschwister nennt man Neffe (Junge) oder Nichte (Mädchen)."
  },
  { 
    sentence: "Meine Mutter und mein Vater sind meine ___.", 
    options: ["Eltern", "Geschwister", "Großeltern"], 
    answer: "Eltern",
    topic: "Familie",
    wordType: "Nomen",
    explanation: "Vater und Mutter zusammen werden als Eltern bezeichnet."
  },
  { 
    sentence: "Freunde ___ oft gemeinsam Zeit.", 
    options: ["verbringen", "verkaufen", "vergessen"], 
    answer: "verbringen",
    topic: "Beziehungen",
    wordType: "Verb",
    explanation: "Freunde verbringen gerne Zeit miteinander, um ihre Freundschaft zu pflegen."
  },
  
  // Wohnen und Haushalt
  { 
    sentence: "In einem Bett kann man ___.", 
    options: ["schlafen", "kochen", "duschen"], 
    answer: "schlafen",
    topic: "Wohnen",
    wordType: "Verb",
    explanation: "Ein Bett ist ein Möbelstück zum Schlafen."
  },
  { 
    sentence: "Zum Kochen braucht man einen ___.", 
    options: ["Herd", "Teppich", "Spiegel"], 
    answer: "Herd",
    topic: "Haushalt",
    wordType: "Nomen",
    explanation: "Auf einem Herd werden Töpfe und Pfannen erhitzt, um Speisen zu kochen."
  },
  { 
    sentence: "Die Wäsche wird in der ___ gewaschen.", 
    options: ["Waschmaschine", "Spülmaschine", "Mikrowelle"], 
    answer: "Waschmaschine",
    topic: "Haushalt",
    wordType: "Nomen",
    explanation: "Eine Waschmaschine ist ein Gerät zum Reinigen von Kleidung und anderen Textilien."
  },
  
  // Einkaufen
  { 
    sentence: "Im Supermarkt kann man ___ kaufen.", 
    options: ["Lebensmittel", "Autos", "Häuser"], 
    answer: "Lebensmittel",
    topic: "Einkaufen",
    wordType: "Nomen",
    explanation: "Supermärkte verkaufen hauptsächlich Lebensmittel und andere Dinge des täglichen Bedarfs."
  },
  { 
    sentence: "An der Kasse muss man ___.", 
    options: ["bezahlen", "schlafen", "tanzen"], 
    answer: "bezahlen",
    topic: "Einkaufen",
    wordType: "Verb",
    explanation: "An der Kasse bezahlt man für die Waren, die man kaufen möchte."
  },
  { 
    sentence: "Die Preise in diesem Geschäft sind sehr ___.", 
    options: ["günstig", "schwer", "langsam"], 
    answer: "günstig",
    topic: "Einkaufen",
    wordType: "Adjektiv",
    explanation: "Wenn etwas günstig ist, kostet es wenig Geld."
  },
  
  // Transportmittel und Reisen
  { 
    sentence: "Mit dem ___ kann man über den Himmel fliegen.", 
    options: ["Flugzeug", "Auto", "Fahrrad"], 
    answer: "Flugzeug",
    topic: "Transport",
    wordType: "Nomen",
    explanation: "Flugzeuge sind Luftfahrzeuge, die durch die Luft fliegen können."
  },
  { 
    sentence: "Für eine lange Reise packt man einen ___.", 
    options: ["Koffer", "Teller", "Hammer"], 
    answer: "Koffer",
    topic: "Reisen",
    wordType: "Nomen",
    explanation: "In einem Koffer transportiert man Kleidung und andere Dinge auf Reisen."
  },
  { 
    sentence: "Im Auto muss man sich mit dem ___ anschnallen.", 
    options: ["Gurt", "Lenkrad", "Radio"], 
    answer: "Gurt",
    topic: "Transport",
    wordType: "Nomen",
    explanation: "Der Sicherheitsgurt schützt die Insassen bei einem Unfall."
  },
  
  // Wetter und Jahreszeiten
  { 
    sentence: "Im Winter fällt oft ___.", 
    options: ["Schnee", "Sand", "Obst"], 
    answer: "Schnee",
    topic: "Wetter",
    wordType: "Nomen",
    explanation: "Schnee ist gefrorener Niederschlag, der typischerweise im Winter fällt."
  },
  { 
    sentence: "Bei ___ benutzt man einen Regenschirm.", 
    options: ["Regen", "Sonne", "Wind"], 
    answer: "Regen",
    topic: "Wetter",
    wordType: "Nomen",
    explanation: "Ein Regenschirm schützt vor dem Nasswerden bei Regen."
  },
  { 
    sentence: "Im Sommer ist es oft sehr ___.", 
    options: ["heiß", "kalt", "dunkel"], 
    answer: "heiß",
    topic: "Wetter",
    wordType: "Adjektiv",
    explanation: "Der Sommer ist die wärmste Jahreszeit mit oft heißen Temperaturen."
  },
  
  // Tiere und Natur
  { 
    sentence: "Eine ___ gibt Milch.", 
    options: ["Kuh", "Katze", "Ente"], 
    answer: "Kuh",
    topic: "Tiere",
    wordType: "Nomen",
    explanation: "Kühe sind Nutztiere, die Milch geben, die wir trinken können."
  },
  { 
    sentence: "Ein Vogel hat ___ zum Fliegen.", 
    options: ["Flügel", "Hufe", "Kiemen"], 
    answer: "Flügel",
    topic: "Tiere",
    wordType: "Nomen",
    explanation: "Vögel haben Flügel, mit denen sie fliegen können."
  },
  { 
    sentence: "Fische ___ im Wasser.", 
    options: ["schwimmen", "gehen", "fliegen"], 
    answer: "schwimmen",
    topic: "Tiere",
    wordType: "Verb",
    explanation: "Fische leben im Wasser und bewegen sich durch Schwimmen fort."
  },
  
  // Schule und Bildung
  { 
    sentence: "In der Schule lernen Kinder ___.", 
    options: ["lesen", "schlafen", "gehen"], 
    answer: "lesen",
    topic: "Bildung",
    wordType: "Verb",
    explanation: "Lesen ist eine grundlegende Fähigkeit, die Kindern in der Schule beigebracht wird."
  },
  { 
    sentence: "Mit einem ___ kann man schreiben.", 
    options: ["Stift", "Teller", "Schuh"], 
    answer: "Stift",
    topic: "Bildung",
    wordType: "Nomen",
    explanation: "Ein Stift ist ein Werkzeug zum Schreiben oder Zeichnen auf Papier."
  },
  { 
    sentence: "Die Lehrerin erklärt den Schülern die ___.", 
    options: ["Aufgabe", "Suppe", "Tür"], 
    answer: "Aufgabe",
    topic: "Bildung",
    wordType: "Nomen",
    explanation: "In der Schule erklären Lehrer den Schülern verschiedene Aufgaben, die sie lösen sollen."
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

  // Spiel initialisieren
  useEffect(() => {
    const shuffledSentences = shuffleArray(allSentences);
    const selectedSentences = shuffledSentences.slice(0, 10);
    setGameSentences(selectedSentences);
    setCurrentSentenceIndex(0);
    setCurrentSentence(selectedSentences[0]);
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
    <div className="flex flex-col items-center justify-center p-6 mx-auto max-w-lg rounded-lg bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Lückentext-Spiel</h1>
      
      <div className="w-full p-4 mb-6 bg-blue-50 rounded-lg">
        <div className="flex justify-between">
          <p className="text-lg mb-2">Runde: <span className="font-bold">{round}/10</span></p>
          <p className="text-lg">Punkte: <span className="font-bold">{score}</span></p>
        </div>
        {currentSentence && (
          <div className="mt-2 flex flex-wrap">
            <p className="text-sm text-gray-600 mr-4">Thema: <span className="italic">{currentSentence.topic}</span></p>
            <p className="text-sm text-gray-600">Wortart: <span className="italic">{currentSentence.wordType}</span></p>
          </div>
        )}
      </div>
      
      {!gameOver ? (
        <>
          <div className="text-center mb-6">
            <p className="text-lg mb-2">Wähle das richtige Wort für die Lücke:</p>
            <div className="text-xl font-medium p-4 mb-6 bg-blue-100 rounded-lg">
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
              {currentSentence?.options.map((option, index) => (
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