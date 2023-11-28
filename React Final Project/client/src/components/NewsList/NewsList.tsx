import styles from "./NewsList.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import News from "./News/News";
import {useNavigate} from "react-router-dom";
export default function NewsList(){
    const [news,setNews] = useState([])
    useEffect(()=>{
        request("news/all","GET").subscribe(
            (res)=>{

                setNews(res.news)
            }
        )
    },[])
    return (
        <>
            <div className={styles.newsWrapper}>
                <div className={styles.newsContainer}>
                    {news.length>0&&news.map((el)=><News key={el._id} el={el} / >)}
                </div>
            </div>

        </>

    )
}