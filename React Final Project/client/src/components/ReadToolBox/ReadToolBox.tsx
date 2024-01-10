
import styles from "./ReadToolBox.module.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
export default function ReadToolBox({chapter, changeChapterClickHandler}){
    const [areTestsHidden,setAreTestsHidden] = useState(true)
    const showBtns = ()=>{
        setAreTestsHidden(!areTestsHidden)
    }

    return(
        <div className={styles.testsWrapper}>
            <button onClick={showBtns} className={`${styles.btn} ${styles.testIcon}`}>
                <img src="/nav%20icons%20new/test.png" alt=""/>
            </button>
            {!areTestsHidden&&
                <>
                    <Link to={`/main/test/textWords/${chapter.currentChapter._id}`}>
                        <button className={`${styles.btn} ${styles.textWordsTest}`}>тест на думи от текста</button>
                    </Link>
                    <Link to={`/main/test/textQuestions/${chapter.currentChapter._id}`}>
                        <button disabled={!chapter.hasChapterPlotTest} className={`${styles.btn} ${styles.textTest}`}>тест на разбраното от текста</button>
                    </Link>
                </>
            }
        </div>
            // <div className={styles.ReadNavigationToolBox}>
            //
            //
            //     <button disabled={!chapter.nextChapterId} onClick={()=>changeChapterClickHandler(chapter.nextChapterId)} className={`    ${styles.btn}`} >следваща глава</button>
            //     <button disabled={!chapter.previousChapterId} onClick={()=>changeChapterClickHandler(chapter.previousChapterId)} className={` ${styles.btn}`} >предишна глава</button>
            // </div>
    )
}