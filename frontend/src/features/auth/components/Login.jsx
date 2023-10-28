import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdFoodBank } from "react-icons/md";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";
import useLocalStorage from "../../../hooks/useLocalStorage";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useLocalStorage("username", "");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [persist, setPersist] = useLocalStorage("persist", false);

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleClickHome = () => navigate("/");
    const handleChangeUsername = e => setUsername(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);
    const handleChangePersist = () => setPersist(prev => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername("");
            setPassword("");

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.status) {
                setErrMsg("No server response");
            } else if (err.status === 400) {
                setErrMsg("Username and password are required");
            } else if (err.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg(err.data?.message);
            }

            errorRef.current.focus();
        }
    };

    return (
        <main className="login">
            <div className="login__container">
                <h1 onClick={handleClickHome}><MdFoodBank /> COOKING HOME</h1>
                <h2>Login</h2>
                <p
                    ref={errorRef}
                    aria-live="assertive"
                    className={errMsg ? "login__errmsg" : "off-screen"}
                >
                    {errMsg}
                </p>
                <form
                    className="login__form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        id="username"
                        ref={usernameRef}
                        autoComplete="off"
                        required
                        value={username}
                        onChange={handleChangeUsername}
                        placeholder="Username"
                        className="login__input"
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleChangePassword}
                        placeholder="Password"
                        className="login__input"
                    />
                    <button>Login</button>
                    <div className="login__persist">
                        <label htmlFor="persist">Trust this device?</label>
                        <input
                            type="checkbox"
                            id="persist"
                            checked={persist}
                            onChange={handleChangePersist}
                        />
                    </div>
                </form>
                <p>
                    Need an account?
                    <Link to="/register"> Register here</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;