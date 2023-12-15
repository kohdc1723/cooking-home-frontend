import { useCreatePreferenceMutation } from "../preferenceApiSlice";
import useAuth from "../../../hooks/useAuth";

const NewPreference = () => {
    const { id } = useAuth();

    const [createPreference] = useCreatePreferenceMutation();

    const onClickNewPreference = () => createPreference(id);

    return (
        <div className="flex flex-col gap-10 py-10">
            <h2 className="text-red-500 text-xl md:text-2xl lg:text-3xl font-black">Preference Setting</h2>
            <div className="bg-red-100 p-5 rounded-lg flex flex-col gap-5 justify-center items-center">
                <p className="font-bold">Preference does not exist.</p>
                <button
                    className="px-3 py-1 text-slate-50 bg-red-500 hover:bg-red-700 rounded-lg"
                    onClick={onClickNewPreference}
                >
                    Create new preference
                </button>
            </div>
        </div>
    );
};

export default NewPreference;