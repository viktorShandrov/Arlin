import styles from "./BookDetails.module.css"
import { useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {request} from "../../functions";
import BuyBtn from "../BuyBtn/BuyBtn";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import Loading from "../Spinner/Loading";

export default function  BookDetails(){

    const stripePromise = loadStripe('pk_test_51OEwwSAPrNaPFyVRyPTVcpxfNfy2RJiSVgl3frnwPgKe2tQZhlOVVz5PCvVN8nqoEyT2HwarufbQcoQzNy1giqkg00bLGKyRr4');

    const {id} = useParams()

    // const {user} = useContext(userContext)
    const {user}:any = useSelector((selector:any)=>selector.user)
    const [image,setImage] = useState("")
    const [isDialogShown,setIsDialogShown] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [book,setBook] = useState({
        name:"",
        resume:"",
        author:"",
        length:"",
        _id:"",
        image: {
            data:''
        },
        ownedBy:[]
    })
    const getBook = ()=>{
            request(`books/${id}/details`,"GET").subscribe(
                async (res:any)=>{
                    const imageData = res.book.image.data;

                    const base64Image = btoa(new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), ''));

                    // Set Base64-encoded image as the source
                    setImage(`data:image/jpeg;base64,${base64Image}`);
                    setBook(res.book)
                    setIsLoading(false)
                    },
            )
    }
    const deleteBook = ()=>{
        request(`books/${book._id}/delete`,"GET").subscribe(
            ()=>{
                toast.success("Successfully deleted")
            }
        )
    }
    const toggleDeleteDialog=()=>{
        setIsDialogShown((oldState:boolean)=>!oldState)
    }



    useEffect(()=>{
        // setIsLoading(true)
         getBook()

    },[])


    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return(
        <>
            {isLoading&&<Loading/>}
            {isDialogShown&&<div className={styles.overlay}>
                <dialog className={styles.dialog} open={isDialogShown} >
                    Are you sure you want to delete this book?
                    <button onClick={deleteBook}>Yes</button>
                    <button>No</button>
                </dialog>
            </div>}


            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.imageAndBtns}>
                        <img src={image} alt="Your Image" />
                        <div className={styles.btns}>
                                {/*//@ts-ignore*/}
                            {book&&!book.ownedBy?.includes(user.userId)&&
                                <Elements stripe={stripePromise}>
                                    <BuyBtn bookId={book._id} />
                                </Elements>
                                // ||user.role!=="admin"
                            }


                            {user.role==="admin"&&
                                <>
                                    <Link to={`/admin/addBook/${book._id}`} className={styles.editBtn}>Edit</Link>
                                    <button onClick={toggleDeleteDialog} className={styles.deleteBtn}>Delete</button>
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
                            {((book.ownedBy as any) || []).includes(user.userId) &&
                                <Link to={`/main/read/${book._id}`} className={styles.readBtn}>Read</Link>
                            }


                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}