/* eslint-disable react/prop-types */
const SingleCard = ({ card,
    handleChoice,
    flipped,
    disabled,
    gameStarted }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="relative">
            <div>
                <button
                    className="absolute block w-full rounded-md bg-white border-2 border-black"
                    style={{
                        transform: `rotateY(${flipped ? '0deg' : '90deg'})`,
                        transitionDelay: `(${flipped ? '0.2s' : ''})`,
                        backfaceVisibility: 'hidden',
                        transition: 'all ease-in 0.6s',
                    }}
                >
                    {card.icon}
                </button>
                <button
                    disabled={!gameStarted}
                    className={`${!gameStarted ? 'block h-16 w-16 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-md border-2 border-white cursor-default bg-black' :
                        'block w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-md border-2 border-white cursor-pointer bg-black'}`}
                    onClick={handleClick}
                    style={{
                        transform: `rotateY(${flipped ? '90deg' : '0deg'})`,
                        transitionDelay: `${flipped ? '0s' : '0.2s'}`,
                        transition: 'all ease-in 0.2s'
                    }}
                ></button>
            </div>
        </div>
    );
};

export default SingleCard;
