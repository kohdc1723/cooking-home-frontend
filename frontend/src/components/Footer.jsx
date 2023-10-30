import { MdFoodBank } from "react-icons/md";
import { SiMongodb, SiRedux, SiReact, SiNodedotjs, SiExpress } from "react-icons/si";
import "../styles/css/footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <h1><MdFoodBank /> COOKING HOME</h1>
            <div className="footer__tech-stack">
                <span><SiMongodb color="#00684A" />MongoDB</span>
                <span><SiExpress color="#353535" />Express.js</span>
                <span><SiReact color="#087EA4" />React.js</span>
                <span><SiNodedotjs color="#026E00" />Node.js</span>
                <span><SiRedux color="#764ABC" />Redux Toolkit</span>
            </div>
        </footer>
    );
};

export default Footer;