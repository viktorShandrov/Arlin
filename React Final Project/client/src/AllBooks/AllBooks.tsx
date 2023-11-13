import styles from "./AllBooks.module.css"

export default function AllBooks(){
    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.booksC}>
                    <div className={styles.bookC}>
                            <img src={"/public/chapter.jpg"}></img>
                            <h3 className={styles.heading}>Book Name</h3>
                            <h3 className={styles.heading}>Book Author</h3>
                            <h3 className={styles.heading}>Book Genre</h3>
                    </div>

                </div>

            </div>
        </>
    )
}