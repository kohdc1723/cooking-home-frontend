import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../features/auth/components";
import Logo from "../images/logo.png";

const Header = () => {
    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const onClickHome = () => navigate("/");

    return (
        <header className={`bg-white fixed top-0 flex justify-between items-center py-3 px-5 w-full z-50 ${isScrolled ? "shadow-sm shadow-slate-300" : ""}`}>
            <h1 className="hover:cursor-pointer" onClick={onClickHome}>
                <img
                    src={Logo}
                    alt="cooking-home"
                    width={40}
                    height={40}
                />
            </h1>
            <AuthButton />
        </header>
    );
};

export default Header;