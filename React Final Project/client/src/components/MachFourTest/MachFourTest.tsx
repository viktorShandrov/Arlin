
import styles from "./MachFourTest.module.css"
import {useEffect, useRef, useState} from "react";
import AnswerC from "./AnswerC/AnswerC";
import {request} from "../../functions";
import TestResume from "../TestResume/TestResume";
import Popup from "../Popup/Popup";
export default function MachFourTest(){
    const dragOverElRef1= useRef(null)
    const dragOverElRef2= useRef(null)
    const dragOverElRef3 = useRef(null)
    const dragOverElRef4 = useRef(null)
    const dragOverElRefs = [dragOverElRef1,dragOverElRef2,dragOverElRef3,dragOverElRef4]
    const answerElRef1 = useRef(null)
    const answerElRef2 = useRef(null)
    const answerElRef3 = useRef(null)
    const answerElRef4 = useRef(null)
    const answerElRefs = [answerElRef1,answerElRef2,answerElRef3,answerElRef4]
    const mobileAnswerElRef1 = useRef(null)
    const mobileAnswerElRef2 = useRef(null)
    const mobileAnswerElRef3 = useRef(null)
    const mobileAnswerElRef4 = useRef(null)
    const mobileAnswerElRefs = [mobileAnswerElRef1,mobileAnswerElRef2,mobileAnswerElRef3,mobileAnswerElRef4]
    const testWrapperRef = useRef(null)
    const [rightAnswers,setRightAnswers] = useState({})
    const [pairs,setPairs] = useState({})
    const [answers,setAnswers] = useState([])
    const [currentTest,setCurrentTest] = useState([])
    const [wholeTest,setWholeTest] = useState([])
    const [areAllRight,setAreAllRight] = useState(false)
    const [isTestDone,setIsTestDone] = useState(false)
    const [isMobileDevice] = useState(()=>window.innerWidth<1100)
    // const [areAnswersShadowed,setAreAnswersShadowed] = useState(true)
    const [isAnswersPopupVisible,setIsAnswersPopupVisible] = useState(false)
    const [currentTestIndex,setCurrentTestIndex] = useState(-1)
    const [mobileTargetContainer,setMobileTargetContainer] = useState("")












    const removeAnswerClickHandler = (propName:any) =>{
// @ts-ignore
        const text = pairs[propName]
        // console.log(mobileAnswerElRefs)
        // console.log(mobileAnswerElRefs.every(el=>el))
        const els =
            [
                // @ts-ignore
                answerElRefs.every(el=>el.current)?answerElRefs.find(el=>el.current!.textContent ===text):null,
                // @ts-ignore
                mobileAnswerElRefs.every(el=>el.current)?mobileAnswerElRefs.find(el=>el.current!.textContent ===text):null
            ]
        for (const el of els) {
            if(el){
                // @ts-ignore
                el.current!.style.opacity = 1
            }


        }
        // @ts-ignore
        setPairs((old)=>{
            return {...old,[propName]:null}
        })
        // @ts-ignore
        pairs[propName] = null
}


    function shuffleArray(array:any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return [...array];
    }

// Example usage:





    useEffect(()=>{
        // setAnswers((old)=>{
        //     old.splice(old.indexOf())
        //     return
        // })
        request("unknownWords/giveTest","POST",{testType:"matchFourTests"}).subscribe(
             (res:any)=>{
                    setWholeTest(res.test)
                    setCurrentTest(res.test.slice(0,4))
                    setCurrentTestIndex(0)


             }
         )
    },[])
    const mobileDragOverContainersVisualisation = () =>{
        if(isMobileDevice){
            for (const dragOverElRef of dragOverElRefs) {
                const html = `Изберете дума <div class="${styles.growSpinner} spinner-grow" role="status"><span className="sr-only">Loading...</span></div>`;
                {/*//@ts-ignore*/}
                dragOverElRef.current.innerHTML = html;


            }
        }

    }






    useEffect(()=>{

        setAreAllRight(false)
        if(currentTest.length===0) return
        const rightAnswers = {}
        const pairs = {}
        for (const question of currentTest) {
            // @ts-ignore
            rightAnswers[question.word] = question.translatedText
            // @ts-ignore
            pairs[question.word] = null
        }
        // @ts-ignore
        setRightAnswers(rightAnswers)


        setPairs(pairs)


        // @ts-ignore
        const answers = shuffleArray(currentTest.map((question:any)=>question.translatedText))
        // console.log(answers)
        {/*//@ts-ignore*/}
        setAnswers(answers)
        if(currentTestIndex>0){
            if(mobileAnswerElRefs.some(el=>el.current)){
                for (const answerRef of mobileAnswerElRefs) {
                    {/*//@ts-ignore*/}
                    answerRef.current!.style.opacity = 1
                }
            }
            if(answerElRefs.some(el=>el.current)){
                for (const answerRef of answerElRefs) {
                    {/*//@ts-ignore*/}
                    answerRef.current!.style.opacity = 1
                }
            }

        }

        mobileDragOverContainersVisualisation()

    },[currentTest])








    // const toggleAnswersShadowingCclickHandler=(e:any)=>{
    //     if(!e.target.classList.contains("fa-solid")&&!e.target.classList.contains(styles.expandIcon)){
    //         setAreAnswersShadowed(!areAnswersShadowed)
    //     }
    // }
    // const toggleAnswersExpandableCclickHandler=()=>{
    //     setAreAnswersExpanded(!areAnswersExpanded)
    // }

    const checkAnswersClickHandler = () =>{
        let rightAnswersCount = 0
        // console.log(pairs)
        for (const [propName,propValue] of Object.entries(pairs)) {
            // console.log(propName,propValue)
                const target =  dragOverElRefs.find((el:any)=>el.current.children[0].textContent===propValue)
            // console.log(target)
            // @ts-ignore
            if(rightAnswers[propName]!==propValue){
                // @ts-ignore
                target.current.children[0].style.backgroundColor = "red"
            }else{
                // @ts-ignore
                target.current.children[0].style.backgroundColor = "#00ff00"
                ++rightAnswersCount
            }
        }
        if(rightAnswersCount===4){
            setAreAllRight(true)
        }else {
            setAreAllRight(false)
        }
    }
    const continueBtnClickHandler = () =>{
        if(currentTestIndex===2){
            setIsTestDone(true)
        }else{
            {/*//@ts-ignore*/}
            testWrapperRef.current!.style.opacity = 0
            setTimeout(()=>{
                setCurrentTestIndex(old=>++old)
                setCurrentTest(wholeTest.slice((currentTestIndex+1)*4,(currentTestIndex+1)*4+4))
                {/*//@ts-ignore*/}
                testWrapperRef.current!.style.opacity = 1
            },1000)
        }

    }
    const showAnswersPopup = (targetC:string) =>{
        if(isMobileDevice){
            setIsAnswersPopupVisible(true)
            setMobileTargetContainer(targetC)
        }
    }
    const hideAnswersPopup = () =>{

            setIsAnswersPopupVisible(false)

    }



    return(
    <>
        {/*//@ts-ignore*/}
        {isTestDone&&<TestResume questions={wholeTest.map(question=>question.word)} answers={wholeTest.map(question=>question.translatedText)} testType={"matchFourTests"} />}
        {!isTestDone&& <div ref={testWrapperRef} className={styles.testWrapper}>
            <div className={styles.questionsWrapper}>

                {currentTest.length>0&&
                    currentTest.map((question:any,index:number)=><div className={styles.questionC}>

                        <h6>{question.word}</h6>
                            {/*{!(pairs[question.word])?"Изберете дума":""}*/}
                        {/*//@ts-ignore*/}
                        <div data-isEmpty={!!pairs[question.word]} onClick={()=>showAnswersPopup(dragOverElRefs[index])} ref={dragOverElRefs[index]} className={styles.questionFreeSpace}>
                            {/*//@ts-ignore*/}
                            {pairs[question.word] && (
                                <div onClick={() => removeAnswerClickHandler(question.word)} className={styles.innerAnswerC}>
                                    {/*//@ts-ignore*/}
                                    {pairs[question.word]}
                                    <i className={`${styles.xmark} fa-solid fa-xmark`}></i>
                                </div>
                            ) }

                        </div>
                    </div>)
                }


            </div>
            <div className={styles.answersWrapper}>
                {answers.length>0&&<div className={styles.answersC}>


                    <AnswerC reference={answerElRef1} setPairs={setPairs} text={answers[0]} dragOverElRefs={dragOverElRefs}/>
                    <AnswerC reference={answerElRef2} setPairs={setPairs} text={answers[1]}  dragOverElRefs={dragOverElRefs}/>
                    <AnswerC reference={answerElRef3} setPairs={setPairs} text={answers[2]}  dragOverElRefs={dragOverElRefs}/>
                    <AnswerC reference={answerElRef4} setPairs={setPairs} text={answers[3]}  dragOverElRefs={dragOverElRefs}/>


                </div>}


            </div>
            {!Object.values(pairs).every((prop:any)=>prop)&&isAnswersPopupVisible&&<Popup hidePopup={hideAnswersPopup} styleSelector={styles.popupWrapper}>
                <section
                    className={styles.answersMobileWrapper}
                >
                    <div className={styles.answersMobileC}>
                        {/*// @ts-ignore*/}
                        <AnswerC reference={mobileAnswerElRef1} setPairs={setPairs} text={answers[0]} dragOverElRefs={dragOverElRefs} isMobile={true}  targetContainer={mobileTargetContainer} hidePopup={hideAnswersPopup}/>
                        {/*// @ts-ignore*/}
                        <AnswerC reference={mobileAnswerElRef2} setPairs={setPairs} text={answers[1]}  dragOverElRefs={dragOverElRefs} isMobile={true} targetContainer={mobileTargetContainer} hidePopup={hideAnswersPopup}/>
                        {/*// @ts-ignore*/}
                        <AnswerC reference={mobileAnswerElRef3} setPairs={setPairs} text={answers[2]}  dragOverElRefs={dragOverElRefs} isMobile={true} targetContainer={mobileTargetContainer} hidePopup={hideAnswersPopup}/>
                        {/*// @ts-ignore*/}
                        <AnswerC reference={mobileAnswerElRef4} setPairs={setPairs} text={answers[3]}  dragOverElRefs={dragOverElRefs} isMobile={true} targetContainer={mobileTargetContainer} hidePopup={hideAnswersPopup}/>

                    </div>
                </section>
            </Popup>
                }


            {
                Object.values(pairs).every((prop:any)=>prop)&&
                !areAllRight&&
                <button onClick={checkAnswersClickHandler} className={styles.checkAnswersBtn}>Провери отговорите</button>
            }
            {
                areAllRight&&
                <button onClick={continueBtnClickHandler} className={styles.continueBtn}>Продължи</button>
            }
        </div>}

    </>

    )
}