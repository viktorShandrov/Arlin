import StoryListItem from "./StoryListItem/StoryListItem";
import "./StoryList.css"
import {useContext, useEffect, useState} from "react";
import {request} from "../functions";
import styles from "../ChapterList/ChapterList.module.css";
import {Link} from "react-router-dom";
import {userContext} from "../App";
export default function StoryList(){


    const {user} = useContext(userContext)


    const [books,setBooks] = useState([])
    const fetchAllBooks = ()=>{
        request("books/all").subscribe(
            (res:any)=>{
                const {allBooks}=res
                setBooks(allBooks)
            },
            (error:any)=>{
                console.log(error)
            }
        )
    }
    useEffect(()=>{
        fetchAllBooks()
    },[])




    return(
        <div className={styles.chapterListWrapper}>
            <div className={styles.chapterList}>
                {books.map((book: any, index: number) => (
                    <div className={styles.bookElementWrapper}>
                        {!book.ownedBy.includes(user)&&
                            <i className={`fa-solid fa-lock ${styles.lockIcon}`}></i>
                        }
                        <Link key={book._id}  to={`/main/${book._id}`}>

                            <div className={styles.item}>
                                <div className={styles.chapterImg}>
                                    <img className={"img"} src={"/public/chapter.jpg"} alt={`Book ${book.name}`} />
                                </div>

                                <h3 className={styles.chapterName}>{book.name}</h3>
                            </div>
                        </Link>
                    </div>


                ))}
            </div>
        </div>

    )
}