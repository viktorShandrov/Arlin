import StoryListItem from "./StoryListItem/StoryListItem";
import "./StoryList.css"
import {useEffect, useState} from "react";
import {request} from "../functions";
export default function StoryList(){
    const [books,setBooks] = useState([])
    const fetchAllBooks = ()=>{
        request("books/all").subscribe(
            (res:any)=>{
                const {allBooks}=res
                setBooks(allBooks)
            },
            (error:any)=>{
                console.log(error)
            }
        )
    }
    useEffect(()=>{
        fetchAllBooks()
    },[])




    return(
        <div className={"storiesList"}>
            {books.map((story:any,index:number)=><StoryListItem key={index} storyName={story.name} imgUrl={story.imgUrl} />)}
        </div>

    )
}