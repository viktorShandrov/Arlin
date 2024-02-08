
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
    const [pairs,setPairs] = useState({
        "work":null,
        "plane":null,
        "staff":null,
        "book":null,
    })
    const [answers,setAnswers] = useState(["работа","самолет","персонал","книга"])
    const [areAnswersExpanded,setAreAnswersExpanded] = useState(true)












    const removeAnswerClickHandler = (propName:any) =>{
// @ts-ignore
        const text = pairs[propName]
        const els =
            [
                // @ts-ignore
                answerElRefs.find(el=>el.current!.textContent ===text),
                // @ts-ignore
                mobileAnswerElRefs.find(el=>el.current!.textContent ===text)
            ]
        for (const el of els) {
            // @ts-ignore
            el.current!.style.opacity = 1

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
    const toggleAnswersExpandableCclickHandler=()=>{
        setAreAnswersExpanded(!areAnswersExpanded)
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
            <section
                style={{
                    // height:areAnswersExpanded?"fit-content":"20%"
                    opacity:areAnswersExpanded?1:0.5
                }}
                className={styles.answersMobileWrapper}
                onClick={toggleAnswersExpandableCclickHandler}
            >
                <div
                    className={styles.answersMobileC}
                >
                    {/*// @ts-ignore*/}
                    <AnswerC reference={mobileAnswerElRef1} setPairs={setPairs} text={answers[0]} dragOverElRefs={dragOverElRefs} setAreAnswersExpanded={setAreAnswersExpanded}/>
                    {/*// @ts-ignore*/}
                    <AnswerC reference={mobileAnswerElRef2} setPairs={setPairs} text={answers[1]}  dragOverElRefs={dragOverElRefs} setAreAnswersExpanded={setAreAnswersExpanded}/>
                    {/*// @ts-ignore*/}
                    <AnswerC reference={mobileAnswerElRef3} setPairs={setPairs} text={answers[2]}  dragOverElRefs={dragOverElRefs} setAreAnswersExpanded={setAreAnswersExpanded}/>
                    {/*// @ts-ignore*/}
                    <AnswerC reference={mobileAnswerElRef4} setPairs={setPairs} text={answers[3]}  dragOverElRefs={dragOverElRefs} setAreAnswersExpanded={setAreAnswersExpanded}/>
                    {/*{!areAnswersExpanded&&<div  className={styles.expandIcon}>*/}
                    {/*    <i className="fa-solid fa-arrow-up"></i>*/}
                    {/*</div>}*/}
                    {/*{areAnswersExpanded&&<div  className={styles.expandIcon}>*/}
                    {/*    <i className="fa-solid fa-arrow-down"></i>*/}
                    {/*</div>}*/}
                </div>

            </section>
        </div>
    </>
    )
}