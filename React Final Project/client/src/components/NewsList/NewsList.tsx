import styles from "./NewsList.module.css"
import {useEffect, useRef, useState} from "react";
import {request} from "../../functions";
import News from "../LandingPage/News/News";
import Loading from "../Spinner/Loading";
import {Link} from "react-router-dom";
import ScrollerContainer from "../ScrollerContainer/ScrollerContainer";
export default function NewsList(){
    const [news,setNews] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const categoriesWrapper = useRef(null)
    const tagsWrapper = useRef(null)
    useEffect(()=>{
        request("news/all","GET").subscribe(
            (res:any)=>{

                setNews(res.news)
                setIsLoading(false)
            }
        )
    },[])
    const menuClickHandler= (ref:any)=>{
        ref.current.classList.add(styles.clicked)
    }
    const closeMenuClickHandler= (ref:any)=>{
        ref.current.classList.remove(styles.clicked)
    }
    const categories = [
        "Politics",
        "World News",
        "Business",
        "Technology",
        "Science",
        "Health",
        "Environment",
        "Education",
        "Arts and Culture",
        "Sports",
        "Entertainment",
        "Lifestyle",
        "Travel",
        "Food and Drink",
        "Fashion",
        "Religion",
        "Crime and Justice",
        "Weather",
        "Human Rights",
        "Social Issues",
        "Economy",
        "Finance",
        "Innovation",
        "Startups",
        "Gadgets",
        "Cybersecurity",
        "Space Exploration",
        "Medicine",
        "Mental Health",
        "Wildlife",
        "Conservation",
]

    return (
        <>
            {isLoading&&<Loading/>}
            <div className={styles.categoriesList}>
                <ul className={styles.categoryBtnsC}>
                    <ScrollerContainer>
                        {categories.map(cat=><li className={styles.categoryBtn}> <h6>{cat}</h6> </li>)}
                    </ScrollerContainer>
                </ul>
            </div>

            <div className={styles.newsWrapper}>
                <div onClick={()=>menuClickHandler(categoriesWrapper)} className={styles.catsMenuBtn}>
                    <i className="fa-solid fa-layer-group"></i>
                </div>
                <section onClick={()=>closeMenuClickHandler(categoriesWrapper)} ref={categoriesWrapper}  className={styles.categoriesWrapperOverlay}>
                    <div   className={styles.categoriesWrapper}>
                        <i  className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                        <h4 className={styles.label}>Categories</h4>
                        <ul className={styles.categoriesList}>
                            {categories.map((cat:any)=>
                                <li className={styles.category}>
                                    <Link to={"kat"}>
                                        <h6 className={styles.catName}>{cat}</h6>
                                    </Link>
                                </li>)
                            }

                        </ul>
                    </div>
                </section>

                <section className={styles.newsAndTopNews}>
                    <div className={styles.newsContainer}>
                        <div className={styles.topNews}>

                            {news.length>0&&<div className={styles.newsElement}>
                                <News isTop={true} newsElement={news[0]}/>
                            </div>}
                        </div>
                        {news.length>0&&news.map((el:any)=>
                            <div className={styles.newsElement}>
                                <News key={el._id} newsElement={el}/>
                            </div>

                        )}
                    </div>
                </section>

                <div onClick={()=>menuClickHandler(tagsWrapper)} className={styles.tagsMenuBtn}>
                    <i className="fa-solid fa-hashtag"></i>
                </div>
                <section onClick={()=>closeMenuClickHandler(tagsWrapper)} ref={tagsWrapper}  className={styles.tagsWrapperOverlay}>
                    <div className={styles.hashtagsWrapper}>
                        <i  className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                        <h4 className={styles.label}>Tags</h4>
                        <ul className={styles.hashtagsList}>
                            {categories.map((cat:any)=>
                                <li className={styles.hashtag}>
                                    <Link to={"kat"}>
                                        <h6 className={styles.tagName}>#{cat}</h6>
                                    </Link>
                                </li>)
                            }

                        </ul>
                    </div>
                </section>

            </div>

        </>

    )
}