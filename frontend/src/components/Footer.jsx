const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__title-column">
                <h1>COOKING HOME</h1>
                <p>created by kohdc in 2023</p>
            </div>
            <div className="footer__column">
                <h5>TECH STACK</h5>
                <p>MongoDB</p>
                <p>Express.js</p>
                <p>React.js</p>
                <p>Node.js</p>
                <p>Redux Toolkit</p>
            </div>
            <div className="footer__column">
                <h5>QUICK LINKS</h5>
                <p>About Us</p>
                <p>Contact Us</p>
                <p>Privacy Policy</p>
                <p>Sitemap</p>
            </div>
            <div className="footer__column">
                <h5>SOCIAL LINKS</h5>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>LinkedIn</p>
                <p>Github</p>
            </div>
        </footer>
    );
};

export default Footer;