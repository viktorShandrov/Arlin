import styles from "./NewsList.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import News from "./News/News";
export default function NewsList(){
    const [news,setNews] = useState([])
    useEffect(()=>{
        request("news/all","GET").subscribe(
            (res)=>{

                setNews(res.news.slice(0,3))
            }
        )
    },[])
    return (
        <>
            <div className={styles.newsWrapper}>
                <div className={styles.newsContainer}>
                    {news.length>0&&news.map((el)=><News el={el} / >)}
                </div>
            </div>

        </>

    )
}