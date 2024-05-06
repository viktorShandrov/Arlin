
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
    const [testTypes,setTestTypes] = useState({})
    const [testDetails,setTestDetails] = useState({})
    const { userState,setUserState } = useContext(userContext);


    // const dispatch = useDispatch()
    useEffect(()=>{
        request(`unknownWords/testDetails/${testId}`,"GET").subscribe(
            (res:any)=>{
                setTestDetails(res.testDetails.test)
                setQuestions(res.testDetails.test.questions)
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

                        {!question.wrongAnswer.stringValue&&!question.wrongAnswer.wordId&&question.time>20&&
                            <div className={`${styles.questionListItem} ${styles.hardQuestionAnswer} ${styles.wordType}`}>
                                <div className={styles.headings}>
                                    <h6>Позамисли се</h6>
                                    <p>време за отговор <span className={styles.time}>{(question.time/60).toFixed(0)}:{(question.time/60).toFixed(2).toString().split(".")[1]}</span> мин.</p>
                                </div>
                                <div className={styles.wordPair}>
                                    {question.testType=="randomWordsTests"?<p>дума</p>:null}
                                    {question.testType=="fillWord"?<p>изречение</p>:null}

                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.question}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers.find(el=>el.word == question.question).examples[0].sentenceWhereWordsIsPresent.replace(question.question,"___")}</span> :<></>}
                                </div>
                                <div className={styles.wordPair}>
                                    <p>правилен отговор</p>
                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).translatedText}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).word}</span> :<></>}
                                </div>
                                {question.testType=="fillWord"&&
                                    <div className={styles.wordPair}>
                                        <p>превод</p>
                                        <span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).examples[0].translation}</span>
                                    </div>
                                }
                            </div>
                        }

                        {!question.wrongAnswer.stringValue&&!question.wrongAnswer.wordId&&question.time<=20&&
                            <div className={`
                            ${styles.questionListItem} 
                            ${styles.rightAnswer} 
                            ${question.testType=="randomWordsTests"?styles.wordType:null}
                            ${question.testType=="fillWord"?styles.fillWordType:null}
                            `}>
                                <div className={styles.headings}>
                                    <h6>Затвърдена е</h6>
                                    <p>време за отговор <span className={styles.time}>{(question.time/60).toFixed(0)}:{(question.time/60).toFixed(2).toString().split(".")[1]}</span> мин.</p>
                                </div>
                                <div className={styles.wordPair}>
                                    {question.testType=="randomWordsTests"?<p>дума</p>:null}
                                    {question.testType=="fillWord"?<p>изречение</p>:null}

                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.question}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers.find(el=>el.word == question.question).examples[0].sentenceWhereWordsIsPresent.replace(question.question,"___")}</span> :<></>}
                                </div>
                                <div className={styles.wordPair}>
                                    <p>правилен отговор</p>
                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).translatedText}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).word}</span> :<></>}
                                </div>
                                {question.testType=="fillWord"&&
                                    <div className={styles.wordPair}>
                                        <p>превод</p>
                                        <span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).examples[0].translation}</span>
                                    </div>
                                }
                            </div>
                        }

                        {question.wrongAnswer.stringValue||question.wrongAnswer.wordId&&
                            <div className={`
                            ${styles.questionListItem} 
                            ${styles.wrongAnswer} 
                            ${question.testType=="randomWordsTests"?styles.wordType:null}
                            ${question.testType=="fillWord"?styles.fillWordType:null}
                            `}>
                                <div className={styles.headings}>
                                    <h6>Ще упражним още</h6>
                                    <p>време за отговор <span className={styles.time}>{(question.time/60).toFixed(0)}:{(question.time/60).toFixed(2).toString().split(".")[1]}</span> мин.</p>
                                </div>
                                <div className={styles.wordPair}>
                                    {question.testType=="randomWordsTests"?<p>дума</p>:<></>}
                                    {question.testType=="fillWord"?<p>изречение</p>:<></>}

                                    {question.testType=="randomWordsTests"?<span className={styles.word}>{question.question}</span>:<></>}
                                    {question.testType=="fillWord"?<span className={styles.word}>{question.possibleAnswers.find(el=>el.word == question.question).examples[0].sentenceWhereWordsIsPresent.replace(question.question,"___")}</span> :<></>}

                                </div>
                                <div className={styles.wrongAndRightAnswerPairC}>
                                    <div className={styles.wrongAnswerC}>
                                        <div className={styles.textPair}>
                                            <div className={styles.dot}></div>

                                            {question.testType=="randomWordsTests"?<h6 className={styles.wrongAnswerText}>{question.wrongAnswer.stringValue||question.possibleAnswers.find(el=>el._id==question.wrongAnswer.wordId).translatedText}</h6>:<></>}
                                            {question.testType=="fillWord"?<h6 className={styles.wrongAnswerText}>{question.wrongAnswer.stringValue||question.possibleAnswers.find(el=>el._id==question.wrongAnswer.wordId).word}</h6> :<></>}

                                        </div>
                                        <h6 className={styles.answerText}>(твой отговор)</h6>
                                    </div>
                                    <div className={styles.rightAnswerC}>
                                        <div className={styles.textPair}>
                                            <div className={styles.dot}></div>

                                            {question.testType=="randomWordsTests"?<h6 className={styles.wrongAnswerText}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).translatedText}</h6>:<></>}
                                            {question.testType=="fillWord"?<h6 className={styles.wrongAnswerText}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).word}</h6> :<></>}

                                        </div>
                                        <h6 className={styles.answerText}>(верен отговор)</h6>
                                    </div>
                                </div>
                                <div className={styles.exampleC}>
                                    {question.testType!=="fillWord"&&<div className={styles.headingAndSentencePair}>
                                        <p>пример в изречение:</p>
                                        <div className={styles.sentenceC}>
                                            {question.possibleAnswers.find(el=>el._id==question.rightAnswer).examples[0].sentenceWhereWordsIsPresent.split(" ")
                                                .map(word=>{
                                                    return <p className={word == question.question?styles.questionedWord:styles.wordInSentence}>{word} </p>
                                                })
                                            }
                                        </div>
                                    </div>}

                                    <div className={styles.headingAndSentencePair}>
                                        <p>превод на изречение:</p>
                                        <p>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).examples[0].translation}</p>
                                    </div>
                                    <button className={styles.moreExamplesBtn}>още изречения</button>

                                </div>

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