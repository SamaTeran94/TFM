import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import JuegoColores from './components/JuegoColores';
import JuegoPreguntas from './components/JuegoPreguntas';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';

function App() {
  const [level, setLevel] = useState(generateColors(1));
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [levelCounter, setLevelCounter] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [levelCounterQ, setLevelCounterQ] = useState(1);
  const [gameOverQ, setGameOverQ] = useState(false);
  const [winQ, setWinQ] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

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

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [currentQuestion.respuestaCorrecta, ...currentQuestion.respuestasIncorrectas];
      const shuffledArray = shuffleArray(answers);
      setShuffledAnswers(shuffledArray);
    }
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (levelCounter === 20) {
      setWin(true);
    }
  }, [levelCounter]);

  useEffect(() => {
    if (levelCounterQ === 20) {
      setWinQ(true);
    }
  }, [levelCounterQ]);

  const juegoColores = (mem) => {
    if (mem.id <= 8) {
      console.log('Perdiste el juego');
      setGameOver(true);
    } else {
      setLevel([]);
      setLevelCounter((prevLevelCounter) => prevLevelCounter + 1);
      setTimeout(() => {
        setLevel(generateColors(levelCounter + 1));
      }, 2000);
    }
  };

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

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const reiniciarJuego = () => {
    setGameOverQ(false);
    setLevelCounterQ(1);
    setCurrentQuestionIndex(0);
    setWinQ(false);
    const shuffledQuestions = shuffleArray(questions);
    setQuestions(shuffledQuestions);
  };

  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}>
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
        </Route>
      </Routes>

    </>
  );
}

export default App;
