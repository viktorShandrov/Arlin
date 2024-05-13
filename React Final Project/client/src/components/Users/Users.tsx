import {Route, Routes} from "react-router-dom";
import Register from "../public/Register/Register";
import Login from "../public/Login/Login";
import LoginAndRegister from "../public/Register/Register";

export default function User(){

    return(
        <Routes >
            <Route path={"/:portal"} element={<LoginAndRegister/>} />
        </Routes>
    )
}