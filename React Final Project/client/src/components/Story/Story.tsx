import Sentence from "./Sentence/Sentence.tsx";
import {useContext, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from "./Story.module.css"
import { useSelector} from "react-redux";
import ComponentLoading from "../ComponentLoading/ComponentLoading";
import Popup from "../Popup/Popup";
import Rating from "@mui/material/Rating";
import useForm from "../../hooks/useForm";
import {request} from "../../functions";
import {toast} from "react-toastify";
import {userContext} from "../../redux/StateProvider/StateProvider";
// import {setUser} from "../../redux/user";
// @ts-ignore
export default function Story({chapter,changeChapterClickHandler,isLoading,isRateBtnVisible,bookId}){

    const urlLocation = useLocation()
    const navigate = useNavigate();
// @ts-ignore
//     const {user} = useSelector((state:any)=>state.user)
    const { userState,setUserState } = useContext(userContext);
    const [isRatePopUpVisible,setIsRatePopUpVisible] = useState(false)
    const [formValue,onChange,resetForm] = useForm({rateText:"",bookUserRating:0})


    const showRatePopUp = ()=>{
        setIsRatePopUpVisible(true)
    }
    const hideRatePopUp = ()=>{
        resetForm()
        setIsRatePopUpVisible(false)
    }




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
        const saveReviewForBook = () =>{
            if(!formValue.bookUserRating) return
            request(`books/${bookId}/writeReview`,"POST",
                {
                        stars:formValue.bookUserRating,
                        text:formValue.rateText,
                }
                ).subscribe(
                    ()=>{
                            chapter.hasUserRatedTheBook = true
                            hideRatePopUp()
                            toast.success("Успешно оценихте книгата")
                    }
                )
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
                        {chapter.isBookOwnedByUser&&isRateBtnVisible&&!chapter.hasUserRatedTheBook&&<button onClick={showRatePopUp} className={`${styles.btn} ${styles.rateBtn}`}><span className={styles.btnName}>оцени книгата</span> <i className={`fa-solid fa-star ${styles.btnIcon}`}></i></button>}
                        <p></p>
                    </div>
                    {/*//TODO to work*/}
                    {/*    <div className={styles.testsWrapper}>*/}
                    {/*        {!areTestsHidden&&*/}
                    {/*            <>*/}
                    {/*                <Link to={`/main/test/wordsFromChapterTests/${chapter.currentChapter._id}`}>*/}
                    {/*                    <button className={`${styles.btn} ${styles.textWordsTest}`}>тест на думи от текста</button>*/}
                    {/*                </Link>*/}
                    {/*                <Link to={`/main/test/chapterPlotTests/${chapter.currentChapter._id}`}>*/}
                    {/*                    <button disabled={!chapter.hasChapterPlotTest} className={`${styles.btn} ${styles.textTest}`}>тест на разбраното от текста</button>*/}
                    {/*                </Link>*/}
                    {/*            </>*/}
                    {/*        }*/}
                    {/*        <button onClick={showBtns} className={`${styles.btn} ${styles.testIcon}`}>*/}
                    {/*            <img src="/nav%20icons%20new/test.png" alt=""/>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
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
            {isRatePopUpVisible&&<Popup hidePopup={hideRatePopUp} styleSelector={styles.ratePopupWrapper}>
                <div className={styles.ratePopUpC}>
                    <h5>Оценете книгата</h5>
                    <div className={styles.startsC}>
                        <Rating value={formValue.bookUserRating} name={"bookUserRating"} onChange={onChange} />
                    </div>
                    <textarea onChange={onChange} name="rateText" className={styles.rateText} placeholder={"Споделете впечатленията си тук"}/>
                    <button onClick={saveReviewForBook} defaultValue={0} disabled={!formValue.bookUserRating} className={styles.sendRateBtn}>Запази оценка</button>
                </div>

                 </Popup> }
        </div>


    )
}