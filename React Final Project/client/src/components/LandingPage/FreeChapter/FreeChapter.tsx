
import styles from "./FreeChapter.module.css"
import {useNavigate} from "react-router-dom";
export default function FreeChapter({chapter}){
    const navigate = useNavigate()
    return(
        <article className={styles.freeChapterC}>
            <div className={styles.freeLabel}>БЕЗПЛАТНО</div>
            <div className={styles.imgC}>
                <img src="/chapter.jpg" alt=""/>
            </div>
            <h2 className={styles.heading}>
                Книга: {chapter.bookName}
            </h2>
            <h2 className={styles.heading}>
                Глава: {chapter.chapterName}
            </h2>
            <button onClick={()=>navigate(`/main/read/${chapter.bookId}/chapterId=${chapter.chapterId}`)} className={`${styles.btn} ${styles.readBtn}`}>Прочети</button>
            <button onClick={()=>navigate(`/main/AllBooks/${chapter.bookId}`)} className={`${styles.btn} ${styles.viewBookBtn}`}>Виж книгата</button>
        </article>
    )
}