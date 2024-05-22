
import styles from "./FreeChapter.module.css"
import {useNavigate} from "react-router-dom";
// @ts-ignore
export default function FreeChapter({chapter}){
    const navigate = useNavigate()
    return(
        <article className={styles.freeChapterC}>
            <p className={styles.freeLabel}>БЕЗПЛАТНО</p>
            <div className={styles.imgC}>
                <img src={chapter.bookImage||"/chapter.jpg"} alt=""/>
            </div>
            <div className={styles.labelSections}>
                <h6 className={styles.heading}>
                    Книга: <h5 className={styles.bookData}>{chapter.bookName}</h5>
                </h6>
                <h6 className={styles.heading}>
                    Глава: <h5 className={styles.bookData}>{chapter.chapterName}</h5>
                </h6>
            </div>

            <div className={styles.btns}>
                <button onClick={()=>navigate(`/main/read/${chapter.bookId}/chapterId=${chapter.chapterId}`)} className={`${styles.btn} ${styles.readBtn}`}>Прочети</button>
                <button onClick={()=>navigate(`/main/AllBooks/${chapter.bookId}`)} className={`${styles.btn} ${styles.viewBookBtn}`}>Виж книгата</button>
            </div>
            </article>
    )
}