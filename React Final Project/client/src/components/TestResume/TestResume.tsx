
import styles from "./TestResume.module.css"
import {request} from "../../functions";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {userContext} from "../../redux/StateProvider/StateProvider";
import {useContext, useEffect, useState} from "react";
// import {useDispatch} from "react-redux";
// import {setUser} from "../../redux/user";
// @ts-ignore
export default function TestResume(){
    const navigate = useNavigate()
    const {testId} = useParams()
    const [questions,setQuestions] = useState([])
    const [answers,setAnswers] = useState([])
    const [testTypes,setTestTypes] = useState({})
    const [testDetails,setTestDetails] = useState({})
    const { userState,setUserState } = useContext(userContext);


    // const dispatch = useDispatch()
    useEffect(()=>{
        request(`unknownWords/testDetails/${testId}`,"GET").subscribe(
            (res:any)=>{
                console.log(res.testDetails.test)
                setTestDetails(res.testDetails.test)
                setQuestions(res.testDetails.test.questions)
                setAnswers(res.testDetails.test.submissions[0].answers)
                setTestTypes(res.testDetails.testTypes)
            }
        )
    },[testId])

    return(
        <>

            <div className={styles.questionsListWrapper}>
                <div className={styles.questionsListC}>

                    {questions.length>0&&questions.map((question,index)=><>

                        {questions[index].testType!==questions.at(index-1).testType&&<h5 className={styles.wordTypeSection}>{testTypes[question.testType]}</h5>}

                        {question.rightAnswerIndex==answers[index].answerIndex&&answers[index].time>20&&
                            <div className={`${styles.questionListItem} ${styles.hardQuestionAnswer} ${styles.wordType}`}>
                                <div className={styles.headings}>
                                    <h6>Позамисли се</h6>
                                    <p>време за отговор <span className={styles.time}>{(answers[index].time/60).toFixed(0)}:{(answers[index].time/60).toFixed(2).toString().split(".")[1]}</span> мин.</p>
                                </div>
                                <div className={styles.wordPair}>
                                    {question.testType=="randomWordsTests"?<p>дума</p>:null}
                                    {question.testType=="fillWord"?<p>изречение</p>:null}
                                    {question.testType=="justQuestion"?<p>въпрос</p>:null}

                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.question}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers.find(el=>el.word == question.question).examples[0].sentenceWhereWordsIsPresent.replace(question.question,"___")}</span> :<></>}
                                    {question.testType=="justQuestion"?<span className={styles.word}>{question.possibleAnswers[answers[index].answerIndex].stringValue}</span>:<></>}

                                </div>
                                <div className={styles.wordPair}>
                                    <p>правилен отговор</p>
                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).translatedText}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).word}</span> :<></>}
                                    {question.testType=="justQuestion"?<h6 className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].stringValue}</h6>:<></>}

                                </div>
                                {question.testType=="fillWord"&&
                                    <div className={styles.wordPair}>
                                        <p>превод</p>
                                        <span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).examples[0].translation}</span>
                                    </div>
                                }
                            </div>
                        }

                        {question.rightAnswerIndex==answers[index].answerIndex&&answers[index].time<=20&&
                            <div className={`
                            ${styles.questionListItem} 
                            ${styles.rightAnswer} 
                            ${question.testType=="randomWordsTests"?styles.wordType:null}
                            ${question.testType=="fillWord"?styles.fillWordType:null}
                            `}>
                                <div className={styles.headings}>
                                    <h6>Затвърдена е</h6>
                                    <p>време за отговор <span className={styles.time}>{(answers[index].time/60).toFixed(0)}:{(answers[index].time/60).toFixed(2).toString().split(".")[1]}</span> мин.</p>
                                </div>
                                <div className={styles.wordPair}>
                                    {question.testType=="randomWordsTests"?<p>дума</p>:null}
                                    {question.testType=="fillWord"?<p>изречение</p>:null}
                                    {question.testType=="justQuestion"?<p>въпрос</p>:null}

                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.question.elementId?.word||question.question.stringValue}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].elementId?.examples[0].sentenceWhereWordsIsPresent.replace(question.question,"___")}</span> :<></>}
                                    {question.testType=="justQuestion"?<span className={styles.word}>{question.possibleAnswers[answers[index].answerIndex].stringValue}</span>:<></>}

                                </div>
                                <div className={styles.wordPair}>
                                    <p>правилен отговор</p>
                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].elementId?.translatedText}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].elementId?.word}</span> :<></>}
                                    {question.testType=="justQuestion"?<h6 className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].stringValue}</h6>:<></>}

                                </div>
                                {question.testType=="fillWord"&&
                                    <div className={styles.wordPair}>
                                        <p>превод</p>
                                        <span className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].elementId?.examples[0].translation}</span>
                                    </div>
                                }
                            </div>
                        }

                        {question.rightAnswerIndex!==answers[index].answerIndex&&
                            <div className={`
                            ${styles.questionListItem} 
                            ${styles.wrongAnswer} 
                            ${question.testType=="randomWordsTests"?styles.wordType:null}
                            ${question.testType=="fillWord"?styles.fillWordType:null}
                            `}>
                                <div className={styles.headings}>
                                    <h6>Ще упражним още</h6>
                                    <p>време за отговор <span className={styles.time}>{(answers[index].time/60).toFixed(0)}:{(answers[index].time/60).toFixed(2).toString().split(".")[1]}</span> мин.</p>
                                </div>
                                <div className={styles.wordPair}>
                                    {question.testType=="randomWordsTests"?<p>дума</p>:<></>}
                                    {question.testType=="fillWord"?<p>изречение</p>:<></>}
                                    {question.testType=="justQuestion"?<p>въпрос</p>:<></>}

                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.question.elementId?.word||question.question.stringValue}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].elementId?.examples[0].sentenceWhereWordsIsPresent.replace(question.question.elementId?.word||question.question.stringValue,"___")}</span> :<></>}
                                    {question.testType=="justQuestion"?<span className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].stringValue}</span>:<></>}

                                </div>
                                <div className={styles.wrongAndRightAnswerPairC}>
                                    <div className={styles.wrongAnswerC}>
                                        <div className={styles.textPair}>
                                            <div className={styles.dot}></div>

                                            {question.testType=="randomWordsTests"?<h6 className={styles.wrongAnswerText}>{question.possibleAnswers[answers[index].answerIndex].elementId?.translatedText||question.possibleAnswers[answers[index].answerIndex].stringValue}</h6>:<></>}
                                            {question.testType=="fillWord"?<h6 className={styles.wrongAnswerText}>{question.possibleAnswers[answers[index].answerIndex].elementId?.word||question.possibleAnswers[answers[index].answerIndex].stringValue}</h6> :<></>}
                                            {question.testType=="justQuestion"?<h6 className={styles.word}>{question.possibleAnswers[answers[index].answerIndex].stringValue}</h6>:<></>}

                                        </div>
                                        <h6 className={styles.answerText}>(твой отговор)</h6>
                                    </div>
                                    <div className={styles.rightAnswerC}>
                                        <div className={styles.textPair}>
                                            <div className={styles.dot}></div>

                                            {question.testType=="randomWordsTests"?<h6 className={styles.wrongAnswerText}>{question.possibleAnswers[question.rightAnswerIndex].elementId?.translatedText||question.possibleAnswers[question.rightAnswerIndex].stringValue}</h6>:<></>}
                                            {question.testType=="fillWord"?<h6 className={styles.wrongAnswerText}>{question.possibleAnswers[question.rightAnswerIndex].elementId?.word||question.possibleAnswers[question.rightAnswerIndex].stringValue}</h6> :<></>}
                                            {question.testType=="justQuestion"?<h6 className={styles.word}>{question.possibleAnswers[question.rightAnswerIndex].stringValue}</h6>:<></>}

                                        </div>
                                        <h6 className={styles.answerText}>(верен отговор)</h6>
                                    </div>
                                </div>
                                {question.possibleAnswers[question.rightAnswerIndex].elementId?.examples[0].sentenceWhereWordsIsPresent&&
                                    <div className={styles.exampleC}>
                                        {question.testType!=="fillWord"&&<div className={styles.headingAndSentencePair}>
                                            <p>пример в изречение:</p>
                                            <div className={styles.sentenceC}>
                                                {question.possibleAnswers[question.rightAnswerIndex].elementId?.examples[0].sentenceWhereWordsIsPresent.split(" ")
                                                    .map(word=>{
                                                        return <p className={word == question.question?styles.questionedWord:styles.wordInSentence}>{word} </p>
                                                    })
                                                }
                                            </div>
                                        </div>}

                                        <div className={styles.headingAndSentencePair}>
                                            <p>превод на изречение:</p>
                                            <p>{question.possibleAnswers[question.rightAnswerIndex].elementId?.examples[0].translation}</p>
                                        </div>
                                        <button className={styles.moreExamplesBtn}>още изречения</button>

                                    </div>
                                }


                            </div>
                        }





                    </>


                    )}









                    {/*<div className={`${styles.questionListItem} ${styles.rightAnswer} ${styles.fillWordType}`}>*/}
                    {/*    <div className={styles.headings}>*/}
                    {/*        <h6>Затвърдена е</h6>*/}
                    {/*        <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.wordPair}>*/}
                    {/*        <p>изречение:</p>*/}
                    {/*        <span className={styles.word}>The car started ________. I’m so scared.</span>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.wordPair}>*/}
                    {/*        <p>правилен отговор</p>*/}
                    {/*        <span className={styles.word}>burning</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={`${styles.questionListItem} ${styles.wrongAnswer} ${styles.fillWordType}`}>*/}
                    {/*    <div className={styles.headings}>*/}
                    {/*        <h6>Ще упражним още</h6>*/}
                    {/*        <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.wordPair}>*/}
                    {/*        <p>изречение:</p>*/}
                    {/*        <span className={styles.word}>The car started ________. I’m so scared.</span>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.wrongAndRightAnswerPairC}>*/}
                    {/*        <div className={styles.wrongAnswerC}>*/}
                    {/*            <div className={styles.textPair}>*/}
                    {/*                <div className={styles.dot}></div>*/}
                    {/*                <h6 className={styles.wrongAnswerText}>climbing</h6>*/}
                    {/*            </div>*/}
                    {/*            <h6 className={styles.answerText}>(твой отговор)</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className={styles.rightAnswerC}>*/}
                    {/*            <div className={styles.textPair}>*/}
                    {/*                <div className={styles.dot}></div>*/}
                    {/*                <h6 className={styles.wrongAnswerText}>burning</h6>*/}
                    {/*            </div>*/}
                    {/*            <h6 className={styles.answerText}>(верен отговор)</h6>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.exampleC}>*/}
                    {/*        <div className={styles.headingAndSentencePair}>*/}
                    {/*            <p>превод на изречение:</p>*/}
                    {/*            <p>Колата започна да гори.</p>*/}
                    {/*        </div>*/}
                    {/*        <button className={styles.moreExamplesBtn}>още изречения</button>*/}

                    {/*    </div>*/}

                    {/*</div>*/}

                    {/*<div className={`${styles.questionListItem} ${styles.hardQuestionAnswer} ${styles.fillWordType}`}>*/}
                    {/*    <div className={styles.headings}>*/}
                    {/*        <h6>Позамисли се</h6>*/}
                    {/*        <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.wordPair}>*/}
                    {/*        <p>изречение</p>*/}
                    {/*        <span className={styles.word}>The car started ________. I’m so scared.</span>*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.wordPair}>*/}
                    {/*        <p>правилен отговор</p>*/}
                    {/*        <span className={styles.word}>burning</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>
        </>

        // <div className={styles.testDoneContainer}>
        //     <h1>Какво научи от теста:</h1>
        //     <div className={styles.rowsC}>
        //         {questions.length>0&&questions.map((question:any,index:number)=>{
        //             return <div key={index} className={styles.row}>
        //                 <span>{question}</span>
        //                 <span>{"--->"}</span>
        //                 <span>{answers[index].answer||answers[index].option||answers[index]}</span>
        //
        //             </div>
        //         })}
        //     </div>
        //     <button onClick={()=>proceedClickHandler(testType)} className={styles.proceedBtn}>Продължи</button>
        //
        // </div>
    )
}