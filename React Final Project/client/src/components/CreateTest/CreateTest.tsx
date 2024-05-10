
import styles from "./CreateTest.module.css"
import {useEffect, useRef, useState} from "react";
import useForm from "../../hooks/useForm";
import {request} from "../../functions";
import {forEach} from "react-bootstrap/ElementChildren";
export default function CreateTest(){
    const emptyQuestion = {
        question:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        rightIndex:null
    }
    const [testInfo,setTestInfo] = useState({
        _id:null,
        title:"",
        startTime:null,
        endTime:null,
        questions:[{...emptyQuestion}]
    });
    const [questionForm,onChange,resetForm,populateForm] = useForm({...emptyQuestion})
    const [testDetailsForm,onDetailsChange,resetDetailsForm,populateDetailsForm] = useForm({
        startTime:"",
        endTime:"",
        date:""
    })
    const questionNumbersNavEls = useRef([]);
    const ticksEls = useRef([])
    const testNameInput = useRef(null)
    const [areQuestionsReady,setAreQuestionsReady] = useState(false)
    const addQuestionBtnClick = (isFinal) =>{
        if(Object.values(questionForm).some(el=>!el&&el!==0)) return

        request("unknownWords/addQuestionToTest","POST",{testId:testInfo._id,question:questionForm}).subscribe(
            (res)=>{
                setTestInfo((old)=>{
                    const questions = [...testInfo.questions]
                    questions.pop()
                        return{
                            ...old,
                            questions:[...questions,{...questionForm},{...emptyQuestion}]
                        }
                    }
                )

                resetForm(["testTitle"]);
                resetTicks()

                setTimeout(()=>{
                    resetNavColors()
                    setNavCurrentQuestionColor(-1)
                },0)
                if(isFinal) setAreQuestionsReady(true)
            }
        )


    }
    function setNavCurrentQuestionColor(index){
        questionNumbersNavEls.current.at(index).classList.add(styles.currentQuestion)
    }
    function resetNavColors(){
        for (const el of questionNumbersNavEls.current) {
            el.classList.remove(styles.currentQuestion)
        }
    }
    useEffect(()=>{
        setNavCurrentQuestionColor(-1)
    },[])
    const saveTestNameClick = () =>{
        const testTitle = testNameInput.current.value.trim(); // Trim whitespace


            request("unknownWords/createTest","POST",{testTitle}).subscribe(
                (res)=>{
                    setTestInfo((old)=>{
                        return {
                            ...old,
                            title:testTitle,
                            _id:res
                        }
                    })
                }
            )


    }
    function resetTicks(){
        ticksEls.current.forEach((el)=>{
                el.classList.remove(styles.unticked)
        })
    }
    const tickClick = (index) =>{
        populateForm({
            ...questionForm,
            rightIndex:index
        })
        ticksEls.current.forEach((el,i)=>{
            if(i == index){
                el.classList.remove(styles.unticked)
            } else{
                el.classList.add(styles.unticked)
            }
        })
    }
    const changeQuestionClick = (index:number) =>{
        const question = testInfo.questions[index]
        setTimeout(()=>{
            populateForm(question)
        },0)

        tickClick(question.rightIndex)
        resetNavColors()
        setNavCurrentQuestionColor(index)
    }
    const  saveAdditionaltestInfoClick = (info) =>{
        request("unknownWords/updateTestInfo","POST",{testInfo:info,testId:testInfo._id}).subscribe(
            (res)=>{

            }
        )
    }
    return(
        <>
            <div className={styles.createTestWrapper}>
                {!areQuestionsReady&&
                    <div className={styles.createTestC}>
                        <h1>Създаване на тест</h1>

                        {!testInfo.title&&
                            <>
                                <div className={styles.textBoxAndHeading}>
                                    <p>Име на теста</p>
                                    <input ref={testNameInput} value={questionForm.testTitle} onChange={onChange} name={"testTitle"} className={styles.textBox} type="text"/>
                                </div>
                                <button
                                    disabled={!testNameInput.current || !testNameInput.current.value}
                                    onClick={saveTestNameClick}
                                    className={`${styles.btn} ${styles.nameSave}`}
                                >
                                    запази
                                </button>
                            </>
                        }
                        {testInfo.title&&
                            <h6>{testInfo.title}</h6>
                        }

                        <div className={styles.questionsNav}>
                            {testInfo.questions.length>0&&testInfo.questions.map((question,index)=>{
                                return <div onClick={()=>changeQuestionClick(index)} ref={(el:any) => questionNumbersNavEls.current[index] = el} className={styles.questionNumberNavEl}>
                                    {index+1}
                                </div>
                            })}
                        </div>



                        <div className={styles.textBoxAndHeading}>
                            <p>Въпрос</p>
                            <input disabled={!testInfo.title} name={"question"} onChange={onChange} value={questionForm.question} className={styles.textBox} type="text"/>
                        </div>
                        <div className={styles.optionsC}>
                            {[0,1,2,3].map(index=>
                                <div className={styles.textBoxAndHeading}>
                                    <p>Опция {index+1}</p>
                                    <div className={styles.optionAndTick}>
                                        <input disabled={!testInfo.title} name={`option${index+1}`} onChange={onChange} value={questionForm[`option${index+1}`]} className={styles.textBox} type="text"/>
                                        <div onClick={()=>tickClick(index)} ref={(el:any) => ticksEls.current[index] = el} className={styles.tick}>
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                    </div>

                                </div>
                            )
                            }



                        </div>
                        <div className={styles.btnsC}>
                            <button disabled={Object.values(questionForm).some(el=>!el&&el!==0)} onClick={()=>addQuestionBtnClick(false)} className={`${styles.btn} ${styles.nextQuestion}`}>следващ въпрос</button>
                            <button disabled={Object.values(questionForm).some(el=>!el&&el!==0)} onClick={()=>addQuestionBtnClick(true)} className={`${styles.btn} ${styles.save}`}>Попълних последния въпрос</button>
                            {/*<button disabled={!testInfo.testName||Object.values(questionForm).some(el=>!el)} className={`${styles.btn} ${styles.draft}`}>запази в чернови</button>*/}
                        </div>
                    </div>
                }

                {areQuestionsReady&&
                    <div className={styles.testFundamentalDetailsC}>
                        <div className={styles.textBoxAndHeading}>
                            <p>Дата</p>
                            <input  value={testDetailsForm.date} onChange={onDetailsChange} name={"date"} className={styles.textBox} type="date"/>
                        </div>
                        <div className={styles.textBoxAndHeading}>
                            <p>Начален час</p>
                            <input  value={testDetailsForm.startTime} onChange={onDetailsChange} name={"startTime"} className={styles.textBox} type="time"/>
                        </div>
                        <div className={styles.textBoxAndHeading}>
                            <p>Краен час</p>
                            <input  value={testDetailsForm.endTime} onChange={onDetailsChange} name={"endTime"} className={styles.textBox} type="time"/>
                        </div>
                        <button disabled={Object.values(testDetailsForm).some(el=>!el)} onClick={()=>saveAdditionaltestInfoClick(testDetailsForm)} className={`${styles.btn} ${styles.save}`}>Запазване</button>
                    </div>
                }








                
            </div>





        </>
    )
}