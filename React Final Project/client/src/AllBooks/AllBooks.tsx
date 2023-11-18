import styles from "./AllBooks.module.css"
import {useEffect, useState} from "react";
import {request} from "../functions";
import {Link} from "react-router-dom";
import {createLogger} from "vite";

export default function AllBooks(){

    const [reqBooks,setReqBooks] = useState([])
    const [books,setBooks] = useState([])
    const [searchParams,setSearchParams] = useState("")
    const [filterData,setFilterData] = useState({
        authors:[],
        genres:[]
    })
    const [appliedFilters,setAppliedFilters] = useState({
        author:[],
        genre:[],
    })
    useEffect(()=>{
        console.log(appliedFilters)
        setBooks(oldState=>{
                let filteredResult = []

                    const filtered = reqBooks.filter(el=>{
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
    },[appliedFilters])
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
            }
        )
    }

    const getFilteringData = () =>{
        request("books/getDataForFilters",'GET').subscribe(
            (res)=>{
                setFilterData(res)
            }
        )
    }
    useEffect(()=>{
        getAll()
        getFilteringData()
    },[])
    return(
        <>
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
                <div onClick={(e)=>e.currentTarget.setAttribute("data-isiconclicked",true)} className={styles.filterIcon}>
                    <i className="fa-solid fa-filter"></i>
                </div>
                <div className={styles.filterMenu}>

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
                                <input onChange={filterChangeHandler} name={"genre"} type={"checkbox"} />
                                <label>{el}</label>
                            </div>
                        })}
                    </details>
                </div>


            </div>
        </>
    )
}