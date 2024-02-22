import Sentence from "./Sentence/Sentence.tsx";
import { useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from "./Story.module.css"
import { useSelector} from "react-redux";
import ComponentLoading from "../ComponentLoading/ComponentLoading";
// import {setUser} from "../../redux/user";
// @ts-ignore
export default function Story({chapter,changeChapterClickHandler,isLoading,isRateBtnVisible}){

    const urlLocation = useLocation()
    const navigate = useNavigate();
// @ts-ignore
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

             sentences = chapter.currentChapter.text.split(/(?<=[?!.])/)
        }
    const [areTestsHidden,setAreTestsHidden] = useState(true)
    const showBtns = ()=>{
        setAreTestsHidden(!areTestsHidden)
    }


    return(
        <div className={styles.storyWrapper}>
            <div className={styles.story}>
                <div className={styles.textContainer}>
                    {isLoading&&<ComponentLoading/>}
                    {chapter&&sentences.map((sentence:string,index:number)=>
                        <div  key={index} onClick={()=>handleNavigation(sentence)}>
                            <Sentence   text={sentence} />
                        </div>
                    )}
                    {!chapter&&
                    <h1>Problem with getting chapter</h1>}
                </div>
                <div className={styles.btnsC}>
                    <div className={styles.btns}>
                        <button disabled={!chapter.previousChapterId} onClick={()=>changeChapterClickHandler(chapter.previousChapterId)} className={` ${styles.btn}`} ><span className={styles.btnName}>предишна глава</span> <i className={`fa-solid fa-caret-left ${styles.btnIcon}`}></i> </button>
                        <button disabled={!chapter.nextChapterId} onClick={()=>changeChapterClickHandler(chapter.nextChapterId)} className={`    ${styles.btn}`} ><span className={styles.btnName}>следваща глава</span><i className={`fa-solid fa-caret-right ${styles.btnIcon}`}></i>  </button>
                        {isRateBtnVisible&&<button className={`${styles.btn} ${styles.rateBtn}`}><span className={styles.btnName}>оцени книгата</span> <i className={`fa-solid fa-star ${styles.btnIcon}`}></i></button>}
                        <p></p>
                    </div>
                        <div className={styles.testsWrapper}>
                            {!areTestsHidden&&
                                <>
                                    <Link to={`/main/test/textWords/${chapter.currentChapter._id}`}>
                                        <button className={`${styles.btn} ${styles.textWordsTest}`}>тест на думи от текста</button>
                                    </Link>
                                    <Link to={`/main/test/textQuestions/${chapter.currentChapter._id}`}>
                                        <button disabled={!chapter.hasChapterPlotTest} className={`${styles.btn} ${styles.textTest}`}>тест на разбраното от текста</button>
                                    </Link>
                                </>
                            }
                            <button onClick={showBtns} className={`${styles.btn} ${styles.testIcon}`}>
                                <img src="/nav%20icons%20new/test.png" alt=""/>
                            </button>
                        </div>
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