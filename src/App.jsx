import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import JuegoColores from './components/JuegoColores';
import JuegoPreguntas from './components/JuegoPreguntas';

function App() {
  const [level, setLevel] = useState(generateColors());
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [levelCounter, setLevelCounter] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [levelCounterQ, setLevelCounterQ] = useState(1);
  const [gameOverQ, setGameOverQ] = useState(false);
  const [winQ, setWinQ] = useState(false);

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
    if (levelCounter === 3) {
      setWin(true);
    }
  }, [levelCounter]);

  useEffect(() => {
    if (levelCounterQ === 3) {
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
        setLevel(generateColors());
      }, 2000);
    }
  };

  function generateColors() {
    const colors = [];
    const variation = 32;
    const baseR = Math.floor(Math.random() * 256);
    const baseG = Math.floor(Math.random() * 256);
    const baseB = Math.floor(Math.random() * 256);
    const baseColor = `rgb(${baseR}, ${baseG}, ${baseB})`;
    for (let i = 1; i <= 8; i++) {
      colors.push({ id: i, color: baseColor });
    }
    const modifiedR = baseR > 127 ? baseR - variation : baseR + variation;
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
      <JuegoPreguntas
        gameOverQ={gameOverQ}
        reiniciarJuego={reiniciarJuego}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        juegoPreguntas={juegoPreguntas}
        levelCounterQ={levelCounterQ}
        winQ={winQ}
      />
    </>
  );
}

export default App;
