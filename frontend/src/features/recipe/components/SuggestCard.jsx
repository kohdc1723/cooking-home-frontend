import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import "../../../styles/css/suggest-card.css";

const SuggestCard = ({ recipe }) => {
    const {
        id,
        image,
        label,
        source,
        url
    } = recipe;

    return (
        <div className="suggest-card" key={id}>
            <img src={image} alt="food-image" />
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