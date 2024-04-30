
import styles from "./Test.module.css"
import {useEffect, useRef, useState} from "react";
import {request} from "../../functions";
import Spinner from 'react-bootstrap/Spinner';
import { useParams} from "react-router-dom";
import TestResume from "../TestResume/TestResume";

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
        if(answerRefs.current[index].getAttribute("data-iscorrect")=="true"){
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
                console.log(res.test)
                setTest(res.test)
                setQuestion(res.test[0])
                setIsLoading(false)
            }
        )
    },[])



    return(
        <>

            <div className={styles.wrapper}>
                <div className={styles.quitAndRestartBtns}>
                        <button className={`${styles.btn} ${styles.restartBtn}`}>рестарт</button>
                        <button className={`${styles.btn} ${styles.quitBtn}`}>изход</button>
                </div>
                <div className={styles.questionAndNavigation}>
                    <div className={styles.questionWrapper}>
                        <p >какво е значението на </p>
                        <p className={styles.questionHeadingFirst}>думата</p>
                        <h4 className={styles.word}>work</h4>
                    </div>
                </div>
                        <div className={styles.answersAndHelp}>
                            <div className={styles.answersBtnsWrapper}>
                                <div className={styles.answersBtnsC}>
                                    <div className={styles.answerBtn}>
                                        <div className={styles.dot}></div>
                                        <p className={styles.answerText}>самолет</p>
                                    </div>
                                    <div className={styles.answerBtn}>
                                        <div className={styles.dot}></div>
                                        <p className={styles.answerText}>самолет</p>
                                    </div>
                                    <div className={styles.answerBtn}>
                                        <div className={styles.dot}></div>
                                        <p className={styles.answerText}>самолет</p>
                                    </div>
                                    <div className={styles.answerBtn}>
                                        <div className={styles.dot}></div>
                                        <p className={styles.answerText}>самолет</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.helpWrapper}>
                                <div className={styles.textAndHeadingPair}>
                                    <p>пример в изречение</p>
                                    <h5>The people who want to receive money should work harder.</h5>
                                </div>

                                <div className={styles.textAndHeadingPair}>
                                    <p>помощ</p>
                                    <h5>Хората, които искат да получават пари, трябва да работят повече.</h5>
                                </div>

                                <button className={styles.forwardBtn}>
                                    НАПРЕД &gt;
                                </button>

                            </div>




                        </div>


            </div>

            {/*<div className={styles.wrapper}>*/}
            {/*    {!isTestDone&&*/}
            {/*        <div ref={containerRef} className={styles.container}>*/}
            {/*            {isLoading&&*/}
            {/*                <>*/}
            {/*                    <h5 className={styles.creatingYouTest}>Creating your test</h5>*/}
            {/*                    <div className={styles.spinner}>*/}
            {/*                        <Spinner animation="border" role="status">*/}
            {/*                            <span className="visually-hidden">Loading...</span>*/}
            {/*                        </Spinner>*/}
            {/*                    </div>*/}
            {/*                </>*/}

            {/*            }*/}

            {/*            {!isLoading&&*/}
            {/*                <>*/}

            {/*                    <div className={styles.heading}>*/}
            {/*                        <div className={styles.questionAndHear}>*/}
            {/*                            <div className={styles.testOutput}>{question.question}</div>*/}
            {/*                            <i onClick={textToSpeechClickHandler} className="fa-solid fa-volume-high"></i>*/}
            {/*                        </div>*/}

            {/*                        <div className={styles.page}>{`Въпрос № ${test.findIndex(el=>el==question)+1}/${test.length}`}</div>*/}
            {/*                    </div>*/}
            {/*                    <div className={styles.answersWrapper}>*/}
            {/*                        <div className={styles.answersC}>*/}

            {/*                            <>*/}
            {/*                                {question.answers.map((el:any,index)=>{*/}
            {/*                                    // @ts-ignore*/}
            {/*                                    return  <div onClick={()=>answerClickHandler(index)} ref={(el:any) => answerRefs.current[index] = el} key={index} data-iscorrect={el.isCorrect} className={styles.answer}>*/}
            {/*                                        <p className={styles.answerText}>{el.answer||el.option}</p>*/}
            {/*                                    </div>*/}
            {/*                                })}*/}
            {/*                            </>*/}



            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*                </>*/}

            {/*            }*/}


            {/*        </div>*/}
            {/*    }*/}

            {/*    {isTestDone&&*/}

            {/*             <TestResume*/}
            {/*                 // @ts-ignore*/}
            {/*                 questions={test.map(question=>question.question)}*/}
            {/*                 // @ts-ignore*/}
            {/*                 answers={test.map(question=>question.answers.find((el:any)=>el.isCorrect))}*/}
            {/*                 testType={testType}*/}
            {/*                 // @ts-ignore*/}
            {/*                 wordsIds={test.map((question:any)=>question.wordId)}*/}
            {/*             />*/}


            {/*        // <div className={styles.testDoneContainer}>*/}
            {/*        //     <h1>Какво научихме днес:</h1>*/}
            {/*        //     <div className={styles.rowsC}>*/}
            {/*        //         {test.map((question:any,index:number)=>{*/}
            {/*        //             const rightAnswer = question.answers.find((el:any)=>el.isCorrect).answer||*/}
            {/*        //                 question.answers.find((el:any)=>el.isCorrect).option*/}
            {/*        //             return <div key={index} className={styles.row}>*/}
            {/*        //                 <span>{question.question}</span>*/}
            {/*        //                 <span>{"--->"}</span>*/}
            {/*        //                 <span>{rightAnswer}</span>*/}
            {/*        //*/}
            {/*        //             </div>*/}
            {/*        //         })}*/}
            {/*        //     </div>*/}
            {/*        //     <button onClick={()=>proceedClickHandler(testType!)} className={styles.proceedBtn}>Продължи</button>*/}
            {/*        //*/}
            {/*        // </div>*/}

            {/*    }*/}

            {/*</div>*/}


        </>
    )
}