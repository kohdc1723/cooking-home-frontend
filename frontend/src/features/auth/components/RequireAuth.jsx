import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireAuth = () => {
    const location = useLocation();
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default RequireAuth;