
import styles from "./Test.module.css"
import {useEffect, useRef, useState} from "react";
import {request} from "../functions";

export default function Test(){


    const [test,setTest] = useState([])
    const [question,setQuestion] = useState({
        answers:[{answer:"",isCorrect:false}],
        question:""
    })
    const answerRefs = useRef([])

    useEffect(() => {
        answerRefs.current = answerRefs.current.slice(0, question.answers.length);
    }, [question]);

    const textToSpeechClickHandler = ()=>{
        const voice = new SpeechSynthesisUtterance(question.question)
        window.speechSynthesis.speak(voice)
    }
    const answerClickHandler=(index:number)=>{
        console.log(answerRefs.current[index])
        answerRefs.current[index].classList.add(styles.clicked);
        setTimeout(()=>{
            answerRefs.current[index].classList.remove(styles.clicked);
        //
        },1000)
        // console.log(answerRefs[index].current);
        // if (answerC.current) {
        // }
    }

    useEffect(()=>{
        request("unknownWords/giveTest","POST",{testType:"randomWords"}).subscribe(
            (res)=>{
                console.log(res)
                setTest(res.test)
                setQuestion(res.test[0])
            },
            (error)=>{
                console.log(error)
            }
        )
    },[])

    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.heading}>
                        <div className={styles.testOutput}>{question.question}</div>
                            <i onClick={textToSpeechClickHandler} className="fa-solid fa-volume-high"></i>
                        <div className={styles.page}>{`${test.length}`}</div>
                    </div>
                    <div className={styles.answersWrapper}>
                        <div className={styles.answersC}>

                            <>
                                {question.answers.map((el,index)=>{
                                  // @ts-ignore
                                    return  <div onClick={()=>answerClickHandler(index)} ref={el => answerRefs.current[index] = el} key={index} data-iscorrect={el.isCorrect} className={styles.answer}>
                                        <p className={styles.answerText}>{el.answer}</p>
                                    </div>
                                })}
                            </>



                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}