/* eslint-disable react/prop-types */
const SingleCard = ({ card, handleChoice, flipped, disabled }) => {


    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="relative">
            <div>
                <div
                    className="absolute block w-full rounded-md bg-white border-2 border-black"
                    style={{
                        transform: `rotateY(${flipped ? '0deg' : '90deg'})`,
                        transitionDelay: `(${flipped ? '0.2s' : ''})`,
                        backfaceVisibility: 'hidden',
                        transition: 'all ease-in 0.6s',
                    }}
                >
                    {card.icon}
                </div>
                <div
                    className="block w-32 h-32 rounded-md border-2 border-white bg-black" onClick={handleClick}
                    style={{
                        transform: `rotateY(${flipped ? '90deg' : '0deg'})`,
                        transitionDelay: `(${flipped ? '0s' : '0.2s'})`,
                        transition: 'all ease-in 0.2s'
                    }}></div>
            </div>
        </div>
    );
};

export default SingleCard;
