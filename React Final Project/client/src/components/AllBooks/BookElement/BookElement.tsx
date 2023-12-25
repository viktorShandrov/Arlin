
import styles from "./BookElement.module.css"
export default function BookElement({book}){
    return(
            <>
                <article className={styles.bookElementWrapper}>
                        <div className={styles.icon}>
                            <img src="../../../../public/bookIcon.png" alt=""/>
                        </div>
                    <div className={styles.imageC}>
                        <img src="public/chapter.jpg" alt=""/>
                    </div>
                    <section className={styles.infoC}>
                        <h1 className={styles.bookName}>{book.name}</h1>
                        <h3 className={styles.bookAuthor}>{book.author}</h3>
                        <div className={styles.container}>
                            <span className={styles.genre}>{book.genre}</span>
                            <div className={styles.line}><p></p></div>
                            <span className={styles.rating}>6/10</span>
                        </div>

                    </section>
                    
                </article>
            </>
    )
}