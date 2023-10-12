import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { DropdownButton } from "../../../components";
import { useSignoutMutation } from "../authApiSlice";

const AuthButton = () => {
    const { username, isAuth } = useAuth();

    const [logout] = useSignoutMutation();

    if (isAuth) {
        return (
            <DropdownButton title={username} logout={logout} />
        );
    } else {
        return <Link className="header__login-button" to="/login">Sign In</Link>;
    }
};

export default AuthButton;