
import styles from "./BookElement.module.css"
import Rating from '@mui/material/Rating';
// @ts-ignore
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

                                <h5 className={styles.yearLabel}>{year}</h5>
                            </div>
                            <div className={styles.imageC}>
                                <img src={book.image||"public/chapter.jpg"} alt=""/>
                            </div>
                            <section className={styles.infoC}>
                                <h5 className={styles.bookName}>{book.name}</h5>
                                <h6 className={styles.bookAuthor}>{book.author}</h6>
                                <div className={styles.container}>
                                    <span className={styles.genre}>{book.genre}</span>
                                    {/*<div className={styles.line}><p></p></div>*/}
                                    {/*<span className={styles.rating}>{year}</span>*/}
                                </div>

                            </section>

                        </article>
                </div>

            </>
    )
}