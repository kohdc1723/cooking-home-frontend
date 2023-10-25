import { AccountSetting } from "./";
import { PreferenceSetting } from "../../preference/components";

const Profile = () => {
    return (
        <section className="profile">
            <AccountSetting />
            <PreferenceSetting />
        </section>
    );
};

export default Profile;