
import styles from "./Test.module.css"
import {useEffect, useRef, useState} from "react";
import {request} from "../../functions";
import Spinner from 'react-bootstrap/Spinner';
import {useNavigate, useParams} from "react-router-dom";
import TestResume from "../TestResume/TestResume";
import Popup from "../Popup/Popup";

export default function Test(){

    const {testId} = useParams()
    const [currentTestType,setCurrentTestType] = useState(null)
    const [test,setTest] = useState([])
    const [testInfo,setTestInfo] = useState(null)
    const [timeForQuestion,setTimeForQuestion] = useState(0)
    const [timerInterval,setTimerInterval] = useState(()=>{})
    const [isCurrentQuestionGuessed,setIsCurrentQuestionGuessed] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [isMobileNavVisible,setIsMobileNavVisible] = useState(false)
    const helpSectionRef = useRef(null)
    const questionNumbersNavEls = useRef([])
    const questionNumbersNavMobileEls = useRef([])
    const [answersHistory,setAnswersHistory] = useState([])
    const [isTestDone,setIsTestDone] = useState(false)
    const [question,setQuestion] = useState({
        possibleAnswers:[{elementId:"",stringValue:""}],
        question:"",
        translation:"",
        sentenceWhereWordsIsPresent:"",
        sentenceWhereWordsIsPresentTranslation: undefined,
        testType:null
    })
    const answerRefs = useRef([])
    const navigate = useNavigate()

    useEffect(() => {
        answerRefs.current = answerRefs.current.slice(0, question.possibleAnswers.length);
    }, [question]);

    const textToSpeechClickHandler = ()=>{
        const voice = new SpeechSynthesisUtterance(question.question)
        window.speechSynthesis.speak(voice)
    }
    const answerCLickEvent = (index:number,question:any)=>{
        //if its already answered ->
        if(testInfo.isExpired||!testId){
            if(answersHistory.some(el=>el.questionIndex == test.indexOf(question))) return
        }

        setIsCurrentQuestionGuessed(true)
        clearInterval(timerInterval)

        const rightAnswerIndex = question.possibleAnswers.findIndex(el=>el.isCorrect)
        const clickedAnswer = question.possibleAnswers[index]
        // @ts-ignore
        setAnswersHistory([...answersHistory,{
            questionIndex: test.indexOf(question),
            rightAnswerIndex:rightAnswerIndex,
            guessedAnswerIndex: index,
            time:timeForQuestion
        }])


        markCorrectAndIncorrectAnswers(index,rightAnswerIndex)



    }
    function resetAnswersColors(){
        for (const answerRef of answerRefs.current) {
            //remove colors
            answerRef.classList.remove(styles.wrongAnswer)
            answerRef.classList.remove(styles.rightAnswer)
            answerRef.classList.remove(styles.incorectAnswers)
            answerRef.classList.remove(styles.guessedAnswer)
            helpSectionRef?.current?.classList.remove(styles.helpSectionIsVisible)
        }
    }
    function checkIfAnsweredAlready(questionIndex){
        const answeredQuestionData = answersHistory.find(el=>el.questionIndex==questionIndex)
        if(answeredQuestionData){
            markCorrectAndIncorrectAnswers(answeredQuestionData.guessedAnswerIndex,answeredQuestionData.rightAnswerIndex)
        }
    }
    function markCorrectAndIncorrectAnswers(guessedIndex,rightAnswerIndex){
        resetAnswersColors()
        answerRefs.current.forEach(el=>{
            el.classList.add(styles.incorectAnswers)
        })
        if(testInfo.isExpired||!testId){
            answerRefs.current[rightAnswerIndex].classList.add(styles.rightAnswer);
            answerRefs.current[guessedIndex].classList.add(styles.wrongAnswer);
        }else{
            answerRefs.current[guessedIndex].classList.add(styles.guessedAnswer);
        }

    }
    const forwardBtnCLick = () =>{
        if(!isCurrentQuestionGuessed) return
        setIsCurrentQuestionGuessed(false)
        const questionIndex = test.findIndex(question1=>question1==question)
        if(answersHistory.length+1==test.length){
            setIsTestDone(true)
        }
        if(answersHistory.length==test.length){

            answersHistory.sort((a,b)=>a.questionIndex - b.questionIndex)

            request("unknownWords/testCompleted","POST",{results:answersHistory,testId:testInfo._id}).subscribe(
                (res:any)=> {
                    navigate(`/main/testResults/${testInfo._id}`)
                })
        }else{
            resetAnswersColors()

            let targetIndex = questionIndex+1

            //if its on the end of the test but has unchecked questions
            answersHistory.sort((a,b)=>a.questionIndex - b.questionIndex)
            if(targetIndex>test.length-1){
                targetIndex = findUnguessedQuestion()
            }

            setQuestion(()=>{
                return test[targetIndex]
            })
            //change colors on test number nav
            questionNumbersNavEls.current[questionIndex].classList.add(styles.alreadyAnsweredQuestion)
            questionNumbersNavEls.current[questionIndex].classList.remove(styles.currentQuestion)
            questionNumbersNavEls.current[targetIndex].classList.add(styles.currentQuestion)
            //mobile nav
            questionNumbersNavMobileEls.current[questionIndex].classList.add(styles.alreadyAnsweredQuestion)
            questionNumbersNavMobileEls.current[questionIndex].classList.remove(styles.currentQuestion)
            questionNumbersNavMobileEls.current[targetIndex].classList.add(styles.currentQuestion)

            setTimeForQuestion(0)
            setTimerInterval(setInterval(()=>{
                setTimeForQuestion(old=>old+1)
            },1000))


        }
    }
    function findUnguessedQuestion(){
        let prevIndex = -1;
        for (const {questionIndex} of answersHistory) {
            if(questionIndex!==prevIndex+1){
                return prevIndex+1;
            }
            prevIndex++
        }
    }

    const changeQuestionClick = (index) =>{
        const questionIndex = test.findIndex(question1=>question1==question)

        questionNumbersNavEls.current[questionIndex].classList.remove(styles.currentQuestion)
        questionNumbersNavEls.current[index].classList.add(styles.currentQuestion)
        //mobile nav
        questionNumbersNavMobileEls.current[questionIndex]?.classList.remove(styles.currentQuestion)
        questionNumbersNavMobileEls.current[index]?.classList.add(styles.currentQuestion)

        setIsMobileNavVisible(false)
        resetAnswersColors();
        checkIfAnsweredAlready(index);
        setCurrentTestType(test[index].testType)
        setQuestion(()=>{
            return test[index]
        })
    }
    const helpBtnCLick = ()=>{
        helpSectionRef.current.classList.add(styles.helpSectionIsVisible)
    }



    useEffect(()=>{
        const r = document.querySelector("#root")
        const t = document.querySelector("#templateWrapper")
        // @ts-ignore
        r.style.setProperty("--navDisplay", "none");
        request("unknownWords/giveTest","POST",{testId,isPersonalExercise:!testId}).subscribe(
            (res:any)=>{
                console.log(res.test)
                setTestInfo(res.test)
                setTest(res.test.questions)
                setQuestion(res.test.questions[0])
                setCurrentTestType(res.test.questions[0].testType)
                setTimeout(()=>{
                    questionNumbersNavEls.current[0].classList.add(styles.currentQuestion)
                    questionNumbersNavMobileEls.current[0]?.classList.add(styles.currentQuestion)
                },0)
                // @ts-ignore
                t.style.setProperty("padding", "0")

                setIsLoading(false)

                setTimerInterval(setInterval(()=>{
                    setTimeForQuestion(old=>old+1)
                },1000))

            }
        )
        return() =>{
            // @ts-ignore
            r.style.setProperty("--navDisplay", "block")
            // @ts-ignore
            t.style.setProperty("padding-left", "80px")
        }


    },[])

    const hideNavMobilePopup=()=>{
        setIsMobileNavVisible(false)
    }

    return(
        <>

            <div className={styles.wrapper}>
                <div className={styles.mainView}>

                    <div className={styles.quitAndRestartBtns}>
                        <button onClick={()=>setIsMobileNavVisible(true)} className={`${styles.btn} ${styles.questionsMenuMobileBtn}`}>въпрос {test.indexOf(question)+1}</button>
                        <button className={`${styles.btn} ${styles.restartBtn}`}><i
                            className="fa-solid fa-rotate-right"></i> рестарт</button>
                        <button className={`${styles.btn} ${styles.quitBtn}`}><i
                            className="fa-solid fa-person-walking-arrow-right"></i> изход</button>
                    </div>
                    <div className={`${styles.questionAndNavigation} ${currentTestType=="fillWord"?styles.sentence:styles.aaa} `}>
                        <div className={styles.questionWrapper}>
                            {currentTestType=="randomWordsTests"&&
                                <>
                                    <p >какво е значението на </p>
                                    <p className={styles.questionHeadingFirst}>думата:</p>
                                </>
                            }
                            {currentTestType=="fillWord"&&
                                <>
                                    <p >попълни пропусната дума в изречението:</p>
                                </>
                            }

                            <h4 className={`${styles.word} ${currentTestType=="fillWord"?styles.sentence:styles.aaa}`}>{question.question.stringValue}</h4>
                            <button onClick={helpBtnCLick} className={styles.helpBtn}>затруднявам се <i className={`fa-solid fa-info ${styles.infoIcon}`}></i></button>
                        </div>
                        <div className={styles.navigationWrapper}>
                            {test.length>0&&test.map((question,index)=>{
                                return <div onClick={()=>changeQuestionClick(index)} ref={(el:any) => questionNumbersNavEls.current[index] = el} className={styles.questionNumberNavEl}>
                                    {index+1}
                                </div>
                            })}
                        </div>

                            <Popup hidePopup={hideNavMobilePopup} styleSelector={styles.navMobilePopup} isWithDisplayNone={!isMobileNavVisible}>
                                <p className={styles.popupHeading}>Всички въпроси:</p>
                                <div className={styles.questionsMenuMobile}>
                                    {test.length>0&&test.map((question,index)=>{
                                        return <div onClick={()=>changeQuestionClick(index)} ref={(el:any) => questionNumbersNavMobileEls.current[index] = el} className={styles.questionNumberNavMobileEl}>
                                            {index+1}
                                        </div>
                                    })}
                                </div>


                            </Popup>

                    </div>
                    <div className={styles.answersAndHelp}>
                        <div className={styles.answersBtnsWrapper}>
                            <div className={styles.answersBtnsC}>
                                {question.possibleAnswers.length>0&&question.possibleAnswers.map((answer, index)=>{
                                   return <div className={styles.answerBtn} onClick={()=>answerCLickEvent(index,question)} ref={(el:any) => answerRefs.current[index] = el} data-iscorrect={answer.isCorrect}>
                                        <div className={styles.dot}></div>
                                        <p className={styles.answerText}>{answer.answer||answer.stringValue}</p>
                                    </div>
                                })
                                }
                            </div>
                        </div>
                        <div className={styles.helpWrapper}>
                            {question.sentenceWhereWordsIsPresent&&
                                <div className={styles.textAndHeadingPair}>
                                {currentTestType=="randomWordsTests"&&
                                    <>
                                        <p>пример в изречение</p>
                                        <p className={styles.warning}>* смисловото значение на думата в изречението може и да не съвпада с възможните отговори</p>
                                        {question.sentenceWhereWordsIsPresent.split(" ")
                                            .map(word=>{
                                                return <h5 className={word == question.question?styles.questionedWord:styles.wordInSentence}>{word} </h5>
                                            })
                                        }
                                    </>
                                }

                                {currentTestType=="fillWord"&&
                                    <>
                                        <p>превод на изречение</p>
                                        <h5>{question.sentenceWhereWordsIsPresentTranslation}</h5>
                                    </>
                                }

                            </div>}
                            {question.sentenceWhereWordsIsPresentTranslation&&
                                <div ref={helpSectionRef} className={styles.textAndHeadingPair}>
                                    <p>помощ</p>
                                    <h5>{question.sentenceWhereWordsIsPresentTranslation}</h5>
                                </div>
                            }



                        </div>





                    </div>
                </div>



                <button onClick={forwardBtnCLick} className={`${styles.forwardBtn} ${isCurrentQuestionGuessed?styles.canProceed:styles.cannotProceed}`}>
                    {isTestDone?"ПРЕДАЙ":<>НАПРЕД &gt;</>}
                </button >



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