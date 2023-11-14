import styles from "./AllBooks.module.css"
import {useEffect, useState} from "react";
import {request} from "../functions";

export default function AllBooks(){

    const [books,setBooks] = useState([])
     const getAll = ()=>{
        request("books/all","GET").subscribe(
            (res)=>{
                setBooks(res.allBooks)
                console.log(res)
            },
            (error)=>{
                console.log(error)
            }
        )
    }


    useEffect(()=>{
        getAll()
    },[])
    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.searchBarWrapper}>
                    <div className={styles.searchBarC}>
                        <input placeholder={"Search here"}  />
                        <div className={styles.autoCompletion}></div>
                    </div>
                </div>

                <div className={styles.booksC}>
                    {books.length>0&&books.map((book)=>{



                        return  <div key={book._id} className={styles.bookC}>
                                <img src={"/public/chapter.jpg"}></img>
                                <h3 className={styles.heading}>{book.name}</h3>
                                <h3 className={styles.heading}>{book.author}</h3>
                                <h3 className={styles.heading}>{book.genre}</h3>
                            </div>


                    })}


                </div>

            </div>
        </>
    )
}