import styles from "./BookDetails.module.css"
import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {request} from "../functions";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {userContext} from "../App";

export default function  BookDetails(){
        const {id} = useParams()

    const {user} = useContext(userContext)

    const [book,setBook] = useState({
        name:"",
        resume:"",
        author:"",
        length:"",

    })
    const getBook = ()=>{
            request(`books/${id}/details`,"GET").subscribe(
                (res)=>{
                    setBook(res.book)
                    },
            )
    }

    useEffect(()=>{
         getBook()
    },[])
    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.imageAndBtns}>
                        <img src={"/public/chapter.jpg"}></img>
                        <div className={styles.btns}>

                            {book&&!book.ownedBy?.includes(user.userId)||user.role!=="admin"&&
                                <button className={styles.buyBtn}>Buy</button>
                            }

                            {user.role==="admin"&&
                                <>
                                    <Link to={`/admin/addBook/${book._id}`} className={styles.editBtn}>Edit</Link>
                                    <button className={styles.deleteBtn}>Delete</button>
                                </>
                            }

                        </div>

                    </div>
                    <div className={styles.detailsAndBtns}>
                        <div className={styles.details}>
                            <div className={styles.leftAndRightC}>
                                <div className={styles.left}>
                                    <h2 className={styles.bookName}>Name:</h2>
                                    <h2 className={styles.bookName}>Author:</h2>
                                    <h2 className={styles.bookName}>Chapters count:</h2>
                                </div>
                                <div className={styles.right}>
                                    <h2 className={styles.bookName}>{book.name}</h2>
                                    <h2 className={styles.bookName}>{book.author}</h2>
                                    <h2 className={styles.bookName}>{book.length}</h2>
                                </div>
                            </div>


                            <p className={styles.resume}>{book.resume}</p>
                        </div>
                        <div className={styles.btns}>
                            <button className={styles.seeFreeChaptersBtn}>See free chapters</button>
                            <button className={styles.readBtn}>Read</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}