
import styles from "./MyBooksList.module.css"
{/*//@ts-ignore*/}
import ContinueBookElement from "../Read/ContinueBookElement/BookElement";

import {useContext, useEffect, useState} from "react";
import {request} from "../../functions";
{/*//@ts-ignore*/}
import BookElement from "../AllBooks/BookElement/BookElement";
import SearchBar from "../SearchBar/SearchBar";
{/*//@ts-ignore*/}
import {Link, useNavigate} from "react-router-dom";
import BookSection from "../BookSection/BookSection";
import Loading from "../Spinner/Loading";
import NoContentSection from "../NoContentSection/NoContentSection";
import {userContext} from "../../redux/StateProvider/StateProvider";
export default function MyBooksList(){


    // const {user} = useSelector((selector:any)=>selector.user)
    {/*// @ts-ignore*/}
    const { userState,setUserState } = useContext(userContext);
    const [reqBooks,setReqBooks] = useState([])
    const [books,setBooks] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [completions,setCompletions] = useState([])
    const [filteredAutoCompletions,setFilteredAutoCompletions] = useState([])
    const [searchParams,setSearchParams] = useState("")
    const [currentReading,setCurrentReading] = useState({
        genre:"",
        author:"",
        name:"",

    })
    const fetchAllBooks = ()=>{
        request("books/all").subscribe(
            (res:any)=>{
                const {allBooks}=res
                setReqBooks(allBooks)
                setBooks(allBooks)
                setCompletions(allBooks.filter((book:any)=>book.isBookOwnedByUser).map((book:any)=>{
                    return {
                        bookId:book._id,
                        bookName:book.name
                    }
                }))
                setFilteredAutoCompletions(allBooks.map((book:any)=>{
                        return {
                            bookId:book._id,
                            bookName:book.name
                        }
                }))
                if(userState.lastReading){
                    setCurrentReading(allBooks.find((book:any)=>book._id.toString() === userState.lastReading.bookId.toString()))
                }
                setIsLoading(false)

            },
            (error:any)=>{
                console.log(error)
            }
        )
    }
    useEffect(()=>{
        fetchAllBooks()
    },[])

    useEffect(()=>{
        changeAutoCompletions()
    },[searchParams])

    const changeAutoCompletions = ()=>{
        const data = completions.filter((completion:any)=>completion.bookName.indexOf(searchParams)==0)
        setFilteredAutoCompletions(data)
    }

    const searchParamsChangeHandler = (e:any)=>{
        const searchParam = e.currentTarget.value
        setBooks(()=>{
            return reqBooks.filter((el:any)=>el.name.toLowerCase().indexOf(searchParam.toLowerCase()) ==0)
        })
        setSearchParams(searchParam)
    }

    const navigate = useNavigate()
    const continueReadingHandler=(e:any)=>{

        {/*//@ts-ignore*/}
        const target = e.currentTarget
        // target.parentElement.textContent = "d"
        // target.classList.add(styles.clicked)
            navigate(`/main/read/${userState.lastReading.bookId}/chapterId=${userState.lastReading.chapterId}`)
        // setTimeout(()=>{
        //     // target.classList.remove(styles.clicked)
        // },1000)

    }



    // @ts-ignore
    // @ts-ignore
    return(
        <>
            {isLoading&&<Loading />}
            <div className={styles.myBooksListWrapperWrapper}>
                <section className={styles.myBooksListWrapper}>
                    <div className={styles.myBooksListC}>
                        <h1 className={styles.heading}>Моята библиотека</h1>
                        {/*<div className={styles.readBookAndMyBooksWrapper}>*/}
                        {/*    <div className={styles.readBookWrapper}>*/}
                        {/*        <div onClick={continueReadingHandler} className={styles.readBookC}>*/}
                        {/*            {currentReading&&*/}
                        {/*                <ContinueBookElement book={currentReading}/>*/}
                        {/*            }*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.myBooksWrapper}>*/}
                        {/*<div className={styles.searchBarC}>*/}
                        {/*    <SearchBar searchParams={searchParams} searchParamsChangeHandler={searchParamsChangeHandler} filteredAutoCompletions={filteredAutoCompletions}/>*/}
                        {/*</div>*/}
                        {/*        <div className={styles.myBooksC}>*/}

                        {/*            <div className={styles.myBooksScrollerWrapper}>*/}
                        {/*                <div className={styles.myBooksScrollerC}>*/}

                        {/*                    {books.length>0&&books.map((book:any)=><Link to={`/main/read/${book._id}/chapterId=${book.chapters[0]}`} key={book._id} className={styles.bookC}>*/}
                        {/*                        <BookElement book ={book} />*/}
                        {/*                    </Link>)}*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {currentReading.genre&&<div className={styles.continueReadingBtnWrapper}>
                            <div onClick={continueReadingHandler} className={styles.buttonFundament}>
                                <div className={styles.btnCore}>
                                    <h6 className={styles.continueHeading}>{currentReading.name}</h6>
                                    <h4 className={styles.continueHeading}>продължете четенето</h4>
                                    <div className={styles.btnCover}>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        

                        <section className={styles.moreOfThisGenreWrapper}>

                                <BookSection areOwnedByUser={true} books={books.filter((book:any)=>book.isBookOwnedByUser)} isSearchChild={true} sectionHeader={"Мои книги"} headerColor={"white"}>
                                    {/*@ts-ignore*/}
                                    <>
                                        {books.filter((book:any)=>book.isBookOwnedByUser).length>0&&<div className={styles.searchBarC}>
                                            <SearchBar searchParams={searchParams} searchParamsChangeHandler={searchParamsChangeHandler} filteredAutoCompletions={filteredAutoCompletions}/>
                                        </div>}
                                        {books.filter((book:any)=>book.isBookOwnedByUser).length===0&&<NoContentSection isWithBtns={true}/>}
                                    </>


                                </BookSection>

                        </section>
                        <section className={styles.moreOfThisGenreWrapper}>
                                <BookSection books={books.filter((book:any)=>book.genre === currentReading.genre&&!book.isBookOwnedByUser)} sectionHeader={"Може да харесате"} headerColor={"white"}>
                                    {/*//@ts-ignore*/}
                                    <NoContentSection/>
                                </BookSection>

                        </section>
                        {currentReading.author&&<section className={styles.moreOfThisGenreWrapper}>
                            <BookSection books={books.filter((book:any)=>book.author === currentReading.author&&!book.isBookOwnedByUser)} sectionHeader={`Още книги от ${currentReading.author}`} headerColor={"white"}>
                                {/*//@ts-ignore*/}
                                <NoContentSection/>
                            </BookSection>
                        </section>}

                        <section className={styles.moreOfThisGenreWrapper}>
                                <BookSection books={books.filter((book:any)=>!book.isBookOwnedByUser)} sectionHeader={`Може да закупите`} headerColor={"white"}>
                                    {/*//@ts-ignore*/}
                                    <NoContentSection/>
                                </BookSection>
                        </section>
                    </div>
                </section>
            </div>

        </>

    )
}