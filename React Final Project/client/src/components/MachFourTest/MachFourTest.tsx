
import styles from "./MachFourTest.module.css"
import {useEffect, useRef, useState} from "react";
import AnswerC from "./AnswerC/AnswerC";
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
    const [rightAnswers,setRightAnswers] = useState({
        "work":"работа",
        "plane":"самолет",
        "staff":"персонал",
        "book":"книга",
    })
    const [pairs,setPairs] = useState({
        "work":null,
        "plane":null,
        "staff":null,
        "book":null,
    })
    const [answers,setAnswers] = useState(["работа","самолет","персонал","книга"])
    const [areAllRight,setAreAllRight] = useState(false)
    const [areAnswersShadowed,setAreAnswersShadowed] = useState(true)
    const [areAnswersExpanded,setAreAnswersExpanded] = useState(true)












    const removeAnswerClickHandler = (propName:any) =>{
// @ts-ignore
        const text = pairs[propName]
        console.log(mobileAnswerElRefs)
        console.log(mobileAnswerElRefs.every(el=>el))
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
        setAnswers( shuffleArray(answers))
    },[])
    const toggleAnswersShadowingCclickHandler=(e:any)=>{
        if(!e.target.classList.contains("fa-solid")&&!e.target.classList.contains(styles.expandIcon)){
            setAreAnswersShadowed(!areAnswersShadowed)
        }
    }
    const toggleAnswersExpandableCclickHandler=()=>{
        setAreAnswersExpanded(!areAnswersExpanded)
    }

    const checkAnswersClickHandler = () =>{
        let rightAnswersCount = 0
        for (const [propName,propValue] of Object.entries(pairs)) {
                const target =  dragOverElRefs.find((el:any)=>el.current.children[0].textContent===propValue)
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


    return(
    <>
        <div className={styles.testWrapper}>
            <div className={styles.questionsWrapper}>
                <div className={styles.questionC}>

                    <h6>work</h6>
                    <div data-isEmpty={!!pairs["work"]} ref={dragOverElRef1} className={styles.questionFreeSpace}>
                        {pairs["work"]&&<div onClick={()=>removeAnswerClickHandler("work")} className={styles.innerAnswerC}>{pairs["work"]}<i className={`${styles.xmark} fa-solid fa-xmark`}></i></div>}

                    </div>
                </div>
                <div className={styles.questionC}>
                    <h6>plane</h6>
                    <div data-isEmpty={!!pairs["plane"]} ref={dragOverElRef2} className={styles.questionFreeSpace}>
                        {pairs["plane"]&&<div onClick={()=>removeAnswerClickHandler("plane")} className={styles.innerAnswerC}>{pairs["plane"]}<i className={`${styles.xmark} fa-solid fa-xmark`}></i></div>}
                    </div>
                </div>
                <div className={styles.questionC}>
                    <h6>staff</h6>
                    <div data-isEmpty={!!pairs["staff"]} ref={dragOverElRef3} className={styles.questionFreeSpace}>
                        {pairs["staff"]&&<div onClick={()=>removeAnswerClickHandler("staff")} className={styles.innerAnswerC}>{pairs["staff"]}<i className={`${styles.xmark} fa-solid fa-xmark`}></i></div>}
                    </div>
                </div>
                <div className={styles.questionC}>
                    <h6>book</h6>
                    <div data-isEmpty={!!pairs["book"]} ref={dragOverElRef4} className={styles.questionFreeSpace}>
                        {pairs["book"]&&<div onClick={()=>removeAnswerClickHandler("book")} className={styles.innerAnswerC}>{pairs["book"]}<i className={`${styles.xmark} fa-solid fa-xmark`}></i></div>}
                    </div>
                </div>
            </div>
            <div className={styles.answersWrapper}>
                {answers.length>0&&<div className={styles.answersC}>


                    <AnswerC reference={answerElRef1} setPairs={setPairs} text={answers[0]} dragOverElRefs={dragOverElRefs}/>
                    <AnswerC reference={answerElRef2} setPairs={setPairs} text={answers[1]}  dragOverElRefs={dragOverElRefs}/>
                    <AnswerC reference={answerElRef3} setPairs={setPairs} text={answers[2]}  dragOverElRefs={dragOverElRefs}/>
                    <AnswerC reference={answerElRef4} setPairs={setPairs} text={answers[3]}  dragOverElRefs={dragOverElRefs}/>


                </div>}


            </div>
            {!Object.values(pairs).every((prop:any)=>prop)&&<section
                style={{
                    // height:areAnswersExpanded?"fit-content":"20%"
                    opacity:areAnswersShadowed?1:0.3,
                    height:areAnswersExpanded?"fit-content":"20%"
                }}
                className={styles.answersMobileWrapper}
                onClick={toggleAnswersShadowingCclickHandler}
            >
                <div
                    className={styles.answersMobileC}
                >
                    {/*// @ts-ignore*/}
                    <AnswerC reference={mobileAnswerElRef1} setPairs={setPairs} text={answers[0]} dragOverElRefs={dragOverElRefs} setAreAnswersShadowed={setAreAnswersShadowed}/>
                    {/*// @ts-ignore*/}
                    <AnswerC reference={mobileAnswerElRef2} setPairs={setPairs} text={answers[1]}  dragOverElRefs={dragOverElRefs} setAreAnswersShadowed={setAreAnswersShadowed}/>
                    {/*// @ts-ignore*/}
                    <AnswerC reference={mobileAnswerElRef3} setPairs={setPairs} text={answers[2]}  dragOverElRefs={dragOverElRefs} setAreAnswersShadowed={setAreAnswersShadowed}/>
                    {/*// @ts-ignore*/}
                    <AnswerC reference={mobileAnswerElRef4} setPairs={setPairs} text={answers[3]}  dragOverElRefs={dragOverElRefs} setAreAnswersShadowed={setAreAnswersShadowed}/>
                    {!areAnswersExpanded&&<div onClick={toggleAnswersExpandableCclickHandler}  className={styles.expandIcon}>
                        <i className="fa-solid fa-arrow-up"></i>
                    </div>}
                    {areAnswersExpanded&&<div onClick={toggleAnswersExpandableCclickHandler}  className={styles.expandIcon}>
                        <i className="fa-solid fa-arrow-down"></i>
                    </div>}
                </div>

            </section>}


            {
                Object.values(pairs).every((prop:any)=>prop)&&
                !areAllRight&&
                <button onClick={checkAnswersClickHandler} className={styles.checkAnswersBtn}>Провери отговорите</button>
            }
            {
                areAllRight&&
                <button onClick={checkAnswersClickHandler} className={styles.continueBtn}>Продължи</button>
            }
        </div>
    </>
    )
}