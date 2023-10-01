import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <div className="welcome-bg" />
            <section className="welcome">
                <div className="welcome-text">
                    <h2>WELCOME!</h2>
                    <p><span className="title">COOKING HOME</span> provides extensive recipe search engine</p>
                    <p>and recommends recipes using ingredients you have at home.</p>
                    <p>Discover recipes perfect for you and cook at home.</p>
                    <p>Dine well and stay healthy with <span className="title">COOKING HOME</span>.</p>
                    <br />
                    <Link to="/login" className="start-link">Get Started</Link>
                </div>
            </section>
        </>
    );
};

export default Welcome;