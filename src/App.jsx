import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import JuegoColores from './components/JuegoColores';

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
    if (levelCounter === 15) {
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
      setTimeout(() => {
        setLevel(generateColors());
        setLevelCounter((prevLevelCounter) => prevLevelCounter + 1);
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

  const reiniciarJuego = () => {
    setGameOverQ(false);
    setLevelCounterQ(1);
    setCurrentQuestionIndex(0);
    setWinQ(false);
  };

  // Función para mezclar aleatoriamente un arreglo
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-10">
        <h1 className="mb-5 text-center">JUEGO DE COLORES</h1>
        <h1 className="text-center">SELECCIONA EL COLOR DIFERENTE</h1>
      </div>
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
      <div className="flex flex-col items-center mt-10">
        <h1 className="mb-5 text-center">JUEGO DE PREGUNTAS</h1>
        <h1 className="text-center">SELECCIONA LA RESPUESTA CORRECTA</h1>
        {gameOverQ ? (
          <div className="flex flex-col justify-around items-center mt-10 w-full h-96">
            <h1 className="text-center">Juego Finalizado</h1>
            <button onClick={reiniciarJuego}>Reiniciar Juego</button>
          </div>
        ) : winQ ? (
          <div className="flex flex-col justify-around items-center mt-10 w-full h-96 ">
            <h1 className="text-center">Felicitaciones</h1>
            <button onClick={reiniciarJuego}>Jugar nuevamente</button>
          </div>
        ) : (
          questions.slice(currentQuestionIndex, currentQuestionIndex + 1).map((question) => (
            <div key={question.id} className="flex flex-col justify-around items-center mt-10 border w-full h-96">
              <h1>{question.pregunta}</h1>
              <div className="grid grid-cols-2 gap-48 text-center">
                <h1
                  className="cursor-pointer"
                  onClick={() => juegoPreguntas(question.respuestaCorrecta)}
                >
                  {question.respuestaCorrecta}
                </h1>
                <h1
                  className="cursor-pointer"
                  onClick={() => juegoPreguntas(question.respuestasIncorrectas[0])}
                >
                  {question.respuestasIncorrectas[0]}
                </h1>
                <h1
                  className="cursor-pointer"
                  onClick={() => juegoPreguntas(question.respuestasIncorrectas[1])}
                >
                  {question.respuestasIncorrectas[1]}
                </h1>
                <h1
                  className="cursor-pointer"
                  onClick={() => juegoPreguntas(question.respuestasIncorrectas[2])}
                >
                  {question.respuestasIncorrectas[2]}
                </h1>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center">
        <p className="text-lg">Nivel: {levelCounterQ}</p>
      </div>
    </>
  );
}

export default App;
