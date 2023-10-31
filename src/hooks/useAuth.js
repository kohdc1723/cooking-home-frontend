import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    if (token) {
        const decoded = jwtDecode(token);
        const { username, id } = decoded;

        return {
            username,
            id,
            isAuth: true
        };
    } else {
        return {
            username: "",
            id: "",
            isAuth: false
        };
    }
};

export default useAuth;