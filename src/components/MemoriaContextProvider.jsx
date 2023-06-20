/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react';
import { FaBlackTie, FaCanadianMapleLeaf, FaDiaspora, FaDelicious, FaDribbble, FaEnvira, FaConfluence, FaFontAwesomeFlag } from 'react-icons/fa';

export const memoriaContext = createContext(null)

const MemoriaContextProvider = ({ children }) => {

    const [cards, setCards] = useState([]); // Almacena las cartas del juego de memoria
    const [turns, setTurns] = useState(0); // Contador de los turnos en el juego de memoria
    const [choiceOne, setChoiceOne] = useState(null); // Primera carta seleccionada en el juego de memoria
    const [choiceTwo, setChoiceTwo] = useState(null); // Segunda carta seleccionada en el juego de memoria
    const [disabled, setDisabled] = useState(null); // Indica si las cartas están deshabilitadas temporalment
    const [gameStarted, setGameStarted] = useState(false)

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
        setGameStarted(false)
    }, []);

    // Mezcla las cartas en el juego de memoria
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffleCards);
        setTurns(0);
        setGameStarted(true)
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

    const value = {
        cards,
        setCards,
        turns,
        setTurns,
        choiceOne,
        setChoiceOne,
        choiceTwo,
        setChoiceTwo,
        disabled,
        setDisabled,
        gameStarted
    }

    return (
        <memoriaContext.Provider value={{ ...value, handleChoice, shuffleCards }}>{children}</memoriaContext.Provider>
    )
}

export default MemoriaContextProvider
