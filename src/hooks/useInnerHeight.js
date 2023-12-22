import { useState, useEffect } from "react";

const getOneVh = () => {
    return window.innerHeight * 0.01;
};

const useInnerHeight = () => {
    const [vh, setVh] = useState(() => getOneVh());

    const handleResize = () => {
        setVh(getOneVh());
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return vh;
};

export default useInnerHeight;