import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdFoodBank } from "react-icons/md";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCreateUserMutation } from "../usersApiSlice";
import "../../../styles/css/register.css";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate();

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [createUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateUserMutation();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);

        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword]);

    useEffect(() => {
        if (isSuccess) {
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        }
    }, [isSuccess, navigate]);

    const handleClickHome = () => navigate("/");

    const handleChangeUsername = e => setUsername(e.target.value);
    const handleFocusUsername = () => setUsernameFocus(true);
    const handleBlurUsername = () => setUsernameFocus(false);

    const handleChangePassword = e => setPassword(e.target.value);
    const handleFocusPassword = () => setPasswordFocus(true);
    const handleBlurPassword = () => setPasswordFocus(false);

    const handleChangeConfirmPassword = e => setConfirmPassword(e.target.value);
    const handleFocusConfirmPassword = () => setConfirmPasswordFocus(true);
    const handleBlurConfirmPassword = () => setConfirmPasswordFocus(false);

    const isSubmittable = validUsername && validPassword && validConfirmPassword && !isLoading;
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmittable) {
            await createUser({ username, password });
        }
    };

    let registerInstruction = null;
    if (username && !validUsername) {
        registerInstruction = (
            <div
                id="username-note"
                className="register__instruction"
            >
                <p><FontAwesomeIcon icon={faInfoCircle} /> Invalid Username</p>
                <p><FontAwesomeIcon icon={faCheck} /> 4 to 24 characters.</p>
                <p><FontAwesomeIcon icon={faCheck} /> Must begin with a letter.</p>
                <p><FontAwesomeIcon icon={faCheck} /> Letters, numbers, underscores, hyphens allowed.</p>
            </div>
        );
    } else if (password && !validPassword) {
        registerInstruction = (
            <div
                id="password-note"
                className="register__instruction"
            >
                <p><FontAwesomeIcon icon={faInfoCircle} /> Invalid Password</p>
                <p><FontAwesomeIcon icon={faCheck} /> 8 to 24 characters.</p>
                <p><FontAwesomeIcon icon={faCheck} /> Must include uppercase and lowercase letters, a number and a special character.</p>
                <p>
                    <FontAwesomeIcon icon={faCheck} /> Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                </p>
            </div>
        );
    } else if (confirmPassword && !validConfirmPassword) {
        registerInstruction = (
            <div
                id="confirm-note"
                className="register__instruction"
            >
                <p><FontAwesomeIcon icon={faInfoCircle} /> Password not match</p>
                <p><FontAwesomeIcon icon={faCheck} /> Must match the first password input field.</p>
            </div>
        );
    } else {
        registerInstruction = (
            <div className="register__instruction">
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {" Please enter username and password to register."}
                </p>
            </div>
        );
    }

    return (
        <main className="register">
            <div className="register__container">
                <h1 onClick={handleClickHome}><MdFoodBank /> COOKING HOME</h1>
                <h2>Sign Up</h2>
                <p
                    ref={errorRef}
                    aria-live="assertive"
                    className={isError ? "register__errmsg" : "off-screen"}
                >
                    {error?.data?.message}
                </p>
                <p
                    className={isSuccess ? "register__sucmsg" : "off-screen"}
                >
                    Successfully registered
                </p>
                {registerInstruction}
                <form
                    className="register__form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        id="username"
                        ref={usernameRef}
                        autoComplete="off"
                        required
                        value={username}
                        aria-invalid={!validUsername}
                        aria-describedby="username-note"
                        onChange={handleChangeUsername}
                        onFocus={handleFocusUsername}
                        onBlur={handleBlurUsername}
                        placeholder="Username"
                        className={`register__input ${(!validUsername && username) && "register__input-invalid"}`}
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        aria-invalid={!validPassword}
                        aria-describedby="password-note"
                        onChange={handleChangePassword}
                        onFocus={handleFocusPassword}
                        onBlur={handleBlurPassword}
                        required
                        placeholder="Password"
                        className={`register__input ${(!validPassword && password) && "register__input-invalid"}`}
                    />
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        onFocus={handleFocusConfirmPassword}
                        onBlur={handleBlurConfirmPassword}
                        placeholder="Confirm Password"
                        className={`register__input ${(!validConfirmPassword && confirmPassword) && "register__input-invalid"}`}
                    />
                    <button
                        className="clickable-box"
                        disabled={!isSubmittable}
                    >
                        Sign Up
                    </button>
                </form>
                <p>
                    Already have an account?
                    <Link to="/login" className="clickable-text"> Login here</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;