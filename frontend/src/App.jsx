import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, Welcome } from "./components";
import { Login, RequireAuth, PersistLogin } from "./features/auth/components";
import { RecipeFinder, RecipeSuggest } from "./features/recipe/components";
import { Register, Profile } from "./features/users/components";
import { init } from "./features/recipe/searchParamsSlice";

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    // if quit from recipe finder page, then initialize the search options states
    useEffect(() => {
        if (location.pathname !== "/recipes") {
            dispatch(init());
        }
    }, [location.pathname, dispatch]);

    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
            <Route element={<PersistLogin />}>
                <Route path="recipes" element={<RecipeFinder />} />
            </Route>

            <Route element={<Layout />}>
                {/* protected routes */}
                <Route element={<PersistLogin />}>
                    <Route index element={<Welcome />} />

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
