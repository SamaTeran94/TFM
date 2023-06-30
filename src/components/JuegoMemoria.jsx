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
            <div className=" flex justify-center flex-col py-10 sm:py-0 bg-slate-300 h-screen gap-5">
                {cardsMatched ? null : <div className="flex flex-col w-full items-center">
                    <h1 className="text-center bg-colorestxbg text-3xl border-2 p-2 mt-0 sm:mt-10 border-black">Encuentra los pares</h1>
                </div>}
                <div className=" flex flex-row justify-center gap-5 w-full ">
                    {cardsMatched ? <h1 className="text-center bg-colorestxbg text-3xl border-2 p-2 border-black">Encontrar todos los pares te tomo {turns} turnos</h1> : null}
                    {gameStarted ? null : <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={shuffleCards}>Comenzar el Juego</button>}
                    {cardsMatched ? <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={shuffleCards}>Reiniciar Juego</button> : null}
                    {cardsMatched ? null : (gameStarted && <h1 className="text-center bg-colorestxbg text-3xl border-2 p-2 border-black">Turnos: {turns}</h1>)}
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full md:w-3/4">
                        <div className="grid grid-cols-4 gap-5 justify-items-center">
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
