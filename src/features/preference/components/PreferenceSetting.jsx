import { useGetPreferenceQuery } from "../preferenceApiSlice";
import useAuth from "../../../hooks/useAuth";
import { NewPreference, PreferenceSettingForm } from "./";
import "../../../styles/css/preference-setting.css";

const PreferenceSetting = () => {
    const { id } = useAuth();

    const {
        data: preference,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPreferenceQuery(id);

    if (isSuccess) {
        const { entities, ids } = preference;
        const currentPreference = entities[ids[0]];
        const favorites = currentPreference?.favorites;
        const ingredients = currentPreference?.ingredients;

        return <PreferenceSettingForm id={ids[0]} favorites={favorites} ingredients={ingredients} />;
    } else if (isLoading) {
        return (
            <div className="preference-setting">
                <h2>Preference Setting</h2>
                <div className="preference-setting__loading">Loading...</div>
            </div>
        );
    } else if (isError) {
        if (error?.status === 404) {
            return <NewPreference />;
        }

        return (
            <div className="preference-setting">
                <h2>Preference Setting</h2>
                <div className="preference-setting__error">Error</div>
            </div>
        );
    } else {
        return (
            <div className="preference-setting">
                <h2>Preference Setting</h2>
                <div className="preference-setting__error">Failed to load</div>
            </div>
        );
    }
};

export default PreferenceSetting;