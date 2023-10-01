import { Routes, Route } from "react-router-dom";
import { Layout, Landing } from "./components";
import { Login, Register } from "./features/auth/components";

const App = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
            </Route>
        </Routes>
    );
};

export default App;
