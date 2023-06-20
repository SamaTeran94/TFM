/* eslint-disable react/prop-types */

import { useState, useEffect, createContext } from "react"

export const ColoresContext = createContext(null)

const ColoresContextProvider = ({ children }) => {

    const [level, setLevel] = useState(generateColors(1)); // Almacena el nivel actual del juego de colores
    const [gameOver, setGameOver] = useState(false); // Indica si el juego de colores ha terminado
    const [win, setWin] = useState(false); // Indica si el juego de colores ha sido ganado
    const [levelCounter, setLevelCounter] = useState(1); // Contador para el nivel actual del juego de colores
    const [timer, setTimer] = useState(20);
    const [gameStarted, setGameStarted] = useState(false);

    //Timer Juego Colores

    useEffect(() => {
        if (gameOver) {
            setGameStarted(false); // Stop the game when gameOver is true
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
                return 20; // Default initial value
        }
    };

    useEffect(() => {
        setTimer(getInitialTimerValue(levelCounter));
    }, [levelCounter]);

    // Comprueba si se ha alcanzado el nivel máximo en el juego de colores
    useEffect(() => {
        if (levelCounter === 20) {
            setWin(true);
        }
    }, [levelCounter]);

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
        let variationAmount = 50;


        // Ajustar la variación del color según el nivel actual
        if (levelCounter > 5 && levelCounter <= 10) {
            variationAmount = 35; // Mayor variación en niveles 6-10
        } else if (levelCounter > 10 && levelCounter <= 15) {
            variationAmount = 25; // Mayor variación en niveles 11-15
        } else if (levelCounter > 15) {
            variationAmount = 15; // Mayor variación en niveles 16 en adelante
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

    const value = {
        level,
        setLevel,
        gameOver,
        setGameOver,
        win,
        setWin,
        levelCounter,
        setLevelCounter,
        timer,
        setTimer,
        gameStarted,
        setGameStarted
    }

    return (
        <ColoresContext.Provider value={{ ...value, juegoColores, generateColors }}>{children}</ColoresContext.Provider>
    )
}

export default ColoresContextProvider
