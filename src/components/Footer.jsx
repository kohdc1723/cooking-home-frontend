import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

const Footer = () => {
    const navigate = useNavigate();
    const onClickHome = () => navigate("/");

    return (
        <footer className="py-3 px-5 w-full flex justify-end">
            <span className="hover:cursor-pointer" onClick={onClickHome}>
                <img src={Logo} alt="cooking-home" width={48} height={48} />
            </span>
        </footer>
    );
};

export default Footer;