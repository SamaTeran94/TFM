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
        turns
    } = useContext(memoriaContext)

    const cardsMatched = cards.every((card) => card.matched === true);

    return (
        <>
            <div className=" flex justify-center bg-slate-300 h-full lg:h-screen">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className=" flex flex-col items-center justify-center lg:flex-row lg:justify-between gap-5 w-full px-10 py-5">
                        <button className="text-3xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={shuffleCards}>New Game</button>
                        {cardsMatched ? (
                            <h1 className="text-3xl">Felicidades! Encontraste todas las cartas!, te tomo {turns} turnos</h1>
                        ) : (
                            <div className="flex flex-col items-center gap-5">
                                <h1 className="text-center bg-colorestxbg text-4xl border-2 p-2 border-black">Encuentra los pares</h1>
                            </div>
                        )}
                        <h1 className="text-center bg-colorestxbg text-4xl border-2 p-2 border-black">Turnos: {turns}</h1>
                    </div>
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
