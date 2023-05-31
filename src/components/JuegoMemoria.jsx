/* eslint-disable react/prop-types */
import SingleCard from "./SingleCard";

const JuegoMemoria = ({ shuffleCards, cards, handleChoice, choiceOne, choiceTwo, disabled, turns }) => {
    const cardsMatched = cards.every((card) => card.matched === true);

    return (
        <>
            <div className="h-screen flex justify-center">
                <div className="w-3/4 flex flex-col items-center justify-center"> {/* Added flex and flex-col classes */}
                    <div className=" flex justify-between w-3/4">
                        <button onClick={shuffleCards}>New Game</button>
                        {cardsMatched ? (
                            <h1>Felicidades! Encontraste todas las cartas!, te tomo {turns} turnos</h1>
                        ) : (
                            ""
                        )}
                        <h1>Turnos: {turns}</h1>
                    </div>
                    <div className="mt-8"> {/* Added margin-top */}
                        <div className="grid grid-cols-4 gap-5 justify-items-center">
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
