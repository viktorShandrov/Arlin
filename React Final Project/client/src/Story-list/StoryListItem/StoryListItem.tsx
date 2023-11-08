import "./StoryListItem.css"
import {request} from "../../functions";
import cache from "../../cache";
import {chapterContext} from "../../App";
import {useContext} from "react";

export default function StoryListItem(props:any){
    const [chapter,setChapter]=useContext(chapterContext)
    const bookClickHandler=(bookId:string)=>{
        request(`books/${bookId}`).subscribe(
            (res)=>{
                console.log(res)
                cache.book = res.book
                setChapter(res.book)
            },
            (error)=>{
                console.log(error)
            }
        )
    }

    return(
        <div onClick={()=>bookClickHandler(props.storyId)} className={"item"}>
            <img className={"storyImg"}  src={props.imgUrl}/>
            <h3 className={"storyName"}>{props.storyName}</h3>
            {chapter._id}
        </div>
    )
}