
import styles from "./ReadToolBox.module.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
export default function ReadToolBox({chapter, changeChapterClickHandler}){



    return(
            <div className={styles.ReadNavigationToolBox}>
                <Link to={`/main/test/textWords/${chapter.currentChapter._id}`}>
                    <button className={styles.btn}>тест на думи от текста</button>
                </Link>
                <Link to={`/main/test/textQuestions/${chapter.currentChapter._id}`}>
                    <button disabled={!chapter.hasChapterPlotTest} className={styles.btn}>тест на разбраното от текста</button>
                </Link>
                <button disabled={!chapter.nextChapterId} onClick={()=>changeChapterClickHandler(chapter.nextChapterId)} className={`    ${styles.btn}`} >следваща глава</button>
                <button disabled={!chapter.previousChapterId} onClick={()=>changeChapterClickHandler(chapter.previousChapterId)} className={` ${styles.btn}`} >предишна глава</button>
            </div>
    )
}