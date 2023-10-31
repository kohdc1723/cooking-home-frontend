import { AccountSetting } from "./";
import { PreferenceSetting } from "../../preference/components";
import { useDeleteUserMutation } from "../usersApiSlice";
import { useSignoutMutation } from "../../auth/authApiSlice";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/css/profile.css";


const Profile = () => {
    const navigate = useNavigate();
    const { id } = useAuth();

    const [deleteUser, { isSuccess }] = useDeleteUserMutation();
    const [logout] = useSignoutMutation();

    useEffect(() => {
        if (isSuccess) {
            logout();
            navigate("/");
        }
    }, [isSuccess]);

    const onClickDelete = async () => {
        await deleteUser(id);
    };

    return (
        <section className="profile">
            <AccountSetting />
            <PreferenceSetting />
            <button
                className="profile__delete"
                onClick={onClickDelete}
            >
                Delete Account
            </button>
        </section>
    );
};

export default Profile;