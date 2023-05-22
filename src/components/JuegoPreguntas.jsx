/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const JuegoPreguntas = ({
  gameOverQ,
  reiniciarJuego,
  questions,
  currentQuestionIndex,
  juegoPreguntas,
  levelCounterQ,
  winQ
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [currentQuestion.respuestaCorrecta, ...currentQuestion.respuestasIncorrectas];
      const shuffledArray = shuffleArray(answers);
      setShuffledAnswers(shuffledArray);
    }
  }, [questions, currentQuestionIndex]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div className="flex flex-col items-center mt-10 h-screen sticky" id="preguntas_id">
      <h1 className="mb-5 text-center">JUEGO DE PREGUNTAS</h1>
      <h1 className="text-center">SELECCIONA LA RESPUESTA CORRECTA</h1>
      {gameOverQ ? (
        <div className="flex flex-col justify-around items-center mt-10 w-full">
          <h1 className="text-center">Juego Finalizado</h1>
          <button onClick={reiniciarJuego}>Reiniciar Juego</button>
        </div>
      ) : winQ ? (
        <div className="flex flex-col justify-around items-center mt-10 w-full">
          <h1 className="text-center">Felicitaciones</h1>
          <button onClick={reiniciarJuego}>Jugar nuevamente</button>
        </div>
      ) : (
        questions.slice(currentQuestionIndex, currentQuestionIndex + 1).map((question) => (
          <div key={question.id} className="flex flex-col justify-around items-center mt-10 w-full h-screen">
            <h1>{question.pregunta}</h1>
            <div className="grid grid-cols-2 gap-48 text-center">
              {shuffledAnswers.map((answer, index) => (
                <h1
                  key={index}
                  className="cursor-pointer"
                  onClick={() => juegoPreguntas(answer)}
                >
                  {answer}
                </h1>
              ))}
            </div>
          </div>
        ))
      )}
      <div className="flex justify-center">
        <p className="text-lg">Nivel: {levelCounterQ}</p>
      </div>
    </div>
  );
};

export default JuegoPreguntas;
