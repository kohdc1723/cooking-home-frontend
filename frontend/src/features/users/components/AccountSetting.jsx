import useAuth from "../../../hooks/useAuth";
import { useGetUserQuery } from "../usersApiSlice";
import { AccountSettingForm } from "./";
import "../../../styles/css/account-setting.css";

const AccountSetting = () => {
    const { id } = useAuth();

    const {
        data: user,
        isLoading,
        isSuccess,
        isError
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
                <div className="account-setting__loading">
                    <p>Loading...</p>
                </div>
            </div>
        );
    } else if (isError) {
        return (
            <div className="account-setting">
                <h2>Account Setting</h2>
                <div className="account-setting__error">
                    <p>Ooops... Error occurred...</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="account-setting">
                <h2>Account Setting</h2>
                <div className="account-setting__error">
                    <p>Ooops... Failed to load...</p>
                </div>
            </div>
        );
    }
};

export default AccountSetting;