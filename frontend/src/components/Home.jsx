import { useState } from "react";
import { Welcome } from "./";
import { RecipeSuggest } from "../features/recipe/components";

const Home = () => {
    return (
        <div className="home">
            <section>
                Trending Recipes
            </section>
            <section>
                Suggest by Ingredients
                <RecipeSuggest />
            </section>
        </div>
    );
};

export default Home;