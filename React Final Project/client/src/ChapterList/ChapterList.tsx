import "./ChapterList.css"
import {useEffect, useState} from "react";
import {request} from "../functions";
import {Link, useParams} from "react-router-dom";
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
        <div className={"chaptersList"}>
            {chapters.map((chapter: any, index: number) => (


                    <Link key={chapter}  to={`/main/${bookId}/${chapter}`}>
                        <div className={"item"}>
                            <img className={"chapterImg"} alt={`Chapter ${index+1}`} />
                            <h3 className={"chapterName"}>{index+1}</h3>
                        </div>
                    </Link>

            ))}
        </div>
    );

}