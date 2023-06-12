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
    juegoPreguntas,
    levelCounterQ,
    winQ,
    shuffledAnswers,
    getQuestions,
    timerQ,
    gameStartedQ,
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

  return (
    <>
      <section className="flex flex-col items-center place-content-center content-center justify-evenly h-screen bg-preguntasbg">
        <div className="flex flex-col">
          {gameOverQ || winQ ? null : <h1 className="mb-5 text-center bg-colorestxbg text-3xl">Juego De Preguntas</h1>}
          {gameOverQ || winQ ? null : <h1 className="text-center bg-colorestxbg text-3xl">Selecciona La Respuesta Correcta</h1>}
        </div>
        <div className="flex justify-around w-full">
          <button className="bg-colorestxbg text-3xl" onClick={reiniciarJuego}>Empezar Juego</button>
          {gameStartedQ && (<h1 className="bg-colorestxbg text-3xl">Tiempo Restante: {timerQ}</h1>)}
          <p className="bg-colorestxbg text-3xl">Nivel: {levelCounterQ}</p>
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
              {gameStartedQ ? <h1 className='bg-colorestxbg text-3xl'>{question.pregunta}</h1> : <h1 className='bg-colorestxbg text-3xl w-60 h-10'></h1>}
              {gameStartedQ ? <div className="grid grid-cols-2 gap-48 text-center text-3xl ">
                {shuffledAnswers.map((answer, index) => (
                  <h1
                    key={index}
                    className="cursor-pointer bg-colorestxbg p-5"
                    onClick={() => juegoPreguntas(answer)}
                  >
                    {answer}
                  </h1>
                ))}
              </div> : <div className="grid grid-cols-2 gap-48 text-center text-3xl ">
                <h1 className="cursor-normal bg-colorestxbg w-40 h-20 p-5"></h1>
                <h1 className="cursor-normal bg-colorestxbg w-40 h-20 p-5"></h1>
                <h1 className="cursor-normal bg-colorestxbg w-40 h-20 p-5"></h1>
                <h1 className="cursor-normal bg-colorestxbg w-40 h-20 p-5"></h1>
              </div>}
            </div>
          ))
        )}
      </section>

      <section className="flex flex-col items-center place-content-center content-center justify-evenly h-screen">
        <div className=" flex flex-col gap-5 items-center bg-gray-200 w-1/2 py-10">
          <h1 className="text-2xl">Crea tus propias preguntas</h1>
          <h1 className="text-2xl">Para crear tus propias preguntas necesitas iniciar sesion</h1>
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
          {userError && !user ? <label className="text-red-500">Debes iniciar sesión para crear preguntas</label> : ''}
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md">Crear Pregunta</button>
        </form>
      </section>
    </>
  );
};

export default JuegoPreguntas;
