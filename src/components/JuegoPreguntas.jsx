/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from 'firebase/firestore'
import Autenticacion from "./Autenticacion";
import { db, auth } from '../config/Firebase.jsx'
import { onAuthStateChanged } from 'firebase/auth';

import { useContext } from "react";
import { PreguntasContext } from "./PreguntasContextProvider";

const JuegoPreguntas = () => {
  const {
    gameOverQ,
    reiniciarJuego,
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    juegoPreguntas,
    levelCounterQ,
    winQ,
    shuffledAnswers,
    getQuestions,
    timerQ,
    gameStartedQ,
    disabledAnswers,
    setDisabledAnswers,
    setTimerQ,
    fiftyUsed,
    setFiftyUsed,
    timeUsed,
    setTimeUsed,
    skippedQuestions,
    setSkippedQuestions,
    skippedUsed,
    setSkippedUsed
  } = useContext(PreguntasContext);

  //Crear Preguntas
  const [newQuestion, setNewQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState('');

  const [questionError, setQuestionError] = useState(false);
  const [incorrectAnswersErrorNumber, setIncorrectAnswersErrorNumber] = useState(false);
  const [incorrectAnswersErrorCommas, setIncorrectAnswersErrorCommas] = useState(false);
  const [userError, setUserError] = useState(false);

  const questionsCollectionRef = collection(db, 'preguntas')
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      console.log(user)
    });

    // Clean up the observer on component unmount
    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    collectionLength()
  }, [])

  const collectionLength = async () => {
    // Get the documents in the collection
    const querySnapshot = await getDocs(questionsCollectionRef);

    // Get the length of the documents array
    const documentCount = querySnapshot.docs.length;

    console.log(documentCount);
  }

  // Handle form submission
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    // Validate the input fields
    if (newQuestion.trim() === '' || correctAnswer.trim() === '' || incorrectAnswers.trim() === '') {
      // Show an error message or perform any necessary actions
      return;
    }

    // Validate the number of incorrect answers
    const trimmedIncorrectAnswers = incorrectAnswers.trim();
    const incorrectAnswerList = trimmedIncorrectAnswers.split(',').map(answer => answer.trim());
    if (incorrectAnswerList.length !== 3) {
      setIncorrectAnswersErrorNumber(true);
      return;
    }

    // Validate the textarea commas
    if (!incorrectAnswers.includes(',')) {
      setIncorrectAnswersErrorCommas(true)
      return;
    }

    // Validate the length of newQuestion
    if (newQuestion.trim().length < 10) {
      setQuestionError(true);
      return;
    }

    // Check if user is authenticated
    const user = auth.currentUser;
    if (!user) {
      setUserError(true)
      return;
    }

    // Proceed with question creation logic
    try {
      await addDoc(questionsCollectionRef, {
        pregunta: newQuestion,
        respuestaCorrecta: correctAnswer,
        respuestasIncorrectas: incorrectAnswers.split(',').map(answer => answer.trim()),
        userID: user.uid // Add the user ID to the question document
      });

      // Clear input fields
      setNewQuestion('');
      setCorrectAnswer('');
      setIncorrectAnswers('');

      // Refresh the questions list
      await getQuestions();
      setUserError(false)
    } catch (error) {
      console.log(error);
    } finally {
      alert('Pregunta Creada Satisfactoriamente!');
    }
  };

  //COMODINES

  const disableTwoIncorrectAnswers = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const incorrectAnswers = currentQuestion.respuestasIncorrectas;

    // Shuffle the incorrect answers
    const shuffledIncorrectAnswers = incorrectAnswers.sort(() => Math.random() - 0.5);

    // Disable the first two shuffled incorrect answers
    const disabledAnswers = shuffledIncorrectAnswers.slice(0, 2);

    setDisabledAnswers(disabledAnswers);
  };

  const handleFiftyClick = () => {
    disableTwoIncorrectAnswers();
    setFiftyUsed(true);
  }


  const handleTimeClick = () => {
    addTime()
    setTimeUsed(true);
  }

  const addTime = () => {
    setTimerQ((prevTimer) => {
      return prevTimer += 10
    });
  }

  const handleSkip = () => {
    // Add the current question to the skippedQuestions array
    setSkippedQuestions([...skippedQuestions, currentQuestionIndex]);

    // Increment the currentQuestionIndex to move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const skipQuestion = () => {
    handleSkip()
    setTimerQ(20)
    setSkippedUsed(true)
  }


  return (
    <>
      <section className="flex flex-col items-center place-content-center content-center justify-evenly h-screen bg-slate-300 p-5">
        {!gameStartedQ ? <div className="flex w-full justify-center">
          <div>
            <div className="w-full">
              {gameOverQ || winQ ? null : <h1 className="text-center bg-colorestxbg text-3xl border-2 p-2 border-black mb-5">Selecciona La Respuesta Correcta</h1>}
            </div>
          </div>
        </div> : null}
        {gameStartedQ ? <div className="flex w-full justify-center">
          <div className="w-1/4">
          </div>
          <div className="w-3/4">
            {gameOverQ || winQ ? null : <h1 className="text-center bg-colorestxbg text-3xl border-2 p-2 border-black mb-5">Selecciona La Respuesta Correcta</h1>}
          </div>
        </div> : null}

        {!gameStartedQ ? <div className="flex w-full">
          <div className="w-full flex justify-center">
            {gameOverQ || winQ ? <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reiniciarJuego}>Reiniciar Juego</button> : null}
            {gameStartedQ || gameOverQ || winQ ? null : <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reiniciarJuego}>Comenzar El Juego</button>}
            {!gameStartedQ || gameOverQ || winQ ? null : (<h1 className="bg-colorestxbg text-3xl border-2 p-2 border-black">Tiempo Restante: {timerQ}</h1>)}
            {!gameStartedQ || gameOverQ || winQ ? null : <p className="bg-colorestxbg text-3xl border-2 p-2 border-black">Nivel: {levelCounterQ}</p>}
          </div>
        </div> : null}
        {gameStartedQ ? <div className="flex w-full">
          <div className="w-1/4">
          </div>
          <div className="w-3/4 flex justify-around mb-5">
            {gameOverQ || winQ ? <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reiniciarJuego}>Reiniciar Juego</button> : null}
            {gameStartedQ || gameOverQ || winQ ? null : <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reiniciarJuego}>Comenzar El Juego</button>}
            {!gameStartedQ || gameOverQ || winQ ? null : (<h1 className="bg-colorestxbg text-3xl border-2 p-2 border-black">Tiempo Restante: {timerQ}</h1>)}
            {!gameStartedQ || gameOverQ || winQ ? null : <p className="bg-colorestxbg text-3xl border-2 p-2 border-black">Nivel: {levelCounterQ}</p>}
          </div>
        </div> : null}
        {gameOverQ && timerQ !== 0 ? <div className="flex flex-col">
          <h1 className="text-center bg-colorestxbg text-3xl border-2 p-2 border-black">Juego Finalizado, seleccionaste la respuesta incorrecta!</h1>
        </div> : gameOverQ && timerQ === 0 ? <div className="flex flex-col justify-center text-center">
          <h1 className="bg-colorestxbg text-3xl border-2 p-2 border-black">Juego Finalizado, se terminó el tiempo!</h1>
        </div> : null}
        {winQ ? <div className="flex flex-col">
          <h1 className="text-center bg-colorestxbg text-3xl">Felicitaciones, Ganaste El Juego!</h1>
        </div> : null}
        {questions.filter((question, index) => !skippedQuestions.includes(index)).slice(currentQuestionIndex, currentQuestionIndex + 1).map((question) => (
          !gameOverQ && !winQ && (
            <div key={question.id} className="flex flex-row gap-10 items-center justify-center w-full h-auto">
              {gameStartedQ ? <div className="w-1/4 flex flex-col justify-center gap-5">
                {!gameOverQ || !winQ ? <h1 className="text-center bg-colorestxbg text-3xl border-2 p-2 border-black">Comodines</h1> : null}
                {!gameOverQ || !winQ ? <button disabled={fiftyUsed || !gameStartedQ} className={`text-3xl border-2 border-black hover:font-bold ${fiftyUsed ? 'opacity-50 pointer-events-none' : ''}`} onClick={handleFiftyClick}>50/50</button> : null}
                {!gameOverQ || !winQ ? <button disabled={timeUsed || !gameStartedQ} className={`text-3xl border-2 border-black hover:font-bold ${timeUsed ? 'opacity-50 pointer-events-none' : ''}`} onClick={handleTimeClick}>Añadir Tiempo</button> : null}
                {!gameOverQ || !winQ ? <button disabled={skippedUsed || !gameStartedQ} className={`text-3xl border-2 border-black hover:font-bold ${skippedUsed ? 'opacity-50 pointer-events-none' : ''}`} onClick={skipQuestion}>Saltar Pregunta</button> : null}
              </div> : null}
              <div className="flex flex-col items-center justify-center w-3/4">
                {gameStartedQ ? (
                  <h1 className="bg-colorestxbg text-center text-3xl border-2 p-2 mb-10 border-black">{question.pregunta}</h1>
                ) : (
                  <h1 className="bg-colorestxbg text-3xl w-60 h-10 mb-10"></h1>
                )}
                {gameStartedQ ? (
                  <div className="grid grid-cols-2 gap-48 text-center text-3xl">
                    {shuffledAnswers.map((answer, index) => {
                      const isDisabled = disabledAnswers.includes(answer);
                      return (
                        <button
                          key={index}
                          className={`cursor-pointer text-center bg-slate-400 p-5 text-white ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                          onClick={() => juegoPreguntas(answer)}
                          disabled={isDisabled}
                        >
                          {answer}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-48 text-center text-3xl">
                    <h1 className="cursor-normal bg-colorestxbg w-40 h-20 p-5"></h1>
                    <h1 className="cursor-normal bg-colorestxbg w-40 h-20 p-5"></h1>
                    <h1 className="cursor-normal bg-colorestxbg w-40 h-20 p-5"></h1>
                    <h1 className="cursor-normal bg-colorestxbg w-40 h-20 p-5"></h1>
                  </div>
                )}
              </div>
            </div>
          )
        ))}
      </section>

      <section className="flex flex-col items-center place-content-center content-center justify-evenly h-screen">
        <div className=" flex flex-col gap-5 items-center bg-gray-200 w-1/2 py-10">
          <h1 className="text-2xl">Crea tus propias preguntas</h1>
          <Autenticacion />
        </div>
        <form onSubmit={handleSubmitQuestion} className="flex flex-col bg-gray-500 p-10 gap-5 h-fit w-1/2 ">
          <input
            required
            title="Question must have at least 10 characters"
            value={newQuestion}
            placeholder="Pregunta..."
            onChange={(e) => {
              setNewQuestion(e.target.value);
              setQuestionError(false); // Reset the error state when the input changes
            }}
            className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${questionError ? 'border-red-500' : ''}`}
          />
          {questionError && <label className="text-red-500">La pregunta debe tener por lo menos 10 caracteres</label>}
          <input required value={correctAnswer} placeholder="Respuesta Correcta..." onChange={(e) => setCorrectAnswer(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input required value={incorrectAnswers} placeholder="Respuestas Incorrectas separadas por comas..." onChange={(e) => {
            setIncorrectAnswers(e.target.value);
            setIncorrectAnswersErrorNumber(false); // Reset the error state when the input changes
            setIncorrectAnswersErrorCommas(false); // Reset the error state when the input changes
          }} className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${incorrectAnswersErrorNumber || incorrectAnswersErrorCommas ? 'border-red-500' : ''}`} />
          {incorrectAnswersErrorNumber && <label className="text-red-500">Debe haber exactamente 3 respuestas incorrectas separadas por comas</label>}
          {incorrectAnswersErrorCommas && <label className="text-red-500">Las respuestas incorrectas deben estar separadas por comas</label>}
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md">Crear Pregunta</button>
          {userError && !user ? <label className="text-red-500">Debes iniciar sesión para crear preguntas</label> : ''}
        </form>
      </section>
    </>
  );
};

export default JuegoPreguntas;
