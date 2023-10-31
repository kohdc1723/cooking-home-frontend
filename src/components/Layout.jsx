import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";
import "../styles/css/layout.css";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="layout__main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;