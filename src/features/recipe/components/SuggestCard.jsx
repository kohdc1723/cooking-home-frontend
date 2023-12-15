import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";

const SuggestCard = ({ recipe }) => {
    const {
        id,
        image,
        label,
        source,
        url
    } = recipe;

    return (
        <div className="flex flex-col gap-5 w-full bg-red-100 p-3 rounded-lg" key={id}>
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48">
                <img src={image} alt="food-image" className="object-cover w-full h-full rounded-lg shadow-lg" />
            </div>
            <div className="suggest-card__desc">
                <h4 className="suggest-card__title">{label}</h4>
                <Link to={url} target="_blank" rel="noopener noreferrer">
                    {source}<AiOutlineLink />
                </Link>
            </div>
        </div>
    );
};

export default SuggestCard;