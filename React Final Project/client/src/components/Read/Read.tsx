import StoryList from "../Story-list/StoryList";
import Story from "../Story/Story";
import TranslationContainer from "../TranslationContainer/TranslationContainer";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import ChapterList from "../ChapterList/ChapterList";
import styles from "./Read.module.css"
import ContinueBookElement from "./ContinueBookElement/BookElement";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import MyBooksList from "../MyBooksList/MyBooksList";
export default  function Read(){

    const {user} = useSelector((selector:any)=>selector.user)
    const navigate = useNavigate()
    const continueReadingHandler=(e:any)=>{
        const target = e.currentTarget
        target.classList.add(styles.clicked)
        setTimeout(()=>{

            // navigate(`/main/read/${user.lastReading.bookId}/chapterId=${user.lastReading.chapterId}`)
            // target.classList.remove(styles.clicked)
        },1000)

    }
    useEffect(()=>{

    },[])

    return(
        <>
            <section className={styles.main}>
                <div className={styles.listC}>
                        <Routes>


                            <Route path={"/"} element={<MyBooksList />}/>
                            <Route path={"/:bookId/:chapterId?/:textToTranslate?"} element={<ChapterList />}/>

                        </Routes>
                </div>
                <div className={styles.storyC}>
                    <div onClick={continueReadingHandler} className={styles.readBookC}>
                        {/*<ContinueBookElement book={book}/>*/}
                    </div>
                    <Routes>
                        <Route path={"/:bookId/:chapterId/:textToTranslate?"} element={<Story />}/>
                    </Routes>
                </div>

                <div className={styles.translatePanelC}>
                    <Routes>
                        <Route path={"/:bookId/:chapterId/:textToTranslate"} element={<TranslationContainer/>}/>
                    </Routes>
                </div>


            </section>



         </>


    )
}