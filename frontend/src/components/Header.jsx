import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <header className={`header ${isScrolled && "scrolled"}`}>
            <h1>COOKING HOME</h1>
            <Link className="login-button" to="/login">Sign In</Link>
        </header>
    );
};

export default Header;