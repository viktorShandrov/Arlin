import Sentence from "./Sentence/Sentence.tsx";
import "./Story.css"
import {useState,useEffect} from "react";

export default function Story(){
    const[storyText,setStoryText] = useState("")



    const story = `
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis repellendus ut! Adipisci alias ipsum iste quia sint! Ab aliquam commodi consequuntur illo illum ipsam iste labore laudantium mollitia nam nemo, obcaecati odio, perferendis quas quasi quia ratione, saepe sapiente sit velit. Deleniti ducimus eius ipsum laboriosam laudantium possimus, quasi repudiandae sint! Atque blanditiis, doloremque ipsam nostrum officia quas quasi sint temporibus totam voluptates. Corporis, delectus deleniti eaque ipsam laborum, officiis quidem repudiandae sint, ullam veniam voluptatem voluptatum. A accusamus accusantium aliquam asperiores aut blanditiis debitis dolore hic illum labore modi mollitia numquam odio officia quam quod reprehenderit, suscipit voluptatum.
    `
    useEffect(()=>{
        setStoryText(story)
    },[])
    const sentences = storyText.split(".")
    return(
        <div className={"story"}>
            {sentences.map((sentence,index)=><Sentence key={index}   text={sentence} />)}
        </div>

    )
}