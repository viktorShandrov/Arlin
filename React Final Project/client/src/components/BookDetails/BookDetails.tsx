import styles from "./BookDetails.module.css"
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {request} from "../../functions";
// import BuyBtn from "../BuyBtn/BuyBtn";
// import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Loading from "../Spinner/Loading";
import BookElement from "../AllBooks/BookElement/BookElement";
import AddtionalInfo from "../AddtionalInfo/AddtionalInfo";
import additional from "../AddtionalInfo/AddtionalInfo.module.css";
import ScrollerContainer from "../ScrollerContainer/ScrollerContainer";
import {setUser} from "../../redux/user";
import Rating from "@mui/material/Rating";

export default function  BookDetails(){
    // @ts-ignore

    const {id} = useParams()
    const additionalInfos = useRef([])
    {/*//@ts-ignore*/}
    const authorDetails = useRef(null)
    const wrapper = useRef(0)
    // @ts-ignore
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const {user} = useContext(userContext)
    // @ts-ignore
    const {user}:any = useSelector((selector:any)=>selector.user)
    const [isDialogShown,setIsDialogShown] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [isFreeBookMode,setIsFreeBookMode] = useState(false)
    const [reviewsLimit,setReviewsLimit] = useState(2)
    const [book,setBook] = useState({
        name:"",
        resume:"",
        author:"",
        length:"",
        isBookOwnedByUser:false,
        isWishedByUser:false,
        _id:"",
        image: "",
        ownedBy:[],
        reviews:[],
        rating:"",
        year:"",
        genre:"",
        difficulty:"",
        similarBooks:[],
        firstChapter: undefined

    })

    useEffect(()=>{
        getBook()
        setReviewsLimit(2)
        scrollToTopSmooth()
        additionalInfoAnimationTrigger()
    },[id])

    const getBook = ()=>{
            request(`books/${id}/details`,"GET").subscribe(
                async (res:any)=>{
                    const dateString = res.book.releaseDate;
                    const date = new Date(dateString);
                    const year = date.getFullYear();
                    setBook({...res.book,year})
                    setIsLoading(false)
                    setIsFreeBookMode(window.location.href.includes("freeBookMode"))
                    },
            )
    }

    const deleteBook = ()=>{
        request(`books/${book._id}/delete`,"GET").subscribe(
            ()=>{
                toast.success("Успешно изтрита")
            }
        )
    }
    const getBookForFree = () =>{
        request(`books/${book._id}/getForFree`,"GET").subscribe(
            ()=>{
                toast.success("Книгата успешно е добавена в профила Ви")
                setBook({...book,isBookOwnedByUser: true})
                navigate("/main/AllBooks/"+book._id)
                dispatch(setUser({...user,inventory:{...user.inventory,freeBook: user.inventory.freeBook-1}}))
            }
        )
    }
    // @ts-ignore
    const toggleDeleteDialog=()=>{
        setIsDialogShown((oldState:boolean)=>!oldState)
    }

    function scrollToTopSmooth() {
        // @ts-ignore
        wrapper.current.scrollTop = 0;
    }
    // const setAuthorDetails = ()=>{
    //     // @ts-ignore
    //     if(authorDetails.current.classList.contains(styles.closed)){
    //         // @ts-ignore
    //         authorDetails.current.classList.remove(styles.closed)
    //     }else{
    //         // @ts-ignore
    //         authorDetails.current.classList.add(styles.closed)
    //     }
    // }

    function additionalInfoAnimationTrigger(){
        // @ts-ignore
        wrapper.current.addEventListener("scroll",()=>{
            for (const additionalInfo of additionalInfos.current) {
                if(!additionalInfo) continue
                // @ts-ignore
                const position = additionalInfo.getBoundingClientRect();
                // Check if the element is in the viewport
                if (position.top < window.innerHeight-200 && position.bottom >= 0) {
                    // @ts-ignore
                    additionalInfo.classList.add(additional.fadeIn);
                }
            }
        })
    }
    const wishBtnClickHandler = () =>{
        request(`books/${book._id}/addOrRemoveFromWishlist`,"GET").subscribe(
            (res:any)=>{
                setBook({...book,isWishedByUser: res.isWishedByUser})
            }
        )
    }
    const likeReviewBtnClickHandler = (reviewId:any) =>{
        request(`books/${book._id}/${reviewId}/likeOrDislikeFeedback`,"GET").subscribe(
            (res:any)=>{
                const reviewIndex = book.reviews.findIndex((review:any)=>review._id===reviewId)
                const updatedReviews = [...book.reviews]
                {/*//@ts-ignore*/}
                updatedReviews[reviewIndex] = {...updatedReviews[reviewIndex],isLikedByUser:res.isLikedByUser}
                setBook({...book,reviews: updatedReviews})
            }
        )
    }
    const buyBook = () =>{
        request(`stripe/create-checkout-session`,"POST",{bookId:book._id}).subscribe(
            async (res:any)=>{
                const stripe = await loadStripe('pk_test_51OEwwSAPrNaPFyVRyPTVcpxfNfy2RJiSVgl3frnwPgKe2tQZhlOVVz5PCvVN8nqoEyT2HwarufbQcoQzNy1giqkg00bLGKyRr4');
                {/*//@ts-ignore*/}
                stripe.redirectToCheckout({ sessionId: res.id })
            }
        )
    }
    const readBtnClickHandler = ()=>{
        navigate(`/main/read/${book._id}/chapterId=${book.firstChapter}`)

    }






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
            {/*// @ts-ignore*/}
                <div ref={wrapper} className={styles.bookDetailsWrapper}>
                    <section className={styles.bookNameAndRating}>
                        <h1 className={styles.bookName}>{book.name}</h1>
                        <div className={styles.ratingC}>
                            <h4 className={styles.rating}>{book.rating}<i className="fa-solid fa-star"></i></h4>
                        </div>
                    </section>


                    <section className={styles.bookImageAndResume}>
                        <article className={styles.image}>
                            <img src={book.image||"/chapter.jpg"} alt=""/>
                            <div className={styles.adminBtnsC}>
                                {/*<button onClick={()=>navigate(`/admin/addBook/${book._id}`)}  className={styles.adminBtn}>Редактирай</button>*/}
                                {/*<button onClick={toggleDeleteDialog} className={styles.adminBtn}>Изтрий</button>*/}
                            </div>
                            <div
                                onClick={wishBtnClickHandler}
                                className={styles.wishBtnIcon}
                                style={{
                                    color: book.isWishedByUser?"red":"black"
                                }}
                            >
                                <i className="fa-solid fa-heart"></i>
                            </div>

                        </article>
                        <article className={styles.resumeAndBtns}>
                            <p className={styles.resume}>
                                <h5 className={styles.resumeHeading}>Резюме на книгата:</h5>
                                {book.resume}
                            </p>

                            {book&&book.isBookOwnedByUser&&<div className={styles.btns}>
                                <button onClick={readBtnClickHandler} className={styles.readBtn}>прочети</button>
                            </div>}

                            {book&&!book.isBookOwnedByUser&&<div className={styles.btns}>
                                <button onClick={readBtnClickHandler} className={styles.btn}>надникни</button>
                                {!isFreeBookMode&&<button onClick={buyBook} className={styles.btn}>КУПИ</button>}
                                {isFreeBookMode&&<button onClick={getBookForFree} className={styles.btn}>ВЗEМИ БЕЗПЛАТНО</button>}
                            </div>}

                        </article>
                    </section>


                    <section className={styles.bookDetailsTableWrapper}>
                        <div className={styles.bookDetailsTable}>
                            <section  className={styles.row}>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        Автор
                                    </h4>
                                </div>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        {book.author}
                                    </h4>
                                    {/*<button className={styles.showMoreInfoBtn}>Повече</button>*/}
                                </div>

                            </section>
                            {/*<section ref={authorDetails} className={styles.row}>*/}
                            {/*    <div className={styles.cell}>*/}
                            {/*        <img src="/viktior.jpg.jpg" alt=""/>*/}
                            {/*    </div>*/}
                            {/*    <div className={styles.cell}>*/}
                            {/*        <p className={`${styles.tableHeading} ${styles.authorDesc}`}>*/}
                            {/*            Sir Edward Victor Appleton GBE KCB FRS[1] (6 September 1892 – 21 April 1965) was an English physicist,[4][5] Nobel Prize winner (1947) and pioneer in radiophysics. He studied, and was also employed as a lab technician, at Bradford College from 1909 to 1911.*/}
                            {/*        </p>*/}
                            {/*    </div>*/}

                            {/*</section>*/}
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        Жанр
                                    </h4>
                                </div>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        {book.genre}
                                    </h4>
                                </div>
                            </section>
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        Брой глави
                                    </h4>
                                </div>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        {book.length}
                                    </h4>
                                </div>
                            </section>
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        Трудност
                                    </h4>
                                </div>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        {book.difficulty||"няма зададена трудност"}
                                    </h4>
                                </div>
                            </section>
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        Година
                                    </h4>
                                </div>
                                <div className={styles.cell}>
                                    <h4 className={styles.tableHeading}>
                                        {book.year}
                                    </h4>
                                </div>
                            </section>
                        </div>
                    </section>
                    {/*<section className={styles.freeChaptersBtnAndReadBtnWrapper}>*/}
                    {/*    <div className={styles.freeChaptersBtnAndReadBtnC}>*/}
                    {/*        {<button  className={styles.btn}>виж съдържание на книгата</button>}*/}
                    {/*        {book.isBookOwnedByUser&&<button  className={styles.btn}>прочети</button>}*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                    <section className={styles.feedbackWrapper}>
                        <div className={styles.feedbackC}>
                            <h2 className={styles.feedbackCHeading}>Мнения от потребители</h2>
                            {book.reviews.length===0&&<div className={styles.noContentInThisSectionWrapper}>
                                <div className={styles.noContentInThisSectionC}>
                                    <h5>Няма съдържание за тази секция</h5>
                                </div>
                            </div>}

                            <div className={styles.feedbacksC}>
                                {book.reviews.length>0&&book.reviews.slice(0,reviewsLimit).map((review:any)=>
                                        <article className={styles.feedback}>
                                            <div className={`${styles.userInfo} ${!review.text?styles.noText:null}`}>
                                                <div className={styles.pictureC}>
                                                    <img src={review.writtenBy.imageURL} alt="Снимка на потребител"/>
                                                </div>
                                                <h5 className={styles.userName}>{review.writtenBy.username}</h5>
                                                <Rating name="read-only" value={review.stars} readOnly />
                                            </div>
                                            {review.text&&<div className={styles.feedBackInfo}>
                                                <p className={styles.message}>
                                                    {review.text}
                                                </p>
                                            </div>}
                                            <div
                                                onClick={()=>likeReviewBtnClickHandler(review._id)}
                                                className={`${styles.likeBtnIcon}`}
                                                style={{
                                                    color: review.isLikedByUser?"#008eff":"black",
                                                    // border:`solid 4px ${review.isLikedByUser?"#008eff":"black"}` ,
                                                }}
                                            >
                                                <i className="fa-solid fa-thumbs-up"></i>
                                            </div>
                                        </article>
                                )}
                                {book.reviews.length>reviewsLimit&&<button onClick={()=>setReviewsLimit(book.reviews.length+1)} className={`${styles.showMoreBtn} ${styles.btn}`}>Покажи повече</button>}
                            </div>
                        </div>
                    </section>

                    {book.similarBooks.length>0&&<section  className={styles.moreBooksWrapper}>
                        <h1 className={styles.moreOfThisGenre}>Още от този жанр</h1>
                        <ScrollerContainer>
                            {book.similarBooks.map((book:any)=>
                                <Link to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>
                                    <BookElement book={book}  />
                                </Link>
                            ) }
                        </ScrollerContainer>

                    </section>}


                    <section className={styles.helpfulInformationWrapper}>
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={"Четенето на книги е като пътешествие, където твоят мозък е изследовател. Страници са магични портали към светове на знание, които разгръщат пред теб богатство от идеи. Когато се потапяш в думите, мозъкът ти танцува със сюжетите, създавайки креативен фойерверк от асоциации. Този умствен танц подобрява запомнянето, като го правиш гъвкав и силен. В света на книгите, всяка страница е тренировка за интелекта, а читателят става състезател на умове, готов да преодолява интелектуални върхове. 📚🌟" }
                        />
                    </section>



                </div>



            {/*<div className={styles.wrapper}>*/}
            {/*    <div className={styles.container}>*/}
            {/*        <div className={styles.imageAndBtns}>*/}
            {/*            <img src={image} alt="Your Image" />*/}
            {/*            <div className={styles.btns}>*/}
                                {/*//@ts-ignore*/}
            {/*                {book&&!book.ownedBy?.includes(user.userId)&&*/}
            {/*                    <Elements stripe={stripePromise}>*/}
            {/*                        <BuyBtn bookId={book._id} />*/}
            {/*                    </Elements>*/}
            {/*                    // ||user.role!=="admin"*/}
            {/*                }*/}


            {/*                {user.role==="admin"&&*/}
            {/*                    <>*/}
            {/*                        <Link to={`/admin/addBook/${book._id}`} className={styles.editBtn}>Edit</Link>*/}
            {/*                        <button onClick={toggleDeleteDialog} className={styles.deleteBtn}>Delete</button>*/}
            {/*                    </>*/}
            {/*                }*/}

            {/*            </div>*/}

            {/*        </div>*/}
            {/*        <div className={styles.detailsAndBtns}>*/}
            {/*            <div className={styles.details}>*/}
            {/*                <div className={styles.leftAndRightC}>*/}
            {/*                    <div className={styles.left}>*/}
            {/*                        <h2 className={styles.bookName}>Name:</h2>*/}
            {/*                        <h2 className={styles.bookName}>Author:</h2>*/}
            {/*                        <h2 className={styles.chaptersCount}>Chapters count:</h2>*/}
            {/*                    </div>*/}
            {/*                    <div className={styles.right}>*/}
            {/*                        <h2 className={styles.bookName}>{book.name}</h2>*/}
            {/*                        <h2 className={styles.bookName}>{book.author}</h2>*/}
            {/*                        <h2 className={styles.bookName}>{book.length}</h2>*/}
            {/*                    </div>*/}
            {/*                </div>*/}


            {/*                <p className={styles.resume}>{book.resume}</p>*/}
            {/*            </div>*/}
            {/*            <div className={styles.btns}>*/}
            {/*                <button className={styles.seeFreeChaptersBtn}>See free chapters</button>*/}
            {/*                {((book.ownedBy as any) || []).includes(user.userId) &&*/}
            {/*                    <Link to={`/main/read/${book._id}`} className={styles.readBtn}>Read</Link>*/}
            {/*                }*/}


            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}

            {/*</div>*/}
        </>
    )
}