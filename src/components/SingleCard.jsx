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
                    className="absolute block w-full rounded-md bg-white"
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
                    className="block w-36 h-36 rounded-md bg-black" onClick={handleClick}
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
