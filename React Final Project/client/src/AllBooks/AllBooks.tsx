import styles from "./AllBooks.module.css"
import {useEffect, useState} from "react";
import {request} from "../functions";
import {Link} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function AllBooks(){

    const [reqBooks,setReqBooks] = useState([])
    const [books,setBooks] = useState([])
    const [searchParams,setSearchParams] = useState("")
    const searchParamsChangeHandler = (e)=>{
        const searchParam = e.currentTarget.value
        setBooks(()=>{
            return reqBooks.filter((el:any)=>el.name.toLowerCase().indexOf(searchParam.toLowerCase()) ==0)
        })
        setSearchParams(searchParam)
    }
     const getAll = ()=>{
        request("books/all","GET").subscribe(
            (res)=>{
                setReqBooks(res.allBooks)
                setBooks(res.allBooks)
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
            {/*<Navigation/>*/}
            <div className={styles.wrapper}>
                <div className={styles.searchBarWrapper}>
                    <div className={styles.searchBarC}>
                        <input value={searchParams} onChange={searchParamsChangeHandler} placeholder={"Search here"}  />
                        <div className={styles.autoCompletion}></div>
                    </div>
                </div>
                <div className={styles.bookWrapper}>
                    <div className={styles.booksC}>
                        {books.length>0&&books.map((book)=>{



                            return <Link to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>
                                <img src={"/public/chapter.jpg"}></img>
                                <h3 className={styles.heading}>{book.name}</h3>
                                <h3 className={styles.heading}>{book.author}</h3>
                                <h3 className={styles.heading}>{book.genre}</h3>
                            </Link>


                        })}


                    </div>
                </div>


            </div>
        </>
    )
}