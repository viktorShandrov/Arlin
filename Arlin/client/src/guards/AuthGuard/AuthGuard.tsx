
import {Navigate, Outlet} from "react-router-dom";
import {toast} from "react-toastify";
import {useContext} from "react";
import {userContext} from "../../redux/StateProvider/StateProvider";

export default function AuthGuard(){
    // let {user} = useSelector((state:any)=>state.user)
    {/*// @ts-ignore*/}
    const { userState } = useContext(userContext);

    if(!userState()||!userState().token){
        toast.info("Трябва да влезнеш в профил\n(You need to log in)")
        return <Navigate to={"/user/login"} />
    }
    return(
        <Outlet />
    )
}


