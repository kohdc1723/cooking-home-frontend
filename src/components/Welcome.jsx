import { Link } from "react-router-dom";
import Primary from "../images/welcome-primary.png";
import Secondary from "../images/welcome-secondary.png";

const Welcome = () => {
    return (
        <section className="min-h-screen pt-[72px] flex flex-col items-center">
            <div className="flex flex-col gap-10 font-black items-center py-10">
                <h2 className="text-red-500 text-3xl md:text-4xl lg:text-5xl">Welcome!</h2>
                <p className="break-words text-center text-slate-900 font-bold max-w-xl px-5 text-xl md:text-2xl lg:text-3xl">
                    Search the perfect recipes for you and get recommendations based on your favorites and ingredients you have at home.
                </p>
                <Link
                    to="/recipes"
                    className="bg-red-500 text-slate-50 font-bold px-5 py-3 rounded-lg hover:bg-red-700"
                >
                    Try Recipe Finder
                </Link>
            </div>
            <div className="flex items-center gap-20 py-10">
                <img src={Primary} alt="welcome-primary" className="w-80" />
                <img src={Secondary} alt="welcome-secondary" className="w-80 hidden md:block" />
            </div>
        </section>
    );
};

export default Welcome;