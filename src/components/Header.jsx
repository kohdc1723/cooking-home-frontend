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
        <header className={`bg-neutral-50 fixed top-0 flex justify-between items-center py-3 px-5 w-full z-50 ${isScrolled ? "shadow-sm shadow-slate-300" : ""}`}>
            <h1 className="hover:cursor-pointer" onClick={onClickHome}>
                <img
                    src={Logo}
                    alt="cooking-home"
                    width={48}
                    height={48}
                />
            </h1>
            <nav className="flex gap-3 items-center text-sm">
                <Link to="/recipes" className="clickable-text">Search</Link>
                <Link to="/suggest" className="clickable-text">Suggest</Link>
                <AuthButton />
            </nav>
        </header>
    );
};

export default Header;