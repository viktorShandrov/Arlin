
import styles from "./FreeChapter.module.css"
import {useNavigate} from "react-router-dom";
export default function FreeChapter({chapter}){
    const navigate = useNavigate()
    console.log(chapter)
    return(
        <article className={styles.freeChapterC}>
            <div className={styles.freeLabel}>БЕЗПЛАТНО</div>
            <div className={styles.imgC}>
                <img src={chapter.bookImage||"/chapter.jpg"} alt=""/>
            </div>
            <h6 className={styles.heading}>
                Книга: <h5>{chapter.bookName}</h5>
            </h6>
            <h6 className={styles.heading}>
                Глава: <h5>{chapter.chapterName}</h5>
            </h6>
            <button onClick={()=>navigate(`/main/read/${chapter.bookId}/chapterId=${chapter.chapterId}`)} className={`${styles.btn} ${styles.readBtn}`}>Прочети</button>
            <button onClick={()=>navigate(`/main/AllBooks/${chapter.bookId}`)} className={`${styles.btn} ${styles.viewBookBtn}`}>Виж книгата</button>
        </article>
    )
}