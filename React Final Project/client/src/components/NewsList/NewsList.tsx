import styles from "./NewsList.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import News from "./News/News";
import Loading from "../Spinner/Loading";
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
    return (
        <>
            {isLoading&&<Loading/>}
            <div className={styles.newsWrapper}>
                <div className={styles.newsContainer}>
                    {news.length>0&&news.map((el:any)=><News key={el._id} el={el}/>)}
                </div>
            </div>

        </>

    )
}