/* eslint-disable react/prop-types */
import SingleCard from "./SingleCard";

const JuegoMemoria = ({ shuffleCards, cards, handleChoice, choiceOne, choiceTwo, disabled, turns }) => {
    const cardsMatched = cards.every((card) => card.matched === true);

    return (
        <>
            <div className=" flex justify-center bg-red-200 pb-5">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className=" flex flex-col items-center justify-center lg:flex-row lg:justify-between w-full px-10 py-5">
                        <button className="text-3xl" onClick={shuffleCards}>New Game</button>
                        {cardsMatched ? (
                            <h1 className="text-3xl">Felicidades! Encontraste todas las cartas!, te tomo {turns} turnos</h1>
                        ) : (
                            <div className="flex flex-col items-center gap-5">
                                <h1 className="text-3xl">Juego de Memoria</h1>
                                <h1 className="text-3xl">Encuentra los pares</h1>
                            </div>
                        )}
                        <h1 className="text-3xl">Turnos: {turns}</h1>
                    </div>
                    <div className="pt-8">
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
