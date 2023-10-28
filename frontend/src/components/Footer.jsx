import { MdFoodBank } from "react-icons/md";
import { SiMongodb, SiRedux, SiReact, SiNodedotjs, SiExpress } from "react-icons/si";


const Footer = () => {
    return (
        <footer className="footer">
            <h1><MdFoodBank /> COOKING HOME</h1>
            <div className="footer__tech-stack">
                <span className="footer__tech-stack-item"><SiMongodb color="#00684A" />MongoDB</span>
                <span className="footer__tech-stack-item"><SiExpress color="#353535" />Express.js</span>
                <span className="footer__tech-stack-item"><SiReact color="#087EA4" />React.js</span>
                <span className="footer__tech-stack-item"><SiNodedotjs color="#026E00" />Node.js</span>
                <span className="footer__tech-stack-item"><SiRedux color="#764ABC" />Redux Toolkit</span>
            </div>
        </footer>
    );
};

export default Footer;