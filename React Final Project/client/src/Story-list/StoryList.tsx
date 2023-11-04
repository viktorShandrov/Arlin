import StoryListItem from "./StoryListItem/StoryListItem";
import "./StoryList.css"
export default function StoryList(){


    const stories =[
        {
            storyName:"ivan",
            imgUrl:"public/OIP.jpg"
        },{
            storyName:"ivan",
            imgUrl:"public/OIP.jpg"
        },{
            storyName:"ivan",
            imgUrl:"public/OIP.jpg"
        },{
            storyName:"ivan",
            imgUrl:"public/OIP.jpg"
        },
    ]



    return(
        <div className={"storiesList"}>
            {stories.map((story,index)=><StoryListItem key={index} storyName={story.storyName} imgUrl={story.imgUrl} />)}
        </div>

    )
}