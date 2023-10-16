import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../users/usersApiSlice";
import useAuth from "../../../hooks/useAuth";
import { UserInfo } from "./";

const Profile = () => {
    const { id } = useAuth();

    const {
        data: user,
        isLoading: isUserLoading,
        isSuccess: isUserSuccess,
        isError: isUserError,
        error: userError
    } = useGetUserQuery(id);

    if (isUserSuccess) {
        return (
            <section className="profile">
                <UserInfo user={user.user} />
                <div>
                    <h2>Preferences</h2>
                </div>
            </section>
        );
    } else if (isUserLoading) {
        return <p>Loading...</p>;
    }
};

export default Profile;