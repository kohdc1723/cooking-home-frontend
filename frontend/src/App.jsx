import { Routes, Route } from "react-router-dom";
import { Layout, Welcome } from "./components";
import { Login, Register } from "./features/auth/components";
import { RecipeDetail, RecipeFinder, RecipeSearch } from "./features/recipe/components";

const App = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* recipes routes */}
            <Route path="recipes">
                <Route index element={<RecipeFinder />} />
            </Route>

            <Route path="/" element={<Layout />}>
                {/* landing page */}
                <Route index element={<Welcome />} />
            </Route>
        </Routes>
    );
};

export default App;
