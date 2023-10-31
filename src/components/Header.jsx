import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../features/auth/components";
import { MdFoodBank } from "react-icons/md";
import "../styles/css/header.css";

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
        <header className={`header ${isScrolled && "header__scrolled"}`}>
            <h1 className="header__home" onClick={onClickHome}>
                <MdFoodBank />
                <span>
                    COOKING<br />HOME
                </span>
            </h1>
            <nav className="header__nav">
                <Link to="/recipes" className="clickable-text">Search</Link>
                <Link to="/suggest" className="clickable-text">Suggest</Link>
                <AuthButton />
            </nav>
        </header>
    );
};

export default Header;