import { useEffect, useState } from "react";

const USERNAME_REGEX = /^[A-z]{3,20}$/;
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const UserInfo = ({ user }) => {
    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);

    const [pwdChangeable, setPwdChangeable] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username]);

    const onChangeUsername = e => setUsername(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);

    return (
        <div>
            <h2>User Info</h2>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        autoComplete="off"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
            </form>
        </div>
    );
};

export default UserInfo;