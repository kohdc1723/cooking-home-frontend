import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-140px)]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;