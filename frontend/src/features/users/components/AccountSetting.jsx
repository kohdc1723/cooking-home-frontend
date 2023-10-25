import useAuth from "../../../hooks/useAuth";
import { useGetUserQuery } from "../usersApiSlice";
import { AccountSettingForm } from "./";

const AccountSetting = () => {
    const { id } = useAuth();

    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery(id);

    if (isSuccess) {
        const { entities, ids } = user;
        const currentUser = entities[ids[0]];

        return (
            <div className="account-setting">
                <h2>Account Setting</h2>
                <AccountSettingForm user={currentUser} />
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="account-setting">
                <h2>Account Setting</h2>
                <div className="account-setting__loading">Account setting is loading...</div>
            </div>
        );
    } else if (isError) {
        return (
            <div className="account-setting">
                <h2>Account Setting</h2>
                <div className="account-setting__error">Error</div>
            </div>
        );
    } else {
        return (
            <div className="account-setting">
                <h2>Account Setting</h2>
                <div className="account-setting__error">Failed to load account setting</div>
            </div>
        );
    }
};

export default AccountSetting;