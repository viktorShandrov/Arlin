
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
export default function AuthGuard(){
    const {user} = useSelector((state:any)=>state.user)
    if(!user||!user.token){
        toast.info("Трябва да влезнеш в профил\n(You need to log in)")
        return <Navigate to={"/user/login"} />
    }
    return(
        <Outlet />
    )
}