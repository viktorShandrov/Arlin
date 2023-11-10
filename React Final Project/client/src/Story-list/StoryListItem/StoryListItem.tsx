import "./StoryListItem.css"
import {request} from "../../functions";
import cache from "../../cache";
import {chapterContext} from "../../Main/Main";
import {useContext} from "react";
import {Link, useNavigation} from "react-router-dom";


export default function StoryListItem(props:any){

    const [chapter,setChapter]=useContext(chapterContext)
    // const bookClickHandler=(bookId:string)=>{
    //     request(`books/${bookId}`).subscribe(
    //         (res)=>{
    //             console.log(res)
    //             cache.book = res.book
    //             setChapter(res.book)
    //         },
    //         (error)=>{
    //             console.log(error)
    //         }
    //     )
    // }

    return(
        <Link to={`${props.storyId}`}>
            <div  className={"item"}>
                <img className={"storyImg"}  src={props.imgUrl}/>
                <h3 className={"storyName"}>{props.storyName}</h3>
                {chapter._id}
            </div>
        </Link>

    )
}