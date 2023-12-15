import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSignoutMutation } from "../features/auth/authApiSlice";

const DropdownButton = ({ title }) => {
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
    const onClickSearch = () => navigate("/recipes");
    const onClickSuggest = () => navigate("/suggest");

    return (
        <div
            className="bg-slate-50 hover:bg-red-100 border-2 border-red-500 text-red-500 flex justify-center items-center relative px-3 py-1 rounded-lg hover:cursor-pointer"
            onClick={onClickButton}
            onBlur={onClickButton}
            ref={dropdownRef}
        >
            <div className="flex justify-center items-center gap-2">
                <h6>{title}</h6>
                {!open ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div className={`transition-transform transition-opacity duration-100 ${open ? "transform scale-y-100 opacity-100" : "transform scale-y-0 opacity-0"} absolute top-10 bg-red-100 flex flex-col justify-center items-center rounded-lg w-full text-bold`}
            >
                <div
                    className="rounded-t-lg w-full py-2 flex justify-center hover:bg-red-300"
                    onClick={onClickHome}
                >
                    Home
                </div>
                <div
                    className="w-full py-2 flex justify-center hover:bg-red-300"
                    onClick={onClickSearch}
                >
                    Search
                </div>
                <div
                    className="w-full py-2 flex justify-center hover:bg-red-300"
                    onClick={onClickSuggest}
                >
                    Suggest
                </div>
                <div
                    className="w-full py-2 flex justify-center hover:bg-red-300"
                    onClick={onClickProfile}
                >
                    Profile
                </div>
                <div
                    className="rounded-b-lg w-full py-2 flex justify-center text-red-700 hover:bg-red-300"
                    onClick={onClickSignOut}
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default DropdownButton;