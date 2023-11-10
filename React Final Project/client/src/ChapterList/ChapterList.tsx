import {useEffect, useState} from "react";
import {request} from "../functions";
import {Link, useParams} from "react-router-dom";
import styles from "./ChapterList.module.css"
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
                {chapters.map((chapter: any, index: number) => (


                    <Link key={chapter}  to={`/main/${bookId}/chapterId=${chapter}`}>
                        <div className={styles.item}>
                            <div className={styles.chapterImg}>
                                <img src={"/public/chapter.jpg"} alt={`Chapter ${index+1}`} />
                            </div>

                            <h3 className={"chapterName"}>{index+1}</h3>
                        </div>
                    </Link>

                ))}
            </div>
        </div>

    );

}