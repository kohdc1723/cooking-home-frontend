import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <section className="welcome">
            <div className="welcome__text">
                <h2>WELCOME!</h2>
                <p><span>COOKING HOME</span> provides extensive recipe search engine</p>
                <p>and recommends recipes using ingredients you have at home.</p>
                <p>Discover recipes perfect for you and cook at home.</p>
                <p>Dine well and stay healthy with <span>COOKING HOME</span>.</p>
                <br />
                <Link to="/recipes" className="start-link">Try Recipe Finder</Link>
            </div>
        </section>
    );
};

export default Welcome;