import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSignoutMutation } from "../features/auth/authApiSlice";

const DropdownButton = ({ title, items }) => {
    const navigate = useNavigate();

    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);

    const [logout, { isSuccess }] = useSignoutMutation();

    useEffect(() => {
        const onClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", onClickOutside);

        return () => document.removeEventListener("click", onClickOutside);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess, navigate]);

    const onClickButton = () => setOpen(prev => !prev);
    const onClickHome = () => navigate("/");
    const onClickSignOut = () => logout();
    const onClickProfile = () => navigate("/profile");

    return (
        <div
            className="dropdown-button"
            onClick={onClickButton}
            onBlur={onClickButton}
            ref={dropdownRef}
        >
            <div className="dropdown-button__header">
                <div className="dropdown-button__title">{title}</div>
                {!open ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div className={open ? "dropdown-button__list" : "off-screen"}>
                <div
                    className="dropdown-button__item"
                    onClick={onClickHome}
                >
                    Home
                </div>
                <div
                    className="dropdown-button__item"
                    onClick={onClickProfile}
                >
                    Profile
                </div>
                <div
                    className="dropdown-button__item dropdown-button__signout"
                    onClick={onClickSignOut}
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default DropdownButton;