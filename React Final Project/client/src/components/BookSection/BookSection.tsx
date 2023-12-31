
import styles from "./BookSection.module.css"
import {Link} from "react-router-dom";
import BookElement from "../AllBooks/BookElement/BookElement";
// @ts-ignore
export default function BookSection({books,sectionHeader}){
    return(
        <section  className={styles.bookSection}>
            <h1 className={styles.sectionHeader}>{sectionHeader}</h1>
            <div className={styles.booksC}>
                {books.map((book:any)=>{
                    return <Link to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>
                        <BookElement book ={book} />
                    </Link>
                })}
            </div>
        </section>
    )
}