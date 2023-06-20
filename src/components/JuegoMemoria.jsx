/* eslint-disable react/prop-types */
import { useContext } from "react";
import SingleCard from "./SingleCard";
import { memoriaContext } from "./MemoriaContextProvider";

const JuegoMemoria = () => {
    const {
        shuffleCards,
        cards,
        handleChoice,
        choiceOne,
        choiceTwo,
        disabled,
        turns,
        gameStarted
    } = useContext(memoriaContext)

    const cardsMatched = cards.every((card) => card.matched === true);

    return (
        <>
            <div className=" flex justify-center flex-col bg-slate-300 h-screen">
                <div className="flex flex-col w-full items-center">
                    <h1 className="text-center bg-colorestxbg text-4xl border-2 p-2 border-black">Encuentra los pares</h1>
                </div>
                <div className=" flex flex-row justify-center gap-5 w-full bg-blue-200 ">
                    {cardsMatched ? <h1 className="text-3xl">Felicidades! Encontraste todas las cartas!, te tomo {turns} turnos</h1> : null}
                    {gameStarted ? null : <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={shuffleCards}>Empezar Juego</button>}
                    {gameStarted ? <h1 className="text-center bg-colorestxbg text-4xl border-2 p-2 border-black">Turnos: {turns}</h1> : null}
                </div>
                <div className="w-full flex flex-col items-center justify-center bg-red-200">
                    <div className="w-full lg:w-2/4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 justify-items-center">
                            {cards.map((card) => (
                                <SingleCard
                                    key={card.id}
                                    card={card}
                                    handleChoice={handleChoice}
                                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                                    disabled={disabled}
                                    turns={turns}
                                    gameStarted={gameStarted}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JuegoMemoria;
