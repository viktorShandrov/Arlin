import {chapterContext} from "../../Main/Main";
import {useContext} from "react";
import {Link} from "react-router-dom";
import styles from "./StoryListItem.module.css"


export default function StoryListItem(props:any){

    const [chapter]=useContext(chapterContext)


    return(
        <Link to={`${props.storyId}`}>
            <div  className={styles.item}>
                <img className={styles.storyImg}  src={props.imgUrl}/>
                <h3 className={"storyName"}>{props.storyName}</h3>
                {chapter._id}
            </div>
        </Link>

    )
}