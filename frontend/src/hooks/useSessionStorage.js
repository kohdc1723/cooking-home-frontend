import { useState, useEffect } from "react";

const useSessionStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const sessionValue = JSON.parse(sessionStorage.getItem(key));

        if (sessionValue) {
            return sessionValue;
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useSessionStorage;