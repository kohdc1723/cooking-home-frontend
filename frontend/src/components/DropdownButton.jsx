import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSignoutMutation } from "../features/auth/authApiSlice";

const DropdownButton = ({ title, items }) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [logout, { isSuccess }] = useSignoutMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess, navigate]);

    const onClickButton = () => setOpen(!open);
    const onBlurButton = () => open && setOpen(false);
    const onClickSignOut = () => logout();
    const onClickProfile = () => navigate("/profile");

    return (
        <div
            className="dropdown-button"
            onClick={onClickButton}
            onBlur={onClickButton}
        >
            <div className="dropdown-button__header">
                <div className="dropdown-button__title">{title}</div>
                {!open ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div className={`${open ? "dropdown-button__list" : "off-screen"}`}>
                <div
                    className="dropdown-button__item"
                    onClick={onClickProfile}
                >
                    Profile
                </div>
                <div
                    className="dropdown-button__item"
                    onClick={onClickSignOut}
                >
                    Sign Out
                </div>
            </div>
        </div>
    );
};

export default DropdownButton;