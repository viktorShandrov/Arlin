import styles from "./BookDetails.module.css"
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {request} from "../../functions";
import BuyBtn from "../BuyBtn/BuyBtn";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import Loading from "../Spinner/Loading";
import BookElement from "../AllBooks/BookElement/BookElement";
import AddtionalInfo from "../AddtionalInfo/AddtionalInfo";
import additional from "../AddtionalInfo/AddtionalInfo.module.css";
import ScrollerContainer from "../ScrollerContainer/ScrollerContainer";

export default function  BookDetails(){

    const stripePromise = loadStripe('pk_test_51OEwwSAPrNaPFyVRyPTVcpxfNfy2RJiSVgl3frnwPgKe2tQZhlOVVz5PCvVN8nqoEyT2HwarufbQcoQzNy1giqkg00bLGKyRr4');

    const {id} = useParams()
    const additionalInfos = useRef([])
    const wrapper = useRef(0)
    const navigate = useNavigate()

    // const {user} = useContext(userContext)
    const {user}:any = useSelector((selector:any)=>selector.user)
    const [isDialogShown,setIsDialogShown] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [book,setBook] = useState({
        name:"",
        resume:"",
        author:"",
        length:"",
        isBookOwnedByUser:false,
        _id:"",
        image: "",
        ownedBy:[],
        similarBooks:[]
    })


    const getBook = ()=>{
            request(`books/${id}/details`,"GET").subscribe(
                async (res:any)=>{
                    const dateString = res.book.releaseDate;
                    const date = new Date(dateString);
                    const year = date.getFullYear();
                    setBook({...res.book,year})
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

    function scrollToTopSmooth() {
        wrapper.current.scrollTop = 0;
    }


    useEffect(()=>{
        getBook()
        scrollToTopSmooth()
        additionalInfoAnimationTrigger()
    },[id])
    function additionalInfoAnimationTrigger(){
        wrapper.current.addEventListener("scroll",()=>{
            for (const additionalInfo of additionalInfos.current) {
                if(!additionalInfo) continue
                const position = additionalInfo.getBoundingClientRect();
                // Check if the element is in the viewport
                if (position.top < window.innerHeight-200 && position.bottom >= 0) {
                    additionalInfo.classList.add(additional.fadeIn);
                }
            }
        })
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
                <div ref={wrapper} className={styles.bookDetailsWrapper}>
                    <section className={styles.bookNameAndRating}>
                        <h1 className={styles.bookName}>{book.name}</h1>
                        <div className={styles.ratingC}>
                            <h1 className={styles.rating}>{book.rating}/10</h1>
                        </div>
                    </section>

                    <section className={styles.resumeAndBookImage}>
                        <div className={styles.resumeWrapper}>
                            <div className={styles.resume}>
                                <p>{book.resume}</p>
                            </div>
                        </div>
                        <div className={styles.bookImageWrapper}>
                            <div className={styles.bookImageC}>
                                <div className={styles.image}>
                                    <img src={book.image||"../../../public/chapter.jpg"} alt=""/>
                                </div>
                                <div className={styles.btns}>
                                    <button onClick={()=>navigate(`/admin/addBook/${book._id}`)} className={`${styles.btn} ${styles.editBtn}`}>
                                            Редактирай
                                    </button>
                                    <button onClick={toggleDeleteDialog} className={`${styles.btn} ${styles.deleteBtn}`}>
                                        Изтрий
                                    </button>
                                    <button className={`${styles.btn} ${styles.buyBtn}`}>
                                        Купи
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.bookDetailsTableWrapper}>
                        <div className={styles.bookDetailsTable}>
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        Автор
                                    </h2>
                                </div>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        {book.author}
                                    </h2>
                                </div>

                            </section>
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        Жанр
                                    </h2>
                                </div>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        {book.genre}
                                    </h2>
                                </div>
                            </section>
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        Брой глави
                                    </h2>
                                </div>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        {book.length}
                                    </h2>
                                </div>
                            </section>
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        Трудност
                                    </h2>
                                </div>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        {book.difficalty||"няма зададена трудност"}
                                    </h2>
                                </div>
                            </section>
                            <section className={styles.row}>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        Година
                                    </h2>
                                </div>
                                <div className={styles.cell}>
                                    <h2 className={styles.tableHeading}>
                                        {book.year}
                                    </h2>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section className={styles.freeChaptersBtnAndReadBtnWrapper}>
                        <div className={styles.freeChaptersBtnAndReadBtnC}>
                            {<button  className={styles.btn}>виж съдържание на книгата</button>}
                            {book.isBookOwnedByUser&&<button  className={styles.btn}>прочети</button>}
                        </div>
                    </section>

                    <section className={styles.feedbackWrapper}>
                        <div className={styles.feedbackC}>
                            <h2 className={styles.feedbackCHeading}>Мнения от потребители</h2>
                            <div className={styles.feedbacksC}>
                                <article className={styles.feedback}>
                                    <div className={styles.pictureAndName}>
                                        <div className={styles.picture}>
                                            <img src="../../../public/user.jpg" alt=""/>
                                        </div>
                                        <h5 className={styles.userName}>Надя Иванова</h5>
                                    </div>
                                    <p className={styles.message}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid architecto aspeea earum error eveniet ex molestias numquam, pers
                                        , corporis delectus, distinctio dolor doloremque excepturi harum molestiae mollitia pariatur porro reiciendis repellat rerum similique! Consequatu
                                    </p>
                                </article>
                                <article className={styles.feedback}>
                                    <div className={styles.pictureAndName}>
                                        <div className={styles.picture}>
                                            <img src="../../../public/user.jpg" alt=""/>
                                        </div>
                                        <h5 className={styles.userName}>Надя Иванова</h5>
                                    </div>
                                    <p className={styles.message}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid architecto aspeea earum error eveniet ex molestias numquam, pers
                                        , corporis delectus, distinctio dolor doloremque excepturi harum molestiae mollitia pariatur porro reiciendis repellat rerum similique! Consequatu
                                    </p>
                                </article>
                                <button className={`${styles.showMoreBtn} ${styles.btn}`}>Покажи повече</button>
                            </div>
                        </div>
                    </section>

                    <section  className={styles.moreBooksWrapper}>
                        <h1 className={styles.moreOfThisGenre}>Още от този жанр</h1>
                        <ScrollerContainer>
                            {book.similarBooks.length>0&&book.similarBooks.map(book=>
                                <Link to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>
                                    <BookElement book={book}  />
                                </Link>
                                ) }{book.similarBooks.length>0&&book.similarBooks.map(book=>
                                <Link to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>
                                    <BookElement book={book}  />
                                </Link>
                                ) }
                        </ScrollerContainer>

                    </section>

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