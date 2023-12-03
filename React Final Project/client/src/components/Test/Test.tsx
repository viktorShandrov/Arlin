
import styles from "./Test.module.css"
import {useEffect, useRef, useState} from "react";
import {request} from "../../functions";
import Spinner from 'react-bootstrap/Spinner';
import {useNavigate, useParams} from "react-router-dom";

export default function Test(){

    const {testType,chapterId} = useParams()
    const [test,setTest] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [isTestDone,setIsTestDone] = useState(false)
    const [question,setQuestion] = useState({
        answers:[{answer:"",isCorrect:false}],
        question:""
    })
    const answerRefs = useRef([])
    const containerRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        answerRefs.current = answerRefs.current.slice(0, question.answers.length);
    }, [question]);

    const textToSpeechClickHandler = ()=>{
        const voice = new SpeechSynthesisUtterance(question.question)
        window.speechSynthesis.speak(voice)
    }

    const answerClickHandler=(index:number)=>{
        // @ts-ignore
        answerRefs.current[index].classList.add(styles.clicked);
        setTimeout(()=>{
            // @ts-ignore
            answerRefs.current[index].classList.remove(styles.clicked);
        },1000)
        // @ts-ignore
        if(answerRefs.current[index].getAttribute("data-iscorrect")){
            // @ts-ignore
            containerRef?.current.classList.add(styles.wrightAnswerAnimation)
            setTimeout(()=>{
                // @ts-ignore
                containerRef?.current.classList.remove(styles.wrightAnswerAnimation)
                const questionIndex = test.findIndex(question1=>question1==question)
                if(questionIndex==test.length-1){
                    setIsTestDone(true)
                    // makeUnknownWordsKnown()

                }else{
                    setQuestion(()=>{
                        return test[questionIndex+1]
                    })
                }
            },1000)
        }

    }

    useEffect(()=>{
        request("unknownWords/giveTest","POST",{testType,chapterId}).subscribe(
            (res:any)=>{
                console.log(res)
                setTest(res.test)
                setQuestion(res.test[0])
                setIsLoading(false)
            }
        )
    },[])
    const proceedClickHandler = (testType:string)=>{
        request("unknownWords/testCompleted","POST",{testType}).subscribe(
            ()=>{
                navigate("/main/read")
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
                                            {question.answers.map((el:any,index)=>{
                                                // @ts-ignore
                                                return  <div onClick={()=>answerClickHandler(index)} ref={(el:any) => answerRefs.current[index] = el} key={index} data-iscorrect={el.isCorrect} className={styles.answer}>
                                                    <p className={styles.answerText}>{el.answer||el.option}</p>
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
                            {test.map((question:any,index:number)=>{
                                const rightAnswer = question.answers.find((el:any)=>el.isCorrect).answer||
                                    question.answers.find((el:any)=>el.isCorrect).option
                                return <div key={index} className={styles.row}>
                                    <span>{question.question}</span>
                                    <span>{"--->"}</span>
                                    <span>{rightAnswer}</span>

                                </div>
                            })}
                        </div>
                        <button onClick={()=>proceedClickHandler(testType!)} className={styles.proceedBtn}>Продължи</button>

                    </div>

                }

            </div>


        </>
    )
}