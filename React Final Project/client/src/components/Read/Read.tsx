import StoryList from "../Story-list/StoryList";
import Story from "../Story/Story";
import TranslationContainer from "../TranslationContainer/TranslationContainer";
import { Route, Routes} from "react-router-dom";
import ChapterList from "../ChapterList/ChapterList";
import styles from "./Read.module.css"
export default  function Read(){

    // const {user,setUser} = useContext(userContext)

    return(
        <>
            <main className={styles.main}>
                <div className={styles.listC}>
                        <Routes>


                            <Route path={"/"} element={<StoryList />}/>
                            <Route path={"/:bookId/:chapterId?/:textToTranslate?"} element={<ChapterList />}/>

                        </Routes>
                </div>
                <div className={styles.storyC}>
                    <Routes>
                        <Route path={"/:bookId/:chapterId/:textToTranslate?"} element={<Story />}/>
                    </Routes>
                </div>

                <div className={styles.translatePanelC}>
                    <Routes>
                        <Route path={"/:bookId/:chapterId/:textToTranslate"} element={<TranslationContainer/>}/>
                    </Routes>
                </div>


            </main>



         </>


    )
}