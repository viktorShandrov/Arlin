
import styles from "./BookContent.module.css"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {request} from "../../functions";
export default function BookContent(){
    const {id} = useParams()
    const [chapters,setChapters] = useState([])
    useEffect(()=>{
        request("chapters/bookContent/"+id,"GET").subscribe(
            (res:any)=>{
                setChapters(res.bookContent)
            }
        )
    },[id])
    return(
        <section className={styles.bookContentWrapper}>
            <div className={styles.bookContentCWrapper}>
                <div className={styles.bookContentC}>
                    {chapters.length>0&&chapters.map((chapter:any,index:number)=>{
                        return <div className={styles.chapterWrapper}>
                            <div className={styles.chapterC}>
                                <h1 className={styles.chapterNumber}>{index+1}</h1>
                                <h1 className={styles.chapterName}>{chapter.chapterName}</h1>
                            </div>

                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}