/* eslint-disable react/prop-types */

import { TfiEmail } from "react-icons/tfi";
import { IoSchoolOutline } from "react-icons/io5";

const Card = ({ title, description, image, email }) => {

    return (
        <div className="bg-white h-auto w-3/4 sm:w-auto sm:h-auto shadow-lg rounded-lg overflow-hidden">
            {image && (
                <img
                    src={image}
                    alt={title}
                    height='400'
                    width='400'
                    className="sm:w-96"
                />
            )}
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <div className="flex items-center">
                    <IoSchoolOutline style={{ fontSize: '20px' }} />
                    <p className="text-gray-700 mb-2 ml-2">{description}</p>
                </div>
                <div className="flex items-center">
                    <TfiEmail style={{ fontSize: '20px' }} />
                    <a href={`mailto:${email}`} className="ml-2">{email}</a>
                </div>
            </div>

        </div>
    );
};

export default Card;
