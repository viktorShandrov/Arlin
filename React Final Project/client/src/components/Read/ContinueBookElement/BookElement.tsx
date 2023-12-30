
import styles from "./BookElement.module.css"
import {useEffect, useRef} from "react";
export default function ContinueBookElement({book}){
    // const bookRef = useRef(null)
    const dateString = book.releaseDate;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const bookClickHandler = (e:any)  =>{
        e.currentTarget.classList.add(styles.clicked)
    }
    useEffect(()=>{
        console.log(111)
    },[])

    return(
            <>
                <div onClick={bookClickHandler} className={styles.fundament}>
                        <div className={styles.behindBook}></div>
                        <div className={styles.paper}></div>
                        <div className={styles.paper}></div>
                        <div className={styles.paper}>{year}</div>

                        <article   className={styles.bookElementWrapper}>
                            <div className={styles.icon}>
                                <img src="../../../../public/bookIcon.png" alt=""/>
                            </div>
                            <div className={styles.imageC}>
                                <img src={book.image||"public/chapter.jpg"} alt=""/>
                            </div>
                            <section className={styles.infoC}>
                                <h1 className={styles.bookName}>{book.name}</h1>
                                <h3 className={styles.bookAuthor}>{book.author}</h3>
                                <div className={styles.container}>
                                    <span className={styles.genre}>{book.genre}</span>
                                    <div className={styles.line}><p></p></div>
                                    <span className={styles.rating}>{book.rating}/10</span>
                                </div>

                            </section>

                        </article>
                </div>

            </>
    )
}