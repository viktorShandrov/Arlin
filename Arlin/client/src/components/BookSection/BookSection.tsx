
import styles from "./BookSection.module.css"
import {Link} from "react-router-dom";
import BookElement from "../AllBooks/BookElement/BookElement";
import {useState} from "react";
// @ts-ignore
export default function BookSection({books,sectionHeader,children=null,isSearchChild = false,areOwnedByUser=false,headerColor="black"}){
    const [isShowMoreClicked,setIsShowMoreClicked] = useState(false)
    return(
        <section  className={styles.bookSection}>
            <h3 style={{color:headerColor}} className={styles.sectionHeader}>{sectionHeader}</h3>
            {(books.length===0||isSearchChild)&&children}
            {books.length>0&&<div className={styles.booksC}>
                {books.slice(0,isShowMoreClicked? books.length+1 :5).map((book:any)=>{
                    if(areOwnedByUser){
                        return <Link to={`/main/read/${book._id}/chapterId=${book.chapters[0]}`} key={book._id} className={styles.bookC}>
                            <BookElement book ={book} />
                        </Link>
                    }else{
                        return <Link to={`/main/AllBooks/${book._id}/${window.location.href.includes("freeBookMode")?"freeBookMode":""}`} key={book._id} className={styles.bookC}>
                            <BookElement book ={book} />
                        </Link>
                    }

                })}
            </div>}
            {books.length>5&&!isShowMoreClicked&&<button className={styles.showMoreBtn} onClick={()=>setIsShowMoreClicked(true)}>покажи още</button>}

        </section>
    )
}