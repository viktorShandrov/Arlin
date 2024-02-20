import {Route, Routes} from "react-router-dom";
import Test from "../Test/Test";
// @ts-ignore
import UnknownWords from "../UnknownWords/UnknownWords";
import AllBooks from "../AllBooks/AllBooks";
import BookDetails from "../BookDetails/BookDetails";
import Read from "../Read/Read";

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
import MachFourTest from "../MachFourTest/MachFourTest";
import LevelInfo from "../LevelInfo/LevelInfo";
import TestsList from "../TestsList/TestsList";
import TrophyRoad from "../TrophyRoad/TrophyRoad";
export default function Main(){
    return(
        <>
            <div className={styles.templateWrapper}>
                <Navigation/>
                <LevelInfo />
                <Routes>
                        <Route element={<AuthGuard/>}>
                            <Route path={"/test/:testType/:chapterId?"} element={<Test />}></Route>
                            <Route path={"/test/matchFour"} element={<MachFourTest />}></Route>
                            <Route path={"/tests"} element={<TestsList />}></Route>
                            <Route path={"/unknownWords"} element={<UnknownWords />}></Route>
                            <Route path={"/AllBooks/freeBookMode?"} element={<AllBooks />}></Route>
                            <Route path={"/read"} element={<MyBooksList />}></Route>
                            <Route path={"/read/:bookId/:chapterId/:textToTranslate?"} element={<Read />}></Route>
                            <Route path={"/AllBooks/:id"} element={<BookDetails />}></Route>
                            <Route path={"/AllBooks/:id/content"} element={<BookContent />}></Route>
                            <Route path={"/dashboard"} element={<Dashboard />}></Route>
                            <Route path={"/news/:id/*"} element={<NewsDetails />}></Route>
                            <Route path={"/chat"} element={<Chat />}></Route>
                            <Route path={"/trophyRoad"} element={<TrophyRoad />}></Route>
                        </Route>
                        <Route path={"/hero"} element={<LandingPage />}></Route>
                        <Route path={"/news/:id/"} element={<NewsDetails />}></Route>
                        <Route path={"/news"} element={<NewsList />}></Route>
                </Routes>
            </div>

        </>

    )
}