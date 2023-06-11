import { useState, useEffect } from 'react';
import './App.css';
import { FaBlackTie, FaCanadianMapleLeaf, FaDiaspora, FaDelicious, FaDribbble, FaEnvira, FaConfluence, FaFontAwesomeFlag } from 'react-icons/fa';
import JuegoColores from './components/JuegoColores';
import JuegoPreguntas from './components/JuegoPreguntas';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import JuegoMemoria from './components/JuegoMemoria';
import Navbar from './components/Navbar';

//FIREBASE

import { getDocs, collection } from 'firebase/firestore'
import { db } from './config/Firebase.jsx'

function App() {
  // Juego Colores
  const [level, setLevel] = useState(generateColors(1)); // Almacena el nivel actual del juego de colores
  const [gameOver, setGameOver] = useState(false); // Indica si el juego de colores ha terminado
  const [win, setWin] = useState(false); // Indica si el juego de colores ha sido ganado
  const [levelCounter, setLevelCounter] = useState(1); // Contador para el nivel actual del juego de colores
  const [timer, setTimer] = useState(25);
  const [gameStarted, setGameStarted] = useState(false);

  // Juego Preguntas
  const [questions, setQuestions] = useState([]); // Almacena las preguntas del juego de preguntas
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Índice de la pregunta actual
  const [levelCounterQ, setLevelCounterQ] = useState(1); // Contador para el nivel actual del juego de preguntas
  const [gameOverQ, setGameOverQ] = useState(false); // Indica si el juego de preguntas ha terminado
  const [winQ, setWinQ] = useState(false); // Indica si el juego de preguntas ha sido ganado
  const [shuffledAnswers, setShuffledAnswers] = useState([]); // Almacena las respuestas mezcladas de la pregunta actual
  const [timerQ, setTimerQ] = useState(25);
  const [gameStartedQ, setGameStartedQ] = useState(false);

  // Juego Memoria
  const [cards, setCards] = useState([]); // Almacena las cartas del juego de memoria
  const [turns, setTurns] = useState(0); // Contador de los turnos en el juego de memoria
  const [choiceOne, setChoiceOne] = useState(null); // Primera carta seleccionada en el juego de memoria
  const [choiceTwo, setChoiceTwo] = useState(null); // Segunda carta seleccionada en el juego de memoria
  const [disabled, setDisabled] = useState(null); // Indica si las cartas están deshabilitadas temporalment

  // Carga de preguntas desde FireBase

  //Referencia a la Base de Datos
  const questionsCollectionRef = collection(db, 'preguntas')

  const getQuestions = async () => {
    try {
      const data = await getDocs(questionsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      const shuffledQuestions = shuffleArray(filteredData);
      setQuestions(shuffledQuestions);
      console.log(questions)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  //Timer Juego Colores

  useEffect(() => {
    if (gameOver) {
      setTimer(25); // Reset timer to initial value
    } else if (gameStarted) { // Add gameStarted condition
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setGameOver(true); // Set game over when timer reaches 0
          }
          return prevTimer > 0 ? prevTimer - 1 : prevTimer;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameOver, gameStarted]); // Include gameStarted in the dependency array

  const getInitialTimerValue = (level) => {
    switch (true) {
      case level > 5 && level <= 10:
        return 20;
      case level > 10 && level <= 15:
        return 15;
      case level > 15:
        return 10;
      default:
        return 25; // Default initial value
    }
  };

  useEffect(() => {
    setTimer(getInitialTimerValue(levelCounter));
  }, [levelCounter]);

  //Timer Juego Preguntas

  useEffect(() => {
    if (gameOverQ) {
      setTimerQ(25); // Reset timer to initial value
    } else if (gameStartedQ) { // Add gameStarted condition
      const interval = setInterval(() => {
        setTimerQ((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setGameOverQ(true); // Set game over when timer reaches 0
          }
          return prevTimer > 0 ? prevTimer - 1 : prevTimer;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameOverQ, gameStartedQ]); // Include gameStarted in the dependency array  

  useEffect(() => {
    if (levelCounterQ !== 1) {
      setTimerQ(25); // Reset timer to initial value
    }
  }, [levelCounterQ]);

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
    if (levelCounterQ === 20) {
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
      setTimer(getInitialTimerValue(levelCounter + 1)); // Set initial timer value based on level
    }
  };

  // Genera los colores para el juego de colores en función del nivel
  function generateColors(levelCounter) {
    const colors = [];
    let variationAmount = 60;


    // Ajustar la variación del color según el nivel actual
    if (levelCounter > 5 && levelCounter <= 10) {
      variationAmount = 40; // Mayor variación en niveles 6-10
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
    setGameStartedQ(true)
    setTimerQ(25)
    const shuffledQuestions = shuffleArray(questions);
    setQuestions(shuffledQuestions);
  };

  // JUEGO MEMORIA

  const cardImages = [
    { icon: <FaBlackTie size={128} color='blue' />, matched: false },
    { icon: <FaCanadianMapleLeaf size={128} color='blue' />, matched: false },
    { icon: <FaDiaspora size={128} color='blue' />, matched: false },
    { icon: <FaDelicious size={128} color='blue' />, matched: false },
    { icon: <FaDribbble size={128} color='blue' />, matched: false },
    { icon: <FaEnvira size={128} color='blue' />, matched: false },
    { icon: <FaConfluence size={128} color='blue' />, matched: false },
    { icon: <FaFontAwesomeFlag size={128} color='blue' />, matched: false },
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
                timer={timer}
                setTimer={setTimer}
                gameStarted={gameStarted}
                setGameStarted={setGameStarted}
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
                getQuestions={getQuestions}
                timerQ={timerQ}
                setTimerQ={setTimerQ}
                gameStartedQ={gameStartedQ}
                setGameStartedQ={setGameStartedQ}
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
