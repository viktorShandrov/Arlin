
import styles from "./Test.module.css"
import {useEffect, useRef, useState} from "react";
import {request} from "../functions";
import Spinner from 'react-bootstrap/Spinner';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default function Test(){


    const [test,setTest] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [isTestDone,setIsTestDone] = useState(false)
    const [question,setQuestion] = useState({
        answers:[{answer:"",isCorrect:false}],
        question:""
    })
    const answerRefs = useRef([])
    const containerRef = useRef(null)

    useEffect(() => {
        answerRefs.current = answerRefs.current.slice(0, question.answers.length);
    }, [question]);

    const textToSpeechClickHandler = ()=>{
        const voice = new SpeechSynthesisUtterance(question.question)
        window.speechSynthesis.speak(voice)
        makeUnknownWordsKnown()
    }
    const makeUnknownWordsKnown = () =>{
        const wordsIds = test.filter(el => el._id).map((el)=>el._id)
        request("unknownWords/makeThemKnown","POST", {wordsIds}).subscribe(
            (res)=>{

            },
            (error)=>{

            }
        )
    }
    const answerClickHandler=(index:number)=>{
        answerRefs.current[index].classList.add(styles.clicked);
        setTimeout(()=>{
            answerRefs.current[index].classList.remove(styles.clicked);
        },1000)
        // @ts-ignore
        if(answerRefs.current[index].getAttribute("data-iscorrect")){
            containerRef?.current.classList.add(styles.wrightAnswerAnimation)
            setTimeout(()=>{
                containerRef?.current.classList.remove(styles.wrightAnswerAnimation)
                const questionIndex = test.findIndex(question1=>question1==question)
                if(questionIndex==11){
                    setIsTestDone(true)
                    makeUnknownWordsKnown()

                }else{
                    setQuestion(oldQuestion=>{
                        return test[questionIndex+1]
                    })
                }
            },1000)
        }

    }

    useEffect(()=>{
        request("unknownWords/giveTest","POST",{testType:"randomWords",chapterId:"654d4e6b8434f59d05fded7b"}).subscribe(
            (res)=>{
                console.log(res)
                setTest(res.test)
                setQuestion(res.test[0])
                setIsLoading(false)
            },
            (error)=>{
                console.log(error)
            }
        )
    },[])
    const proceedClickHandler = ()=>{
        request("unknownWords/testCompleted","POST",{testType:"randomWords"}).subscribe(
            (res)=>{

            },
            (error)=>{
                console.log(error)
            }
        )
    }

    return(
        <>
            <div className={styles.wrapper}>
                {!isTestDone&&
                    <div ref={containerRef} className={styles.container}>
                        {isLoading&&
                            <>
                                <h1 className={styles.creatingYouTest}>Creating your test</h1>
                                <div className={styles.spinner}>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            </>

                        }

                        {!isLoading&&
                            <>

                                <div className={styles.heading}>
                                    <div className={styles.testOutput}>{question.question}</div>
                                    <i onClick={textToSpeechClickHandler} className="fa-solid fa-volume-high"></i>
                                    <div className={styles.page}>{`${test.findIndex(el=>el==question)+1}/${test.length}`}</div>
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

                            </>

                        }


                    </div>
                }

                {isTestDone&&
                    <div className={styles.testDoneContainer}>
                        <h1>Какво научихме днес:</h1>
                        <div className={styles.rowsC}>
                            {test.map((question,index)=>{
                                return <div key={index} className={styles.row}>
                                    <span>{question.question}</span>
                                    <span>{"--->"}</span>
                                    <span>{question.answers.find(el=>el.isCorrect).answer}</span>

                                </div>
                            })}
                        </div>
                        <button onClick={proceedClickHandler} className={styles.proceedBtn}>Продължи</button>

                    </div>

                }

            </div>


        </>
    )
}