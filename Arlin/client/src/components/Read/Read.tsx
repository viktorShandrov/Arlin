import Story from "../Story/Story";
import TranslationContainer from "../TranslationContainer/TranslationContainer";
import { Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import styles from "./Read.module.css"
// import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";

import {request} from "../../functions";
import {userContext} from "../../redux/StateProvider/StateProvider";
// import {setUser} from "../../redux/user";
export default  function Read(){

    const {chapterId} = useParams()
    const {bookId} = useParams()

    // const {user} = useSelector((selector:any)=>selector.user)
    // @ts-ignore
    const { userState,setUserState } = useContext(userContext);

    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const urlLocation = useLocation()
    const [chapter,setChapter] = useState({
        currentChapter: {text:"", _id: undefined},
        previousChapterId:'',
        nextChapterId:'',
        _id:"",
        hasChapterPlotTest: false
    })
    const [isLoading,setIsLoading] = useState(false)
    const [isRateBtnVisible,setIsRateBtnVisible] = useState(false)


    useEffect(()=>{
        getChapter(chapterId!.split("chapterId=")[1])


        // translationWrapper.current.style.height = "1000px"
        // expandBox()
    },[chapterId])

    // function expandBox() {
    //     var box = translationWrapper.current;
    //     var height = 0; // Initial height
    //     const windowInnerHeight = window.innerHeight
    //     var targetHeight = windowInnerHeight *0.3; // Target height
    //     var duration = 300; // Duration of animation in milliseconds
    //     var interval = 10; // Interval between animation steps
    //
    //     var step = (targetHeight - height) / (duration / interval);
    //
    //     var animationInterval = setInterval(function() {
    //         height += step;
    //         box.style.height = height + 'px';
    //
    //         if (height >= targetHeight) {
    //             clearInterval(animationInterval);
    //         }
    //     }, interval);
    // }

    const getChapter=(chapterId:string)=>{
        setIsLoading(true)
        request(`chapters/${chapterId}`).subscribe(
            (res:any)=>{
                if(!res){
                    navigate("/main/read")
                }


                setUserState(
                    {...userState(),lastReading:{
                            bookId,
                            chapterId
                        }}
                )

                // dispatch(setUser())
                const isAtLeastOneThird = (index:number, length:number) => {
                    //the index starts with 1
                    if([1,2].includes(index)) return false
                    return index >= Math.floor(length / 3)
                } ;

                setIsRateBtnVisible(isAtLeastOneThird(res.chapterIndex,res.bookLength))

                setChapter(res)
                setIsLoading(false)
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
                {/*//TODO to work*/}
                {/*<div className={styles.listC}>*/}
                {/*    <ReadToolBox chapter={chapter} changeChapterClickHandler={changeChapterClickHandler} />*/}
                {/*        /!*<Routes>*!/*/}
                {/*            /!*<Route path={"/:bookId/:chapterId?/:textToTranslate?"} element={}/>*!/*/}
                {/*        /!*</Routes>*!/*/}
                {/*</div>*/}
                <div className={styles.storyC}>
                    <Story chapter={chapter} bookId={bookId} isLoading={isLoading} isRateBtnVisible={isRateBtnVisible}  changeChapterClickHandler={changeChapterClickHandler}  />
                    {/*<Routes>*/}
                    {/*    <Route path={"/:bookId/:chapterId/:textToTranslate?"} element={}/>*/}
                    {/*</Routes>*/}
                </div>

                <div className={styles.translatePanelC}>
                    <Routes>
                        <Route path={"/:textToTranslate?"} element={<TranslationContainer/>}/>
                    </Routes>
                </div>







            </section>



         </>


    )
}