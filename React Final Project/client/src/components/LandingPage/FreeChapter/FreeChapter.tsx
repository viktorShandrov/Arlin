
import styles from "./FreeChapter.module.css"
export default function FreeChapter(){
    return(
        <article className={styles.freeChapterC}>
            <div className={styles.imgC}>
                <img src="/chapter.jpg" alt=""/>
            </div>
            <h2 className={styles.heading}>
                Книга: Под Игото
            </h2>
            <h2 className={styles.heading}>
                Номер на глава: 43
            </h2>
            <button className={`${styles.btn} ${styles.readBtn}`}>Прочети</button>
            <button className={`${styles.btn} ${styles.viewBookBtn}`}>Виж книгата</button>
        </article>
    )
}