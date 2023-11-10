import {Route, Routes} from "react-router-dom";
import AddChapterPanel from "./addChapter/AddChapterPanel";

export default function AdminPanel(){
    return(
        <>
            <h1>Adminpamn</h1>
            <Routes>
                <Route path={"addChapter"} element={<AddChapterPanel/>}/>
            </Routes>
        </>

    )
}