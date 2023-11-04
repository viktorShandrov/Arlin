import "./StoryListItem.css"

export default function StoryListItem(props:any){


    return(
        <div className={"item"}>
            <img className={"storyImg"}  src={props.imgUrl}/>
            <h3 className={"storyName"}>{props.storyName}</h3>
        </div>
    )
}