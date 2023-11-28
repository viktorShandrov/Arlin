
import styles from "./AuthGuard.module.css"
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
export default function AuthGuard(){
    const {user} = useSelector((state)=>state.user)
    if(!user.token){
        return <Navigate to={"/user/login"} />
    }
    return(
        <Outlet />
    )
}