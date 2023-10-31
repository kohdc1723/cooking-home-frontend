import { useCreatePreferenceMutation } from "../preferenceApiSlice";
import useAuth from "../../../hooks/useAuth";

const NewPreference = () => {
    const { id } = useAuth();

    const [createPreference] = useCreatePreferenceMutation();

    const onClickNewPreference = () => createPreference(id);

    return (
        <div className="preference-setting">
            <h2>Preference Setting</h2>
            <div className="preference-setting__initialize">
                <p>Preference is not found.</p>
                <button
                    className="preference-setting__initialize-button"
                    onClick={onClickNewPreference}
                >
                    Create new preference
                </button>
            </div>
        </div>
    );
};

export default NewPreference;