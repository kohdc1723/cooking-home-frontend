import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { DropdownButton } from "../../../components";
import { useSignoutMutation } from "../authApiSlice";

const AuthButton = () => {
    const location = useLocation();

    const { username, isAuth } = useAuth();

    const [logout] = useSignoutMutation();

    if (isAuth) {
        return (
            <DropdownButton title={username} logout={logout} />
        );
    } else {
        return (
            <Link className="rounded-lg border-2 border-red-500 text-red-500 px-3 py-1 hover:bg-red-100" to="/login" state={{ from: location }}>
                Sign In
            </Link>
        );
    }
};

export default AuthButton;