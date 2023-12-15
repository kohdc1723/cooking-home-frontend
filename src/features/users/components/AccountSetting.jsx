import { Oval } from "react-loader-spinner";
import useAuth from "../../../hooks/useAuth";
import { useGetUserQuery } from "../usersApiSlice";
import { AccountSettingForm } from "./";

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
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-red-500 text-xl md:text-2xl lg:text-3xl font-black">Account Setting</h2>
                <AccountSettingForm user={currentUser} />
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-red-500 text-xl md:text-2xl lg:text-3xl font-black">Account Setting</h2>
                <div className="p-20 flex justify-center items-center">
                    <Oval
                        height={60}
                        width={60}
                        visible={true}
                        color="#EF4444"
                        secondaryColor="#EF4444"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                </div>
            </div>
        );
    } else if (isError) {
        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-red-500 text-xl md:text-2xl lg:text-3xl font-black">Account Setting</h2>
                <div className="p-20 flex justify-center items-center">
                    <p className="text-red-700 font-bold">Ooops... Error occurred...</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-red-500 text-xl md:text-2xl lg:text-3xl font-black">Account Setting</h2>
                <div className="p-20 flex justify-center items-center">
                    <p className="text-red-700">Ooops... Failed to load...</p>
                </div>
            </div>
        );
    }
};

export default AccountSetting;