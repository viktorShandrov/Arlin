import {Route, Routes} from "react-router-dom";
import AddChapterPanel from "./addChapter/AddChapterPanel";
import AddBook from "./addBook/AddBook";
import styles from "./addBook/AddBook.module.css";

export default function AdminPanel(){
    return(
        <>
            <div className={styles.adminWrapper}>
                <h1>Admin panel</h1>
                <Routes>
                    <Route path={"addChapter"} element={<AddChapterPanel/>}/>
                    <Route path={"addBook/:bookId?"} element={<AddBook/>}/>
                </Routes>
            </div>
        </>

    )
}