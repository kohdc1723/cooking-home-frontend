import { AccountSetting } from "./";
import { PreferenceSetting } from "../../preference/components";
import { useDeleteUserMutation } from "../usersApiSlice";
import { useSignoutMutation } from "../../auth/authApiSlice";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <section className="pt-[72px] pb-10 px-5 sm:px-10 md:px-20 lg:px-32 flex flex-col">
            <AccountSetting />
            <PreferenceSetting />
            <button
                className="bg-red-700 text-slate-50 text-sm md:text-base px-4 py-2 rounded-lg w-fit self-end hover:bg-red-900"
                onClick={onClickDelete}
            >
                Delete Account
            </button>
        </section>
    );
};

export default Profile;