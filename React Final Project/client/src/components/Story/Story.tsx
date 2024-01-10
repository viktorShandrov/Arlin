import Sentence from "./Sentence/Sentence.tsx";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {request} from "../../functions";
import styles from "./Story.module.css"
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/user";
export default function Story({chapter,changeChapterClickHandler}){

    const urlLocation = useLocation()
    const navigate = useNavigate();

    const {user} = useSelector((state:any)=>state.user)







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
        const properUrl = sentence.replace(/\n/g, ' ')
        const encodedText = encodeURIComponent(properUrl);
        navigate(`${currentPathWithoutLastSegment}/${encodedText}`);
    };





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
                    {!chapter&&
                    <h1>Problem with getting chapter</h1>}
                </div>
                {/*{chapter&&<div className={styles.btns}>*/}
                {/*    <div className={`${styles.testBtns}`}>*/}

                {/*    </div>*/}
                {/*    <div className={styles.navigationBtns}>*/}
                {/*        <button>*/}
                {/*            <i className="fa-solid fa-caret-left"></i>*/}
                {/*        </button>*/}
                {/*        <button >*/}
                {/*            <i className="fa-solid fa-caret-right"></i>*/}
                {/*        </button>*/}
                {/*    </div>*/}

                {/*</div>}*/}

            </div>
        </div>


    )
}