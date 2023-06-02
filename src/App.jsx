import { useState, useEffect } from 'react';
import './App.css';
import { FaBlackTie, FaCanadianMapleLeaf, FaDiaspora, FaDelicious, FaDribbble, FaEnvira, FaConfluence, FaFontAwesomeFlag } from 'react-icons/fa';
import JuegoColores from './components/JuegoColores';
import JuegoPreguntas from './components/JuegoPreguntas';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import JuegoMemoria from './components/JuegoMemoria';
import Navbar from './components/Navbar';

function App() {
  // Juego Colores
  const [level, setLevel] = useState(generateColors(1)); // Almacena el nivel actual del juego de colores
  const [gameOver, setGameOver] = useState(false); // Indica si el juego de colores ha terminado
  const [win, setWin] = useState(false); // Indica si el juego de colores ha sido ganado
  const [levelCounter, setLevelCounter] = useState(1); // Contador para el nivel actual del juego de colores

  // Juego Preguntas
  const [questions, setQuestions] = useState([]); // Almacena las preguntas del juego de preguntas
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Índice de la pregunta actual
  const [levelCounterQ, setLevelCounterQ] = useState(1); // Contador para el nivel actual del juego de preguntas
  const [gameOverQ, setGameOverQ] = useState(false); // Indica si el juego de preguntas ha terminado
  const [winQ, setWinQ] = useState(false); // Indica si el juego de preguntas ha sido ganado
  const [shuffledAnswers, setShuffledAnswers] = useState([]); // Almacena las respuestas mezcladas de la pregunta actual

  // Juego Memoria
  const [cards, setCards] = useState([]); // Almacena las cartas del juego de memoria
  const [turns, setTurns] = useState(0); // Contador de los turnos en el juego de memoria
  const [choiceOne, setChoiceOne] = useState(null); // Primera carta seleccionada en el juego de memoria
  const [choiceTwo, setChoiceTwo] = useState(null); // Segunda carta seleccionada en el juego de memoria
  const [disabled, setDisabled] = useState(null); // Indica si las cartas están deshabilitadas temporalmente

  // Carga de preguntas desde un archivo JSON al montar el componente
  useEffect(() => {
    fetch('/src/preguntas.json')
      .then((response) => response.json())
      .then((data) => {
        const shuffledQuestions = shuffleArray(data);
        setQuestions(shuffledQuestions);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Mezcla las respuestas cuando cambia la pregunta actual
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [currentQuestion.respuestaCorrecta, ...currentQuestion.respuestasIncorrectas];
      const shuffledArray = shuffleArray(answers);
      setShuffledAnswers(shuffledArray);
    }
  }, [questions, currentQuestionIndex]);

  // Comprueba si se ha alcanzado el nivel máximo en el juego de colores
  useEffect(() => {
    if (levelCounter === 20) {
      setWin(true);
    }
  }, [levelCounter]);

  // Comprueba si se ha alcanzado el nivel máximo en el juego de preguntas
  useEffect(() => {
    if (levelCounterQ === 15) {
      setWinQ(true);
    }
  }, [levelCounterQ]);

  // Compara las dos cartas seleccionadas en el juego de memoria
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.icon === choiceTwo.icon) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.icon === choiceOne.icon) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Mezcla las cartas al cargar el juego de memoria
  useEffect(() => {
    shuffleCards();
  }, []);


  //JUEGO DE COLORES

  // Función para el juego de colores
  const juegoColores = (mem) => {
    if (mem.id <= 8) {
      console.log('Perdiste el juego');
      setGameOver(true);
    } else {
      setLevel([]);
      setLevelCounter((prevLevelCounter) => prevLevelCounter + 1);
      setLevel(generateColors(levelCounter + 1));
    }
  };

  // Genera los colores para el juego de colores en función del nivel
  function generateColors(levelCounter) {
    const colors = [];
    let variationAmount = 75;


    // Ajustar la variación del color según el nivel actual
    if (levelCounter > 5 && levelCounter <= 10) {
      variationAmount = 50; // Mayor variación en niveles 6-10
    } else if (levelCounter > 10 && levelCounter <= 15) {
      variationAmount = 30; // Mayor variación en niveles 11-15
    } else if (levelCounter > 15) {
      variationAmount = 20; // Mayor variación en niveles 16 en adelante
    }

    const baseR = Math.floor(Math.random() * 256);
    const baseG = Math.floor(Math.random() * 256);
    const baseB = Math.floor(Math.random() * 256);
    const baseColor = `rgb(${baseR}, ${baseG}, ${baseB})`;

    for (let i = 1; i <= 8; i++) {
      colors.push({ id: i, color: baseColor });
    }

    const modifiedR = baseR > 127 ? baseR - variationAmount : baseR + variationAmount;
    const modifiedColor = `rgb(${modifiedR}, ${baseG}, ${baseB})`;
    const randomIndex = Math.floor(Math.random() * 8);
    colors.splice(randomIndex, 0, { id: 9, color: modifiedColor });

    return colors;
  }

  //JUEGO PREGUNTAS

  // Función para el juego de preguntas
  const juegoPreguntas = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.respuestaCorrecta) {
      setLevelCounterQ((prevLevelCounter) => prevLevelCounter + 1);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      setGameOverQ(true);
    }
  };

  // Aparecen las pregunas aleatoriamente
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Reinicia el juego de preguntas
  const reiniciarJuego = () => {
    setGameOverQ(false);
    setLevelCounterQ(1);
    setCurrentQuestionIndex(0);
    setWinQ(false);
    const shuffledQuestions = shuffleArray(questions);
    setQuestions(shuffledQuestions);
  };

  // JUEGO MEMORIA

  const cardImages = [
    { icon: <FaBlackTie size={144} color='blue' />, matched: false },
    { icon: <FaCanadianMapleLeaf size={144} color='blue' />, matched: false },
    { icon: <FaDiaspora size={144} color='blue' />, matched: false },
    { icon: <FaDelicious size={144} color='blue' />, matched: false },
    { icon: <FaDribbble size={144} color='blue' />, matched: false },
    { icon: <FaEnvira size={144} color='blue' />, matched: false },
    { icon: <FaConfluence size={144} color='blue' />, matched: false },
    { icon: <FaFontAwesomeFlag size={144} color='blue' />, matched: false },
  ]

  // Mezcla las cartas en el juego de memoria
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  // Maneja la elección de una carta en el juego de memoria
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reinicia las elecciones y aumenta el contador de turnos en el juego de memoria
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <>

      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route
            path='colores'
            element={
              <JuegoColores
                gameOver={gameOver}
                setLevel={setLevel}
                generateColors={generateColors}
                setGameOver={setGameOver}
                setLevelCounter={setLevelCounter}
                level={level}
                juegoColores={juegoColores}
                levelCounter={levelCounter}
                win={win}
                setWin={setWin}
              />
            }
          />
          <Route
            path='preguntas'
            element={
              <JuegoPreguntas
                gameOverQ={gameOverQ}
                reiniciarJuego={reiniciarJuego}
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                juegoPreguntas={juegoPreguntas}
                levelCounterQ={levelCounterQ}
                winQ={winQ}
                shuffledAnswers={shuffledAnswers}
              />
            }
          />
          <Route path='memoria' element={<JuegoMemoria
            shuffleCards={shuffleCards}
            cards={cards}
            handleChoice={handleChoice}
            choiceOne={choiceOne}
            choiceTwo={choiceTwo}
            disabled={disabled}
            turns={turns}
          />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
