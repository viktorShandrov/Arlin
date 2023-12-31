
import styles from "./BookElement.module.css"
// @ts-ignore
export default function ContinueBookElement({book}){
    // const bookRef = useRef(null)
    const dateString = book.releaseDate;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const bookClickHandler = (e:any)  =>{
        e.currentTarget.classList.add(styles.clicked)
    }


    return(
            <>
                <div onClick={bookClickHandler} className={styles.fundament}>
                        <div className={styles.behindBook}></div>
                        <div className={styles.paper}></div>
                        <div className={styles.paper}></div>
                        <div className={styles.paper}>“There is more treasure in books than in all the pirate's loot on Treasure Island.” ― Walt Disney</div>

                        <article   className={styles.bookElementWrapper}>
                            <div className={styles.icon}>
                                <img src="../../../../public/bookIcon.png" alt=""/>
                            </div>
                            <div className={styles.imageC}>
                                <img src={book.image||"public/chapter.jpg"} alt=""/>
                            </div>
                            <section className={styles.infoC}>
                                <h2 className={styles.bookName}>Продължете:</h2>
                                <h1 className={styles.bookName}>{book.name}</h1>
                            </section>

                        </article>
                </div>

            </>
    )
}