import styles from "./NewsList.module.css"
{/*// @ts-ignore*/}
import {useEffect, useRef, useState} from "react";
import {request} from "../../functions";
import News from "../LandingPage/News/News";
import Loading from "../Spinner/Loading";

import ComponentLoading from "../ComponentLoading/ComponentLoading";
export default function NewsList(){
    const [news,setNews] = useState([])
    const [isReadMoreLoading,setIsReadMoreLoading] = useState(false)
    const [areNoNewsLeft,setAreNoNewsLeft] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    // const categoriesWrapper = useRef(null)
    // const tagsWrapper = useRef(null)
    useEffect(()=>{
        request("news/paginated/0","GET").subscribe(
            (res:any)=>{

                setNews(res.news)
                setIsLoading(false)
            }
        )
    },[])
    const seeMoreBtnClickHandler = () =>{
        const startIndex = news.length
        setIsReadMoreLoading(true)

        request("news/paginated/"+startIndex,"GET").subscribe(
            (res:any)=>{
                //@ts-ignore
                setNews((previousNews:any[])=>[...previousNews,...res.news])
                setIsReadMoreLoading(false)

                if(res.news.length<10||res.news.length===0){
                    setAreNoNewsLeft(true)
                }

            }
        )
    }
    {/*// @ts-ignore*/}

    const menuClickHandler= (ref:any)=>{
        ref.current.classList.add(styles.clicked)
    }
    {/*// @ts-ignore*/}
    const closeMenuClickHandler= (ref:any)=>{
        ref.current.classList.remove(styles.clicked)
    }
    {/*// @ts-ignore*/}
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
            <div className={styles.newsMainWrapper}>
                {/*//TODO categories*/}
                {/*<div className={styles.categoriesList}>*/}
                {/*    <ul className={styles.categoryBtnsC}>*/}
                {/*        <ScrollerContainer scrollSpeed={400}>*/}
                {/*            /!*[...new Set(news.map((news:any)=>news.category))]*!/*/}
                {/*            {news.length>0&&categories.map(cat=><li className={styles.categoryBtn}> <h6>{cat}</h6> </li>)}*/}
                {/*        </ScrollerContainer>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                <div className={styles.newsWrapper}>
                    {/*//TODO categories*/}
                    {/*<div onClick={()=>menuClickHandler(categoriesWrapper)} className={styles.catsMenuBtn}>*/}
                    {/*    <i className="fa-solid fa-layer-group"></i>*/}
                    {/*</div>*/}
                    {/*<section onClick={()=>closeMenuClickHandler(categoriesWrapper)} ref={categoriesWrapper}  className={styles.categoriesWrapperOverlay}>*/}
                    {/*    <div   className={styles.categoriesWrapper}>*/}
                    {/*        <i  className={`fa-solid fa-xmark ${styles.xmark}`}></i>*/}
                    {/*        <h4 className={styles.label}>Categories</h4>*/}
                    {/*        <ul className={styles.categoriesList}>*/}
                    {/*            {categories.map((cat:any)=>*/}
                    {/*                <li className={styles.category}>*/}
                    {/*                    <Link to={"kat"}>*/}
                    {/*                        <h6 className={styles.catName}>{cat}</h6>*/}
                    {/*                    </Link>*/}
                    {/*                </li>)*/}
                    {/*            }*/}

                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                    <section className={styles.newsAndTopNews}>
                        <div className={styles.newsContainer}>
                            <div className={styles.topNews}>

                                {/*{news.length>0&&<div className={styles.newsElement}>*/}
                                {/*    <News isTop={true} newsElement={news[0]}/>*/}
                                {/*</div>}*/}
                            </div>
                            {news.length>0&&news.map((el:any)=>
                                <div className={styles.newsElement}>
                                    <News key={el._id} newsElement={el}/>
                                </div>

                            )}
                        </div>
                        <button disabled={areNoNewsLeft}  onClick={seeMoreBtnClickHandler} className={styles.seeMore}>{isReadMoreLoading&&<ComponentLoading isForReadMoreNews={true} />}  Виж още</button>
                    </section>

                    {/*//TODO categories*/}

                    {/*<div onClick={()=>menuClickHandler(tagsWrapper)} className={styles.tagsMenuBtn}>*/}
                    {/*    <i className="fa-solid fa-hashtag"></i>*/}
                    {/*</div>*/}

                    {/*<section onClick={()=>closeMenuClickHandler(tagsWrapper)} ref={tagsWrapper}  className={styles.tagsWrapperOverlay}>*/}
                    {/*    <div className={styles.hashtagsWrapper}>*/}
                    {/*        <i  className={`fa-solid fa-xmark ${styles.xmark}`}></i>*/}
                    {/*        <h4 className={styles.label}>Tags</h4>*/}
                    {/*        <ul className={styles.hashtagsList}>*/}
                    {/*            {categories.map((cat:any)=>*/}
                    {/*                <li className={styles.hashtag}>*/}
                    {/*                    <Link to={"kat"}>*/}
                    {/*                        <h6 className={styles.tagName}>#{cat}</h6>*/}
                    {/*                    </Link>*/}
                    {/*                </li>)*/}
                    {/*            }*/}
                    {/*        </ul>*/}
                    {/*        <button onClick={()=>menuClickHandler(tagsWrapper)} className={styles.showMoreCatsBtn}>more</button>*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                </div>
            </div>


        </>

    )
}