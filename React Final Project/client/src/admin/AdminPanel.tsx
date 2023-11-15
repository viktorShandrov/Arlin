import {Route, Routes} from "react-router-dom";
import AddChapterPanel from "./addChapter/AddChapterPanel";
import AddBook from "./addBook/AddBook";

export default function AdminPanel(){
    return(
        <>
            <h1>Admin panel</h1>
            <Routes>
                <Route path={"addChapter"} element={<AddChapterPanel/>}/>
                <Route path={"addBook/:bookId?"} element={<AddBook/>}/>
            </Routes>
        </>

    )
}