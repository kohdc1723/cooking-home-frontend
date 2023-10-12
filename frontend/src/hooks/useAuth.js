import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    if (token) {
        const decoded = jwtDecode(token);
        const { username } = decoded;

        return {
            username,
            isAuth: true
        };
    } else {
        return {
            username: "",
            isAuth: false
        };
    }
};

export default useAuth;