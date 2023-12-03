import "./StoryList.css"
import { useEffect, useState} from "react";
import {request} from "../../functions";
import styles from "../ChapterList/ChapterList.module.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
export default function StoryList(){


    // const {user} = useContext(userContext)
    const {user} = useSelector((selector:any)=>selector.user)


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
            <Link to={`/main/read/${user.lastReading.bookId}/chapterId=${user.lastReading.chapterId}`}>
                <button>Continue reading</button>
            </Link>
            <div className={styles.chapterList}>
                {books.map((book: any, index: number) => (
                    <div key={index} className={styles.bookElementWrapper}>
                        {user.role!=='admin'&&!book.ownedBy.includes(user.userId)&&
                            <i className={`fa-solid fa-lock ${styles.lockIcon}`}></i>
                        }

                        <Link key={book._id}  to={`/main/read/${book._id}`}>

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