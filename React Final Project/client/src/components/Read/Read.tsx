import Story from "../Story/Story";
import TranslationContainer from "../TranslationContainer/TranslationContainer";
import {Link, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import styles from "./Read.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ReadToolBox from "../ReadToolBox/ReadToolBox";
import {request} from "../../functions";
import {setUser} from "../../redux/user";
export default  function Read(){

    const {chapterId} = useParams()
    const {bookId} = useParams()

    const {user} = useSelector((selector:any)=>selector.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const urlLocation = useLocation()
    const [chapter,setChapter] = useState({
        currentChapter: {text:"", _id: undefined},
        previousChapterId:'',
        nextChapterId:'',
        _id:"",
        hasChapterPlotTest: false
    })


    useEffect(()=>{
        getChapter(chapterId!.split("chapterId=")[1])
    },[chapterId])


    const getChapter=(chapterId:string)=>{
        request(`chapters/${chapterId}`).subscribe(
            (res:any)=>{
                if(!res){
                    navigate("/main/read")
                }
                console.log(res)
                dispatch(setUser({...user,lastReading:{
                        bookId,
                        chapterId
                    }}))
                setChapter(res)
            }
        )
    }
    const changeChapterClickHandler =(chapterId:string)=>{
        const index = urlLocation.pathname.indexOf("chapterId")
        if(index!==-1){
            const urlWithoutChapter = urlLocation.pathname.slice(0,index)
            navigate(urlWithoutChapter+"chapterId="+chapterId)
        }

    }

    return(
        <>
            <section className={styles.main}>

                <div className={styles.listC}>
                    <ReadToolBox chapter={chapter} changeChapterClickHandler={changeChapterClickHandler} />
                        {/*<Routes>*/}
                            {/*<Route path={"/:bookId/:chapterId?/:textToTranslate?"} element={}/>*/}
                        {/*</Routes>*/}
                </div>
                <div className={styles.storyC}>
                    <Story chapter={chapter} changeChapterClickHandler={changeChapterClickHandler}  />
                    {/*<Routes>*/}
                    {/*    <Route path={"/:bookId/:chapterId/:textToTranslate?"} element={}/>*/}
                    {/*</Routes>*/}
                </div>

                <div className={styles.translatePanelC}>
                    <Routes>
                        {/*<Route path={"/:textToTranslate?"} element={<TranslationContainer/>}/>*/}
                    </Routes>
                </div>


            </section>



         </>


    )
}