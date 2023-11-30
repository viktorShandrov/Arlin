import styles from "./AllBooks.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
export default function AllBooks(){

    const [reqBooks,setReqBooks] = useState([])
    const [books,setBooks] = useState([])
    const [completions,setCompletions] = useState([])
    const [filteredAutoCompletions,setFilteredAutoCompletions] = useState([])
    const [isOwnedFilter,setIsOwnedFilter] = useState(false)
    const [searchParams,setSearchParams] = useState("")
    const [filterData,setFilterData] = useState({
        authors:[],
        genres:[]
    })
    const [appliedFilters,setAppliedFilters] = useState({
        author:[],
        genre:[],
    })
    const {user} = useSelector((selector)=>selector.user)
    useEffect(()=>{
        filterByFilters()
    },[appliedFilters])
    const filterByFilters = ()=>{
        setBooks(oldState=>{
            let filteredResult = []

            let data = reqBooks
            if(isOwnedFilter){
                data = data.filter(el=>el.ownedBy.includes(user.userId))
            }

            const filtered = data.filter(el=>{
                const results = []
                for (const filter of Object.keys(appliedFilters)) {
                    //author,genre ...
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
    const filterChangeHandler = (e)=>{
        setAppliedFilters(oldState=>{
            const filterValue = e.target.parentElement.getAttribute("data-filterValue")
            const propName = [e.target.parentElement.parentElement.getAttribute("data-filter")]
            if(e.target.checked){

                return {
                    ...oldState,
                    [propName]: appliedFilters[propName].includes(filterValue)?[...appliedFilters[propName]]:[...appliedFilters[propName],filterValue]
                }
            }else{
                const index = appliedFilters[propName].indexOf(filterValue)

                appliedFilters[propName].splice(index,1)

                return {
                    ...oldState,
                    [propName]: appliedFilters[propName]
                }
            }

        })





    }
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
                setCompletions(res.allBooks.map((book)=>{
                    return {
                        bookId:book._id,
                        bookName:book.name
                    }
                }))
            }
        )
    }

    const getFilteringData = () =>{
        request("books/getDataForFilters",'GET').subscribe(
            (res)=>{
                const data = res
                for (const filter of Object.values(data)) {
                    for (const filterValue of filter) {
                        data[filterValue] = false

                    }
                }
                setFilterData(data)
            }
        )
    }
    const ownedFilterClickHandler = (e)=>{
            setIsOwnedFilter((oldValue)=>!oldValue)
    }
    const changeAutoCompletions = ()=>{
        const data = completions.filter(completion=>completion.bookName.indexOf(searchParams)==0)
        console.log(data)
        setFilteredAutoCompletions(data)
    }

    useEffect(()=>{
        getAll()
        getFilteringData()
    },[])
    useEffect(()=>{
        changeAutoCompletions()
    },[searchParams])
    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.searchBarWrapper}>
                    <div className={styles.searchBarC}>
                        <input value={searchParams} onChange={searchParamsChangeHandler} placeholder={"Search here"}  />
                        <div className={styles.autoCompletionC}>
                            {filteredAutoCompletions.length>0&&filteredAutoCompletions.map((completion)=>{
                                return <div key={completion.bookId} className={styles.autoCompletion}>
                                    <p className={styles.completion}>{completion.bookName}</p>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
                <div className={styles.bookWrapper}>
                    <div className={styles.booksC}>
                        {books.length>0&&books.map((book)=>{


                            if(isOwnedFilter&&book.ownedBy.includes(user.userId)){
                                return <Link data-isowned={book.ownedBy.includes(user.userId)} to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>
                                    <img src={"/public/chapter.jpg"}></img>
                                    <h3 className={styles.heading}>{book.name}</h3>
                                    <h3 className={styles.heading}>{book.author}</h3>
                                    <h3 className={styles.heading}>{book.genre}</h3>
                                </Link>
                            }else if(!isOwnedFilter){
                                return <Link data-isowned={book.ownedBy.includes(user.userId)} to={`/main/AllBooks/${book._id}`} key={book._id} className={styles.bookC}>
                                    <img src={"/public/chapter.jpg"}></img>
                                    <h3 className={styles.heading}>{book.name}</h3>
                                    <h3 className={styles.heading}>{book.author}</h3>
                                    <h3 className={styles.heading}>{book.genre}</h3>
                                </Link>
                            }



                        })}


                    </div>
                </div>
                <div onClick={(e)=>e.currentTarget.setAttribute("data-isiconclicked",true)} className={styles.filterIcon}>
                    <i className="fa-solid fa-filter"></i>
                </div>
                <div className={styles.filterMenu}>
                    <input onChange={ownedFilterClickHandler}  type={"checkbox"} />
                    <label>Купена</label>
                    <details data-filter={"author"}>
                        <summary>Автор</summary>
                        {filterData.authors&&filterData.authors.length>0&&filterData.authors.map((el,index)=>{
                            return <div data-filtervalue={el} key={index} className={styles.pair}>
                                <input onChange={filterChangeHandler} name={"author"} type={"checkbox"} />
                                <label>{el}</label>
                            </div>
                        })}
                    </details>
                    <details data-filter={"genre"}>
                        <summary>Жанр</summary>
                        {filterData.genres&&filterData.genres.length>0&&filterData.genres.map((el,index)=>{
                            return <div data-filtervalue={el} key={index} className={styles.pair}>
                                <input value={filterData[el]} onChange={filterChangeHandler} name={"genre"} type={"checkbox"} />
                                <label>{el}</label>
                            </div>
                        })}
                    </details>
                </div>


            </div>
        </>
    )
}