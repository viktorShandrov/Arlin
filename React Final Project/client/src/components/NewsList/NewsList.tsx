import styles from "./NewsList.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import News from "../LandingPage/News/News";
import Loading from "../Spinner/Loading";
import {Link} from "react-router-dom";
export default function NewsList(){
    const [news,setNews] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        request("news/all","GET").subscribe(
            (res:any)=>{

                setNews(res.news)
                setIsLoading(false)
            }
        )
    },[])
    const categories = [
        "POLITICS",
        "MUSIC",
        "GAMES",
    ]
    return (
        <>
            {isLoading&&<Loading/>}
            <div className={styles.newsWrapper}>
                <div className={styles.menuBtn}>
                    <i className="fa-solid fa-layer-group"></i>
                </div>
                <section className={styles.categoriesWrapper}>
                    <h4 className={styles.label}>Categories</h4>
                    <ul className={styles.categoriesList}>
                        {categories.map((cat:any)=>
                                <li className={styles.category}>
                                    <Link to={"kat"}>
                                        <h6>{cat}</h6>
                                    </Link>
                                </li>)
                            }
                        
                    </ul>
                </section>
                <section className={styles.newsContainer}>
                    {news.length>0&&news.map((el:any)=>
                        <div className={styles.newsElement}>
                            <News key={el._id} newsElement={el}/>
                        </div>

                    )}
                </section>
                <div className={styles.menuBtn}>
                    <i className="fa-solid fa-hashtag"></i>
                </div>
                <section className={styles.hashtagsWrapper}>
                    <h4 className={styles.label}>Categories</h4>
                    <ul className={styles.hashtagsList}>
                        {categories.map((cat:any)=>
                            <li className={styles.hashtag}>
                                <Link to={"kat"}>
                                    <h6>#{cat}</h6>
                                </Link>
                            </li>)
                        }

                    </ul>
                </section>
            </div>

        </>

    )
}