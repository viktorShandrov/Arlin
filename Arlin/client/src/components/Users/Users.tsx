import {Route, Routes} from "react-router-dom";
import LoginAndRegister from "../public/Register/Register";

export default function User(){

    return(
        <Routes >
            <Route path={"/:portal"} element={<LoginAndRegister/>} />
        </Routes>
    )
}