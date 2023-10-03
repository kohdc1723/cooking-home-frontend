import { useParams } from "react-router-dom";

const RecipeDetail = () => {
    const { id } = useParams();

    return (
        <div>RecipeDetail - {id}</div>
    );
};

export default RecipeDetail;