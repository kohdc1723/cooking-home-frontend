import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useLocalStorage("username", "");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [persist, setPersist] = useLocalStorage("persist", false);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleClickHome = e => navigate("/");
    const handleChangeUsername = e => setUsername(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);
    const handleChangePersist = e => setPersist(prev => !prev);

    return (
        <main className="login">
            <div className="login__container">
                <h1 onClick={handleClickHome}>COOKING HOME</h1>
                <h2>Login</h2>
                <p
                    ref={errorRef}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <form className="login__form">
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