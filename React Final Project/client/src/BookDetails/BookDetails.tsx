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
const [image,setImage] = useState("")
    const [book,setBook] = useState({
        name:"",
        resume:"",
        author:"",
        length:"",
        image: {
            data:''
        },
        ownedBy:[]
    })
    const getBook = ()=>{
            request(`books/${id}/details`,"GET").subscribe(
                async (res)=>{
                    const imageData = res.book.image.data;

                    const base64Image = btoa(new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), ''));

                    // Set Base64-encoded image as the source
                    setImage(`data:image/jpeg;base64,${base64Image}`);
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
                        <img src={image} alt="Your Image" />
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
                                    <h2 className={styles.chaptersCount}>Chapters count:</h2>
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
                            {book.ownedBy.includes(user.userId)&&
                                <Link to={`/main/${book._id}`} className={styles.readBtn}>Read</Link>
                            }

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}