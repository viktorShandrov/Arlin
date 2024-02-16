
import styles from "./MyBooksList.module.css"
import ContinueBookElement from "../Read/ContinueBookElement/BookElement";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {request} from "../../functions";
import BookElement from "../AllBooks/BookElement/BookElement";
import SearchBar from "../SearchBar/SearchBar";
import {Link, useNavigate} from "react-router-dom";
import BookSection from "../BookSection/BookSection";
import Loading from "../Spinner/Loading";
export default function MyBooksList(){


    const {user} = useSelector((selector:any)=>selector.user)

    const [reqBooks,setReqBooks] = useState([])
    const [books,setBooks] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [completions,setCompletions] = useState([])
    const [filteredAutoCompletions,setFilteredAutoCompletions] = useState([])
    const [searchParams,setSearchParams] = useState("")
    const [currentReading,setCurrentReading] = useState({
        genre:"",
        author:"",

    })
    const fetchAllBooks = ()=>{
        request("books/all").subscribe(
            (res:any)=>{
                const {allBooks}=res
                setReqBooks(allBooks)
                setBooks(allBooks)
                setCompletions(allBooks.filter((book:any)=>book.ownedBy.includes(user.userId)).map((book:any)=>{
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
                setCurrentReading(allBooks.find((book:any)=>book._id.toString() === user.lastReading.bookId.toString()))
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
        const target = e.currentTarget
        // target.parentElement.textContent = "d"
        // target.classList.add(styles.clicked)
            navigate(`/main/read/${user.lastReading.bookId}/chapterId=${user.lastReading.chapterId}`)
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
                        <div className={styles.continueReadingBtnWrapper}>
                            <div onClick={continueReadingHandler} className={styles.buttonFundament}>
                                <div className={styles.btnCore}>
                                   <h6 className={styles.continueHeading}>{currentReading.name}</h6>
                                   <h4 className={styles.continueHeading}>продължете четенето</h4>
                                    <div className={styles.btnCover}>

                                    </div>
                                </div>



                            </div>

                        </div>
                        

                        <section className={styles.moreOfThisGenreWrapper}>

                            {books.filter((book:any)=>book.ownedBy.includes(user.userId)).length>0&&
                                <BookSection books={books.filter((book:any)=>book.ownedBy.includes(user.userId))} sectionHeader={"Закупени книги"}>
                                    {/*@ts-ignore*/}
                                    <div className={styles.searchBarC}>
                                        <SearchBar searchParams={searchParams} searchParamsChangeHandler={searchParamsChangeHandler} filteredAutoCompletions={filteredAutoCompletions}/>
                                    </div>
                                </BookSection>
                            }
                        </section>
                        <section className={styles.moreOfThisGenreWrapper}>
                            {books.filter((book:any)=>book.genre === currentReading.genre).length>0&&
                                <BookSection books={books.filter((book:any)=>book.genre === currentReading.genre)} sectionHeader={"Може да харесате"}/>
                            }
                        </section>
                        <section className={styles.moreOfThisGenreWrapper}>
                            {books.filter((book:any)=>book.author === currentReading.author).length>0&&
                                <BookSection books={books.filter((book:any)=>book.author === currentReading.author)} sectionHeader={`Още книги от ${currentReading.author}`}/>
                            }
                        </section>
                    </div>
                </section>
            </div>

        </>

    )
}