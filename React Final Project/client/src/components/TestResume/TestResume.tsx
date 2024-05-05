
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
    const { userState,setUserState } = useContext(userContext);


    // const dispatch = useDispatch()
    useEffect(()=>{
        request(`unknownWords/testDetails/${testId}`,"GET").subscribe(
            (res:any)=>{
                console.log(res.testDetails.questions)
                setQuestions(res.testDetails.questions)
            }
        )
    },[testId])

    return(
        <>

            <div className={styles.questionsListWrapper}>
                <div className={styles.questionsListC}>
                    {questions.length>0&&questions.map(question=>{
                        console.log(question)
                        if(!question.wrongAnswer.stringValue&&!question.wrongAnswer.wordId&&question.timeTaken>12){

                        }else if(!question.wrongAnswer.stringValue&&!question.wrongAnswer.wordId){
                            return <div className={`
                            ${styles.questionListItem} 
                            ${styles.rightAnswer} 
                            ${question.testType=="randomWordsTests"?styles.wordType:null}
                            ${question.testType=="fillWord"?styles.fillWordType:null}
                            `}>
                                <div className={styles.headings}>
                                    <h6>Затвърдена е</h6>
                                    <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>
                                </div>
                                <div className={styles.wordPair}>
                                    {question.testType=="randomWordsTests"?<p>дума</p>:null}
                                    {question.testType=="fillWord"?<p>изречение</p>:null}
                                    <span className={styles.word}>{question.question}</span>
                                </div>
                                <div className={styles.wordPair}>
                                    <p>правилен отговор</p>
                                    <span className={styles.word}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).translatedText}</span>
                                </div>
                            </div>
                        }else if(question.wrongAnswer.stringValue||question.wrongAnswer.wordId){
                            return <div className={`
                            ${styles.questionListItem} 
                            ${styles.wrongAnswer} 
                            ${question.testType=="randomWordsTests"?styles.wordType:null}
                            ${question.testType=="fillWord"?styles.fillWordType:null}
                            `}>
                                <div className={styles.headings}>
                                    <h6>Ще упражним още</h6>
                                    <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>
                                </div>
                                <div className={styles.wordPair}>
                                    {question.testType=="randomWordsTests"?<p>дума</p>:<></>}
                                    {question.testType=="fillWord"?<p>изречение</p>:<></>}
                                    <span className={styles.word}>{question.question}</span>
                                </div>
                                <div className={styles.wrongAndRightAnswerPairC}>
                                    <div className={styles.wrongAnswerC}>
                                        <div className={styles.textPair}>
                                            <div className={styles.dot}></div>
                                            <h6 className={styles.wrongAnswerText}>{question.wrongAnswer.stringValue||question.possibleAnswers.find(el=>el._id==question.wrongAnswer.wordId).translatedText}</h6>
                                        </div>
                                        <h6 className={styles.answerText}>(твой отговор)</h6>
                                    </div>
                                    <div className={styles.rightAnswerC}>
                                        <div className={styles.textPair}>
                                            <div className={styles.dot}></div>
                                            <h6 className={styles.wrongAnswerText}>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).translatedText}</h6>
                                        </div>
                                        <h6 className={styles.answerText}>(верен отговор)</h6>
                                    </div>
                                </div>
                                <div className={styles.exampleC}>
                                    <div className={styles.headingAndSentencePair}>
                                        <p>пример в изречение:</p>
                                        <div className={styles.sentenceC}>
                                            {question.possibleAnswers.find(el=>el._id==question.rightAnswer).examples[0].sentenceWhereWordsIsPresent.split(" ")
                                                .map(word=>{
                                                    return <p className={word == question.question?styles.questionedWord:styles.wordInSentence}>{word} </p>
                                                })
                                            }
                                        </div>



                                    </div>
                                    <div className={styles.headingAndSentencePair}>
                                        <p>превод на изречение:</p>
                                        <p>{question.possibleAnswers.find(el=>el._id==question.rightAnswer).examples[0].translation}</p>
                                    </div>
                                    <button className={styles.moreExamplesBtn}>още изречения</button>

                                </div>

                            </div>
                        }

                    })}




                    <div className={`${styles.questionListItem} ${styles.hardQuestionAnswer} ${styles.wordType}`}>
                        <div className={styles.headings}>
                            <h6>Позамисли се</h6>
                            <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>
                        </div>
                        <div className={styles.wordPair}>
                            <p>дума</p>
                            <span className={styles.word}>Book</span>
                        </div>
                        <div className={styles.wordPair}>
                            <p>правилен отговор</p>
                            <span className={styles.word}>книга</span>
                        </div>
                    </div>




                    <div className={`${styles.questionListItem} ${styles.rightAnswer} ${styles.fillWordType}`}>
                        <div className={styles.headings}>
                            <h6>Затвърдена е</h6>
                            <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>
                        </div>
                        <div className={styles.wordPair}>
                            <p>изречение:</p>
                            <span className={styles.word}>The car started ________. I’m so scared.</span>
                        </div>
                        <div className={styles.wordPair}>
                            <p>правилен отговор</p>
                            <span className={styles.word}>burning</span>
                        </div>
                    </div>

                    <div className={`${styles.questionListItem} ${styles.wrongAnswer} ${styles.fillWordType}`}>
                        <div className={styles.headings}>
                            <h6>Ще упражним още</h6>
                            <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>
                        </div>
                        <div className={styles.wordPair}>
                            <p>изречение:</p>
                            <span className={styles.word}>The car started ________. I’m so scared.</span>
                        </div>
                        <div className={styles.wrongAndRightAnswerPairC}>
                            <div className={styles.wrongAnswerC}>
                                <div className={styles.textPair}>
                                    <div className={styles.dot}></div>
                                    <h6 className={styles.wrongAnswerText}>climbing</h6>
                                </div>
                                <h6 className={styles.answerText}>(твой отговор)</h6>
                            </div>
                            <div className={styles.rightAnswerC}>
                                <div className={styles.textPair}>
                                    <div className={styles.dot}></div>
                                    <h6 className={styles.wrongAnswerText}>burning</h6>
                                </div>
                                <h6 className={styles.answerText}>(верен отговор)</h6>
                            </div>
                        </div>
                        <div className={styles.exampleC}>
                            <div className={styles.headingAndSentencePair}>
                                <p>превод на изречение:</p>
                                <p>Колата започна да гори.</p>
                            </div>
                            <button className={styles.moreExamplesBtn}>още изречения</button>

                        </div>

                    </div>

                    <div className={`${styles.questionListItem} ${styles.hardQuestionAnswer} ${styles.fillWordType}`}>
                        <div className={styles.headings}>
                            <h6>Позамисли се</h6>
                            <p>време за отговор <span className={styles.time}>02:00</span> мин.</p>
                        </div>
                        <div className={styles.wordPair}>
                            <p>изречение</p>
                            <span className={styles.word}>The car started ________. I’m so scared.</span>
                        </div>
                        <div className={styles.wordPair}>
                            <p>правилен отговор</p>
                            <span className={styles.word}>burning</span>
                        </div>
                    </div>

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