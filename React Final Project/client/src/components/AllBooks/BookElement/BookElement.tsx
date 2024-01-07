
import styles from "./BookElement.module.css"
import Rating from '@mui/material/Rating';
export default function BookElement({book}){
    const dateString = book.releaseDate;
    const date = new Date(dateString);
    const year = date.getFullYear();


    return(
            <>
                <div className={styles.fundament}>
                        <div className={styles.behindBook}></div>
                        <div className={styles.paper}></div>
                        <div className={styles.paper}></div>
                        <div className={styles.paper}>{<Rating name="read-only" value={book.rating} readOnly />}</div>

                        <article className={styles.bookElementWrapper}>
                            <div className={styles.year}>
                                {/*<img src="../../../../public/bookIcon.png" alt=""/>*/}

                                <h1 className={styles.yearLabel}>{year}</h1>
                            </div>
                            <div className={styles.imageC}>
                                <img src={book.image||"public/chapter.jpg"} alt=""/>
                            </div>
                            <section className={styles.infoC}>
                                <h1 className={styles.bookName}>{book.name}</h1>
                                <h2 className={styles.bookAuthor}>{book.author}</h2>
                                <div className={styles.container}>
                                    <span className={styles.genre}>{book.genre}</span>
                                    <div className={styles.line}><p></p></div>
                                    <span className={styles.rating}>{year}</span>
                                </div>

                            </section>

                        </article>
                </div>

            </>
    )
}