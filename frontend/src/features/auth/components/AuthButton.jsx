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
        return <Link className="header__login-button" to="/login" state={{ from: location }}>Sign In</Link>;
    }
};

export default AuthButton;