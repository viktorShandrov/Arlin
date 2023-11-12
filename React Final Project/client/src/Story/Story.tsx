import Sentence from "./Sentence/Sentence.tsx";
import {useEffect, useState} from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import {request} from "../functions";
import styles from "./Story.module.css"
export default function Story(){

    const urlLocation = useLocation()
    const navigate = useNavigate();

    const [chapter,setChapter] = useState({
        currentChapter: {text:""},
        previousChapterId:'',
        nextChapterId:''
    })



    const {chapterId} = useParams()
    const getChapter=(chapterId:string)=>{
         request(`chapters/${chapterId}`).subscribe(
             (res)=>{
                 console.log(res)
                 setChapter(res)
             },
             (error)=>{
                 console.log(error)
             }
         )
    }
    const handleNavigation = (sentence:string) => {
        const pathArr = urlLocation.pathname.split("/")

       const lastPath = pathArr[pathArr.length-1]
        let currentPathWithoutLastSegment=urlLocation.pathname
        if(!lastPath.includes("chapterId=")){
            currentPathWithoutLastSegment = urlLocation.pathname
                .split('/')
                .slice(0, -1)
                .join('/');
        }

        navigate(`${currentPathWithoutLastSegment}/${sentence}`);
    };
    const changeChapterClickHandler =(chapterId:string)=>{
        const index = urlLocation.pathname.indexOf("chapterId")
        if(index!==-1){
            const urlWithoutChapter = urlLocation.pathname.slice(0,index)
            navigate(urlWithoutChapter+"chapterId="+chapterId)
        }

    }


    useEffect(()=>{
        getChapter(chapterId!.split("chapterId=")[1])

    },[chapterId])

        let sentences:any =[]
        if(chapter){

             sentences = chapter.currentChapter.text.split(".")
        }


    return(
        <div className={styles.storyWrapper}>
            <div className={styles.story}>
                <div className={styles.textContainer}>
                    {chapter&&sentences.map((sentence:string,index:number)=>
                        <div  key={index} onClick={()=>handleNavigation(sentence)}>
                            <Sentence   text={sentence} />
                        </div>
                    )}
                </div>

                <div className={styles.btns}>
                    <button disabled={!chapter.previousChapterId} onClick={()=>changeChapterClickHandler(chapter.previousChapterId)} className={styles.previousChapter}>Previous chapter</button>
                    <button disabled={!chapter.nextChapterId} onClick={()=>changeChapterClickHandler(chapter.nextChapterId)} className={styles.nextChapter}>Next chapter</button>
                </div>
            </div>
        </div>


    )
}