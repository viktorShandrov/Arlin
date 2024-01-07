import {Route, Routes} from "react-router-dom";
import Test from "../Test/Test";
// @ts-ignore
import UnknownWords from "../UnknownWords/UnknownWords.jsx";
import AllBooks from "../AllBooks/AllBooks";
import BookDetails from "../BookDetails/BookDetails";
import Read from "../Read/Read";
import NavigationOld from "../NavigationOld/Navigation";

import styles from "./Main.module.css"
import Dashboard from "../Dashboard/Dashboard";
import NewsList from "../NewsList/NewsList";
import NewsDetails from "../NewsDetails/NewsDetails";
import AuthGuard from "../../guards/AuthGuard/AuthGuard";
import Chat from "../Chat/Chat";
import LandingPage from "../LandingPage/LandingPage";
import Navigation from "../Navigation/Navigation";
import MyBooksList from "../MyBooksList/MyBooksList";
import BookContent from "../BookContent/BookContent";
export default function Main(){
    return(
        <>
            <div className={styles.templateWrapper}>
                <Navigation/>
                <Routes>
                        <Route element={<AuthGuard/>}>
                            <Route path={"/test/:testType/:chapterId?"} element={<Test />}></Route>
                            <Route path={"/unknownWords"} element={<UnknownWords />}></Route>
                            <Route path={"/AllBooks/"} element={<AllBooks />}></Route>
                            <Route path={"/read"} element={<MyBooksList />}></Route>
                            <Route path={"/read/:bookId/:chapterId/:textToTranslate?"} element={<Read />}></Route>
                            <Route path={"/AllBooks/:id"} element={<BookDetails />}></Route>
                            <Route path={"/AllBooks/:id/content"} element={<BookContent />}></Route>
                            <Route path={"/dashboard"} element={<Dashboard />}></Route>
                            <Route path={"/news/:id/*"} element={<NewsDetails />}></Route>
                            <Route path={"/chat"} element={<Chat />}></Route>
                        </Route>
                        <Route path={"/hero"} element={<LandingPage />}></Route>
                        <Route path={"/news/:id/"} element={<NewsDetails />}></Route>
                        <Route path={"/news"} element={<NewsList />}></Route>
                </Routes>
            </div>

        </>

    )
}