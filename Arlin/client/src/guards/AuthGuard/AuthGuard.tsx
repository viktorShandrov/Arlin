
import {Navigate, Outlet} from "react-router-dom";
import {toast} from "react-toastify";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../../redux/StateProvider/StateProvider";

export default function AuthGuard() {
    const { userState } = useContext(userContext);
    const [isTimedOut, setIsTimedOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimedOut(true);
        }, 0); // Delay time in milliseconds

        return () => clearTimeout(timer);
    }, []);

    if (!isTimedOut) {
        return null; // You can return a loading spinner or placeholder here if needed
    }

    if (!userState() || !userState().token) {
        toast.info("Трябва да влезнеш в профил\n(You need to log in)");
        return <Navigate to={"/user/login"} />;
    }

    return <Outlet />;
}



