import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthButton } from "../features/auth/components";
import { MdFoodBank } from "react-icons/md";

const Header = () => {
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

    return (
        <header className={`header ${isScrolled && "header__scrolled"}`}>
            <h1>
                <MdFoodBank />
                <span>
                    COOKING<br />HOME
                </span>
            </h1>
            <nav className="header__nav">
                <Link to="/recipes">Search</Link>
                <Link to="/suggest">Suggest</Link>
                <AuthButton />
            </nav>
        </header>
    );
};

export default Header;