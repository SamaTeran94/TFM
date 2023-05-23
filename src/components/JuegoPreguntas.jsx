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
    <div className="flex flex-col items-center place-content-center content-center justify-evenly h-screen bg-preguntasbg" id="preguntas_id">
      <div className="flex flex-col">
        {gameOverQ || winQ ? null :<h1 className="mb-5 text-center bg-colorestxbg text-3xl">Juego De Preguntas</h1>}
        {gameOverQ || winQ ? null :<h1 className="text-center bg-colorestxbg text-3xl">Selecciona La Respuesta Correcta</h1>}
      </div>
      {gameOverQ ? (
        <div className="flex flex-col">
          <h1 className="text-center bg-colorestxbg text-3xl">Juego Finalizado</h1>
          <button className='mt-4 py-2 px-4 bg-blue-500 text-white text-3xl rounded-md' onClick={reiniciarJuego}>Reiniciar Juego</button>
        </div>
      ) : winQ ? (
        <div className="flex flex-col">
          <h1 className="text-center bg-colorestxbg text-3xl">Felicitaciones, Ganaste El Juego!</h1>
          <button className='mt-4 py-2 px-4 bg-blue-500 text-white text-3xl rounded-md' onClick={reiniciarJuego}>Jugar nuevamente</button>
        </div>
      ) : (
        questions.slice(currentQuestionIndex, currentQuestionIndex + 1).map((question) => (
          <div key={question.id} className="flex flex-col items-center justify-around h-3/5">
            <h1 className='bg-colorestxbg text-3xl'>{question.pregunta}</h1>
            <div className="grid grid-cols-2 gap-48 text-center text-3xl ">
              {shuffledAnswers.map((answer, index) => (
                <h1
                  key={index}
                  className="cursor-pointer bg-colorestxbg p-5"
                  onClick={() => juegoPreguntas(answer)}
                >
                  {answer}
                </h1>
              ))}
            </div>
          </div>
        ))
      )}
      <div className="flex justify-center bg-colorestxbg text-3xl">
        <p className="">Nivel: {levelCounterQ}</p>
      </div>
    </div>
  );
};

export default JuegoPreguntas;
