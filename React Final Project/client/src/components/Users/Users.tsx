import {Route, Routes} from "react-router-dom";
import Register from "../public/Register/Register";
import Login from "../public/Login/Login";

export default function User(){

    return(
        <Routes >
            <Route path={"/register"} element={<Register/>} />
            <Route path={"/login"} element={<Login/>} />
        </Routes>
    )
}