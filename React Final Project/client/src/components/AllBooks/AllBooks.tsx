import styles from "./AllBooks.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
// import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Loading from "../Spinner/Loading";
// import BookElement from "./BookElement/BookElement";
import SearchBar from "../SearchBar/SearchBar";
import BookSection from "../BookSection/BookSection";
import Popup from "../Popup/Popup";
import {useNavigate} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import NoContentSection from "../NoContentSection/NoContentSection";
export default function AllBooks(){

    const [reqBooks,setReqBooks] = useState([])
    const [books,setBooks] = useState([])
    const [completions,setCompletions] = useState([])
    const [filteredAutoCompletions,setFilteredAutoCompletions] = useState([])
    const [isFilterPanelShown,setIsFilterPanelShown] = useState(false)
    const [isOwnedFilter,setIsOwnedFilter] = useState(false)
    const [isFreeBookModePopupVisible,setIsFreeBookModePopupVisible] = useState(false)
    const [searchParams,setSearchParams] = useState("")
    const [filterData,setFilterData] = useState({
        authors:[],
        genres:[]
    })
    const [isLoading,setIsLoading] = useState(false)

    const [appliedFilters,setAppliedFilters] = useState({
        author:[],
        genre:[],
    })
    const {user} = useSelector((selector:any)=>selector.user)
    const navigate = useNavigate()
    useEffect(()=>{
        getAll()
        getFilteringData()
        const isFreeBookMode = window.location.href.slice(window.location.href.lastIndexOf("/")+1)==="freeBookMode"
        setIsFreeBookModePopupVisible(isFreeBookMode)
    },[])
    useEffect(()=>{
        changeAutoCompletions()
    },[searchParams])
    useEffect(()=>{
        filterByFilters()
    },[appliedFilters])
    const clearFilters = ()=>{
        setAppliedFilters(()=>{
            return{
                author:[],
                genre:[],
            }

        })
    }
    const filterByFilters = ()=>{
        setBooks(()=>{
            let filteredResult:any = []

            let data = reqBooks
            if(isOwnedFilter){
                data = data.filter((el:any)=>el.isBookOwnedByUser)
            }

            const filtered = data.filter(el=>{
                const results = []
                for (const filter of Object.keys(appliedFilters)) {
                    //author,genre ...
                    // @ts-ignore
                    for (const filterValue of appliedFilters[filter]) {
                        results.push(el[filter]===filterValue)
                    }

                }
                return results.every(el=>el===true)

            })

            filteredResult.push(...filtered)





            if(filteredResult.length===0&&Object.values(appliedFilters).every(el=>el.length===0)){
                filteredResult = reqBooks
            }
            return filteredResult
        })
    }
    const filterChangeHandler = (e:any)=>{
        setAppliedFilters(oldState=>{
            const filterValue = e.target.parentElement.getAttribute("data-filterValue")
            const propName = [e.target.parentElement.parentElement.getAttribute("data-filter")]
            if(e.target.checked){

                return {
                    ...oldState,
                // @ts-ignore
                    [propName]: appliedFilters[propName].includes(filterValue)?[...appliedFilters[propName]]:[...appliedFilters[propName],filterValue]
                }
            }else{
                // @ts-ignore
                const index = appliedFilters[propName].indexOf(filterValue)
                // @ts-ignore
                appliedFilters[propName].splice(index,1)

                return {
                    ...oldState,
                    // @ts-ignore
                    [propName]: appliedFilters[propName]
                }
            }

        })





    }
    const searchParamsChangeHandler = (e:any)=>{
        const searchParam = e.currentTarget.value
        setBooks(()=>{
            return reqBooks.filter((el:any)=>el.name.toLowerCase().indexOf(searchParam.toLowerCase()) ==0)
        })
        setSearchParams(searchParam)
    }
     const getAll = ()=>{
         setIsLoading(true)
        request("books/all","GET").subscribe(
            (res:any)=>{
                setReqBooks(res.allBooks)
                setBooks(res.allBooks)
                setCompletions(res.allBooks.map((book:any)=>{
                    return {
                        bookId:book._id,
                        bookName:book.name
                    }
                }))
                setFilteredAutoCompletions(res.allBooks.map((book:any)=>{
                    return {
                        bookId:book._id,
                        bookName:book.name
                    }
                }))
                setIsLoading(false)
            }
        )

    }

    const getFilteringData = () =>{
        request("books/getDataForFilters",'GET').subscribe(
            (res:any)=>{
                const data = res
                for (const filter of Object.values(data)) {
                    // @ts-ignore
                    for (const filterValue of filter) {
                        data[filterValue] = false

                    }
                }
                setFilterData(data)
            }
        )
    }

    const ownedFilterClickHandler = ()=>{
            setIsOwnedFilter((oldValue)=>!oldValue)
    }
    const changeAutoCompletions = ()=>{
        const data = completions.filter((completion:any)=>completion.bookName.indexOf(searchParams)==0)
        console.log(data)
        setFilteredAutoCompletions(data)
    }
    const deactivateFreeBookMode = () =>{
        setIsFreeBookModePopupVisible(false)
        navigate("/main/AllBooks")
    }



    // @ts-ignore
    return(
            <>
                {isLoading&&<Loading />}
            <div className={styles.wrapper}>

                {isFreeBookModePopupVisible&&<Popup hidePopup={()=>setIsFreeBookModePopupVisible(false)} styleSelector={styles.popupWrapper}>
                    <div className={styles.infoContainer}>
                        <i className={`${styles.info} fa-solid fa-info`}></i>
                        <div className={styles.infoTextAmdBtns}>
                            <h5 className={styles.infoText}>следващата книга, която изберете ще можете да вземете безплатно</h5>
                            <div className={styles.btns}>
                                <button onClick={()=>setIsFreeBookModePopupVisible(false)}>продължи</button>
                                <button onClick={deactivateFreeBookMode}>деактивиране</button>
                            </div>


                        </div>
                    </div>
                </Popup> }

                <div className={styles.searchAndFilterNavWrapper}>
                    <div onClick={()=>setIsFilterPanelShown(true)} className={styles.filterIcon}>
                        <i className="fa-solid fa-filter"></i>
                    </div>
                    <div className={styles.searchBarCWrapper}>
                        <SearchBar searchParams={searchParams} searchParamsChangeHandler={searchParamsChangeHandler} filteredAutoCompletions={filteredAutoCompletions}/>
                    </div>
                </div>





                <div className={styles.bookWrapper}>

                                {/*{!books.length>0&&books.map((book:any)=>{*/}
                                {/*    if(isOwnedFilter&&book.ownedBy.includes(user.userId)){*/}
                                {/*        return <Link  data-isowned={book.ownedBy.includes(user.userId)} to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>*/}
                                {/*            <BookElement book ={book} />*/}
                                {/*        </Link>*/}
                                {/*    }else if(!isOwnedFilter){*/}

                                {/*        return <Link  data-isowned={book.ownedBy.includes(user.userId)} to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>*/}
                                {/*            <BookElement  book ={book} />*/}
                                {/*        </Link>*/}
                                {/*    }*/}
                                {/*})}*/}

                    {/**/}
                        <BookSection books={books.filter((book:any)=>book.isBookOwnedByUser)} sectionHeader={"Мои книги"}>
                            <NoContentSection isWithBtns={true}/>
                        </BookSection>

                        <BookSection books={books.filter((book:any)=>book.isRecommended&&!book.isBookOwnedByUser)} sectionHeader={"Препоръчани"}>
                            <NoContentSection/>
                        </BookSection>

                        <BookSection books={books.filter((book:any)=>book.wishedBy?.includes(user.userId)&&!book.isBookOwnedByUser)} sectionHeader={"В списъка с желания"}>
                            <NoContentSection/>
                        </BookSection>
                        <BookSection books={books.filter((book:any)=>!book.isBookOwnedByUser)} sectionHeader={"Всички книги, които нямате"}>
                            <NoContentSection/>
                        </BookSection>

                    <BookSection books={books} sectionHeader={"Абсолютно всички книги"}/>




                </div>



                {isFilterPanelShown&&<div className={styles.filterMenu}>
                    <i  onClick={()=>setIsFilterPanelShown(false)} className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                    {/*<input onChange={ownedFilterClickHandler}  type={"checkbox"} />*/}
                    {/*<label>Купена</label>*/}
                    <details className={styles.detailsC} data-filter={"author"}>
                        <summary>Автор</summary>
                        {filterData.authors&&filterData.authors.length>0&&filterData.authors.map((el,index)=>{
                            return <article data-filtervalue={el} key={index} className={styles.pair}>
                                <input onChange={filterChangeHandler} name={"author"} checked={appliedFilters["author"].includes(el)} className={styles.filterInput} type={"checkbox"} />
                                <label className={styles.filterLabel}>{el}</label>
                            </article>
                        })}
                    </details>
                    <details className={styles.detailsC} data-filter={"genre"}>
                        <summary>Жанр</summary>
                        {filterData.genres&&filterData.genres.length>0&&filterData.genres.map((el,index)=>{
                            return <article data-filtervalue={el} key={index} className={styles.pair}>
                                <input value={filterData[el]} onChange={filterChangeHandler} name={"genre"} checked={appliedFilters["genre"].includes(el)} className={styles.filterInput} type={"checkbox"} />
                                <label className={styles.filterLabel}>{el}</label>
                            </article>
                        })}
                    </details>
                     <button className={styles.clearFiltersBtn} onClick={clearFilters}>Изчисти</button>
                </div>}



            </div>
        </>
    )
}
