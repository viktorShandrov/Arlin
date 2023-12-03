import Sentence from "./Sentence/Sentence.tsx";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {request} from "../../functions";
import styles from "./Story.module.css"
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/user";
export default function Story(){

    const urlLocation = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {user} = useSelector((state:any)=>state.user)

    const [chapter,setChapter] = useState({
        currentChapter: {text:"", _id: undefined},
        previousChapterId:'',
        nextChapterId:'',
        _id:""
    })



    const {chapterId} = useParams()
    const {bookId} = useParams()
    const getChapter=(chapterId:string)=>{
         request(`chapters/${chapterId}`).subscribe(
             (res:any)=>{
                 dispatch(setUser({...user,lastReading:{
                         bookId,
                         chapterId
                     }}))
                 setChapter(res)
             }
         )
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
        console.log(encodedText)
        navigate(`${currentPathWithoutLastSegment}/${encodedText}`);
    };
    const changeChapterClickHandler =(chapterId:string)=>{
        const index = urlLocation.pathname.indexOf("chapterId")
        if(index!==-1){
            const urlWithoutChapter = urlLocation.pathname.slice(0,index)
            navigate(urlWithoutChapter+"chapterId="+chapterId)
        }

    }


    useEffect(()=>{
        getChapter(chapterId!.split("chapterId=")[1])

    },[chapterId])

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
                </div>

                <div className={styles.btns}>
                        <div className={`${styles.testBtns}`}>
                            <Link className={`${styles.btn}`} to={`/main/test/textWords/${chapter.currentChapter._id}`}>
                                <button  onClick={()=>changeChapterClickHandler(chapter.previousChapterId)} className={styles.previousChapter}>Word test</button>
                            </Link>
                            <Link className={`${styles.btn}`} to={`/main/test/textQuestions/${chapter.currentChapter._id}`}>
                                <button  onClick={()=>changeChapterClickHandler(chapter.previousChapterId)} className={styles.previousChapter}>Plot test</button>
                            </Link>
                        </div>
                    <div className={styles.navigationBtns}>
                        <button disabled={!chapter.previousChapterId} onClick={()=>changeChapterClickHandler(chapter.previousChapterId)} className={`${styles.previousChapter} ${styles.btn}`}>
                            <i className="fa-solid fa-caret-left"></i>
                        </button>
                        <button disabled={!chapter.nextChapterId} onClick={()=>changeChapterClickHandler(chapter.nextChapterId)} className={`${styles.nextChapter} ${styles.btn}`}>
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>


    )
}