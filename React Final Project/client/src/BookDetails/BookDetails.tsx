import styles from "./BookDetails.module.css"
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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
            request(`books/${id}`,"GET").subscribe(
                (res)=>{
                    setBook(res.book)
                },
                error=>{
                    console.log(error)
                }
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
                            <button className={styles.buyBtn}>Buy</button>
                            <button className={styles.editBtn}>Edit</button>
                            <button className={styles.deleteBtn}>Delete</button>
                        </div>

                    </div>
                    <div className={styles.detailsAndBtns}>
                        <div className={styles.details}>
                            <h2 className={styles.bookName}>{book.name}</h2>
                            <h2 className={styles.bookName}>{book.author}</h2>
                            <h2 className={styles.bookName}>{book.length}</h2>
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