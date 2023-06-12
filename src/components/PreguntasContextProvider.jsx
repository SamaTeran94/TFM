/* eslint-disable react/prop-types */

import { useState, useEffect, createContext } from "react";

//FIREBASE

import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/Firebase.jsx'

export const PreguntasContext = createContext(null)

const PreguntasContextProvider = ({ children }) => {

    // Juego Preguntas
    const [questions, setQuestions] = useState([]); // Almacena las preguntas del juego de preguntas
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Índice de la pregunta actual
    const [levelCounterQ, setLevelCounterQ] = useState(1); // Contador para el nivel actual del juego de preguntas
    const [gameOverQ, setGameOverQ] = useState(false); // Indica si el juego de preguntas ha terminado
    const [winQ, setWinQ] = useState(false); // Indica si el juego de preguntas ha sido ganado
    const [shuffledAnswers, setShuffledAnswers] = useState([]); // Almacena las respuestas mezcladas de la pregunta actual
    const [timerQ, setTimerQ] = useState(15);
    const [gameStartedQ, setGameStartedQ] = useState(false);

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

    //Timer Juego Preguntas

    useEffect(() => {
        if (gameOverQ) {
            setTimerQ(15); // Reset timer to initial value
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
            setTimerQ(15); // Reset timer to initial value
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

    // Comprueba si se ha alcanzado el nivel máximo en el juego de preguntas
    useEffect(() => {
        if (levelCounterQ === 20) {
            setWinQ(true);
        }
    }, [levelCounterQ]);

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
        setTimerQ(15)
        const shuffledQuestions = shuffleArray(questions);
        setQuestions(shuffledQuestions);
    };

    const value = {
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        levelCounterQ,
        setLevelCounterQ,
        gameOverQ,
        setGameOverQ,
        winQ,
        setWinQ,
        shuffledAnswers,
        setShuffledAnswers,
        timerQ,
        setTimerQ,
        gameStartedQ,
        setGameStartedQ
    }

    return (
        <PreguntasContext.Provider value={{ ...value, reiniciarJuego, juegoPreguntas }}>{children} </PreguntasContext.Provider>
    )
}

export default PreguntasContextProvider
