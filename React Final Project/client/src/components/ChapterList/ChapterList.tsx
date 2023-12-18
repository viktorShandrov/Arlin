import {useEffect, useState} from "react";
import {request} from "../../functions";
import {Link, useParams} from "react-router-dom";
import styles from "./ChapterList.module.css"
import chapterImage from "../../../public/chapter.jpg"
import ComponentLoading from "../ComponentLoading/ComponentLoading";
export default function ChapterList(){
    const [chapters,setChapters] = useState([])
    const {bookId} = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const fetchBookChapters = ()=>{
        request(`books/${bookId}`).subscribe(
            (res:any)=>{
                const {book}=res
                setChapters(book.chapters)
                setIsLoading(false)
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
            {isLoading&&<ComponentLoading/>}
            <div className={styles.chapterList}>
                {chapters.length>0&&chapters.map((chapter: any, index: number) => (


                    <Link key={chapter}  to={`/main/read/${bookId}/chapterId=${chapter}`}>
                        <div className={styles.item}>
                            <div className={styles.chapterImg}>
                                <img className={"img"} src={chapterImage} alt={`Chapter ${index+1}`} />
                            </div>

                            <h3 className={styles.chapterName}>{index+1}</h3>
                        </div>
                    </Link>

                ))}
                {chapters.length==0 &&
                    <p className={styles.nochaptersmessage}>No chapters for this book</p>
                }
            </div>
        </div>

    );

}