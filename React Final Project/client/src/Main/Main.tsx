import StoryList from "../Story-list/StoryList";
import Story from "../Story/Story";
import TranslationContainer from "../TranslationContainer/TranslationContainer";
import {createContext, useState} from "react";
import {Route, Routes} from "react-router-dom";
import ChapterList from "../ChapterList/ChapterList";
import styles from "./Main.module.css"
export const chapterContext = createContext<any>(undefined)

export default  function Main(){
    const [chapter,setChapter] = useState("")

    return(
        <chapterContext.Provider value={[chapter,setChapter]}>
            <main className={styles.main}>
                <Routes>
                    <Route path={"/"} element={<StoryList />}/>
                    <Route path={"/:bookId/:chapterId?/:textToTranslate?"} element={<ChapterList />}/>

                </Routes>
                <Routes>
                    <Route path={"/:bookId/:chapterId/:textToTranslate?"} element={<Story />}/>
                </Routes>
                <Routes>
                    <Route path={"/:bookId/:chapterId/:textToTranslate"} element={<TranslationContainer/>}/>
                </Routes>


            </main>
        </chapterContext.Provider>
    )
}