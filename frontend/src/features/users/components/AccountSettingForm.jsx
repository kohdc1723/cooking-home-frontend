import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useUpdateUserMutation } from "../usersApiSlice";
import { useSignoutMutation } from "../../auth/authApiSlice";

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const AccountSettingForm = ({ user }) => {
    const navigate = useNavigate();

    const usernameRef = useRef();

    const [isEditable, setIsEditable] = useState(false);

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(true);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const [logout] = useSignoutMutation();

    const [updateUser, {
        isLoading: isUpdateLoading,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateUserMutation();

    const [deleteUser, {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteUserMutation();

    useEffect(() => {
        usernameRef.current.focus();
    }, [isEditable]);

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isUpdateSuccess) {
            setPassword("");
            setIsEditable(false);
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        if (isDeleteSuccess) {
            setUsername("");
            setPassword("");

            logout();
            navigate("/");
        }
    }, [isDeleteSuccess, navigate]);

    const isValid = password
        ? (validUsername && validPassword && !isUpdateLoading)
        : (validUsername && !isUpdateLoading);

    const onChangeUsername = e => setUsername(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    const onClickEdit = e => {
        e.preventDefault();
        setIsEditable(true);
    };
    const onClickCancel = e => {
        e.preventDefault();
        setUsername(user.username);
        setPassword("");
        setIsEditable(false);
    };
    const onClickSave = async (e) => {
        e.preventDefault();
        if (password) {
            await updateUser({ id: user.id, username, password });
        } else {
            await updateUser({ id: user.id, username });
        }
    };

    return (
        <form>
            <p className={(isUpdateError || isDeleteError) ? "account-setting-form__errmsg" : "off-screen"}>
                {updateError?.data?.message}
            </p>
            <div className="account-setting__form-row">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={onChangeUsername}
                    disabled={!isEditable}
                    ref={usernameRef}
                />
            </div>
            <div className="account-setting__form-row">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Password [Empty = No change]"
                    disabled={!isEditable}
                />
            </div>
            {!isEditable ? (
                <div className="account-setting__button-container">
                    <button
                        className="account-setting__edit-button account-setting__button"
                        onClick={onClickEdit}
                    >
                        Edit
                    </button>
                </div>
            ) : (
                <div className="account-setting__button-container">
                    <button
                        className="account-setting__save-button account-setting__button"
                        onClick={onClickSave}
                        disabled={!isValid}
                    >
                        Save
                    </button>
                    <button
                        className="account-setting__cancel-button account-setting__button"
                        onClick={onClickCancel}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </form>
    );
};

export default AccountSettingForm;