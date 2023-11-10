import Sentence from "./Sentence/Sentence.tsx";
import "./Story.css"
import {useEffect, useContext, useState} from "react";
// import {chapterContext} from "../Main/Main";
import {useParams} from "react-router-dom";
import {request} from "../functions";
export default function Story(){
    // const [chapter,setChapter] = useContext(chapterContext)
    const [chapter,setChapter] = useState({
        text:""
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


    useEffect(()=>{
        console.log(1111)
        getChapter(chapterId!)

    },[chapterId])

    let sentences:any =[]
        if(chapter){
             sentences = chapter.text.split(".")

        }

    return(
        <div className={"story"}>
            {sentences.map((sentence,index)=><Sentence key={index}   text={sentence} />)}
        </div>

    )
}