
import styles from "./BookSection.module.css"
import {Link} from "react-router-dom";
import BookElement from "../AllBooks/BookElement/BookElement";
import {useState} from "react";
// @ts-ignore
export default function BookSection({books,sectionHeader,children=null}){
    const [isShowMoreClicked,setIsShowMoreClicked] = useState(false)
    return(
        <section  className={styles.bookSection}>
            <h1 className={styles.sectionHeader}>{sectionHeader}</h1>
            {children}
            <div className={styles.booksC}>
                {books.slice(0,isShowMoreClicked? books.length+1 :5).map((book:any)=>{
                    return <Link to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>
                        <BookElement book ={book} />
                    </Link>
                })}
            </div>
            {books.length>5&&<button className={styles.showMoreBtn} onClick={()=>setIsShowMoreClicked(true)}>покажи още</button>}

        </section>
    )
}