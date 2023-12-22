import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";

const SuggestCard = ({ recipe }) => {
    const { id, image, label, source, url } = recipe;

    return (
        <div className="border-2 border-red-100 flex flex-col gap-5 bg-red-50 p-3 rounded-lg text-sm" key={id}>
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48">
                <img src={image} alt="food-image" className="object-cover w-full h-full rounded-lg shadow-lg" />
            </div>
            <div className="flex flex-col gap-5 flex-1 justify-between items-center">
                <h4 className="break-words text-center font-bold">{label}</h4>
                <Link to={url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center text-red-500 hover:text-red-700 font-bold break-all text-sm text-center">
                    {source}
                    <AiOutlineLink />
                </Link>
            </div>
        </div>
    );
};

export default SuggestCard;