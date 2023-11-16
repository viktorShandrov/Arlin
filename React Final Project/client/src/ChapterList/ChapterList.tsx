import {useEffect, useState} from "react";
import {request} from "../functions";
import {Link, useParams} from "react-router-dom";
import styles from "./ChapterList.module.css"
import {createLogger} from "vite";
export default function ChapterList(){
    const [chapters,setChapters] = useState([])
    const {bookId} = useParams()
    const fetchBookChapters = ()=>{
        request(`books/${bookId}`).subscribe(
            (res:any)=>{
                const {book}=res
                setChapters(book.chapters)
            },
            (error:any)=>{
                console.log(error)
            }
        )
    }
    useEffect(()=>{
        fetchBookChapters()
    },[])




    return (
        <div className={styles.chapterListWrapper}>
            <div className={styles.chapterList}>
                {chapters.length>0&&chapters.map((chapter: any, index: number) => (


                    <Link key={chapter}  to={`/main/read/${bookId}/chapterId=${chapter}`}>
                        <div className={styles.item}>
                            <div className={styles.chapterImg}>
                                <img className={"img"} src={"/public/chapter.jpg"} alt={`Chapter ${index+1}`} />
                            </div>

                            <h3 className={styles.chapterName}>{index+1}</h3>
                        </div>
                    </Link>

                ))}
                {chapters.length==0 &&
                    <p>No chapters for this book</p>
                }
            </div>
        </div>

    );

}