import {Route, Routes} from "react-router-dom";
import Test from "../Test/Test";
import UnknownWords from "../UnknownWords/UnknownWords";
import AllBooks from "../AllBooks/AllBooks";
import BookDetails from "../BookDetails/BookDetails";
import Read from "../Read/Read";
import Navigation from "../Navigation/Navigation";

import styles from "./Main.module.css"
import Dashboard from "../Dashboard/Dashboard";
import NewsList from "../NewsList/NewsList";
export default function Main(){
    return(
        <>
            <div className={styles.templateWrapper}>
                <Navigation />
                <Routes>
                    <Route path={"/test/:testType/:chapterId?"} element={<Test />}></Route>
                    <Route path={"/unknownWords"} element={<UnknownWords />}></Route>
                    <Route path={"/AllBooks/"} element={<AllBooks />}></Route>
                    <Route path={"/read/*"} element={<Read />}></Route>
                    <Route path={"/AllBooks/:id"} element={<BookDetails />}></Route>
                    <Route path={"/dashboard"} element={<Dashboard />}></Route>
                    <Route path={"/news"} element={<NewsList />}></Route>
                </Routes>
            </div>

        </>

    )
}