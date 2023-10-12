import { Routes, Route } from "react-router-dom";
import { Layout, Welcome } from "./components";
import { Login, RequireAuth, PersistLogin } from "./features/auth/components";
import { RecipeFinder, RecipeSuggest } from "./features/recipe/components";
import { Register, Profile } from "./features/users/components";

const App = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="recipes" element={<RecipeFinder />} />

            <Route element={<Layout />}>
                <Route index element={<Welcome />} />

                {/* protected routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path="suggest" element={<RecipeSuggest />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
