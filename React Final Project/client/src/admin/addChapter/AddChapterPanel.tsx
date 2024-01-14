import {useState} from "react";
import {request} from "../../functions";
import styles from "../addBook/AddBook.module.css";
import {toast} from "react-toastify";
export default function AddChapterPanel(){
    const [formValues,setFormValues] = useState({
        bookId:"",
        chapterName:"",
        chapterText:"",
    })
    const [questions,setQuestions] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const onFormChange=(e:any)=>{

        setFormValues(state=>{
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })
    }

    const submitForm = ()=>{
        // console.log(JSON.stringify(form))
        setIsLoading(true)
        if(questions.length>0){
            const payload = {...formValues,questions}
            request("chapters/create","POST",payload).subscribe(
                ()=>{
                    setIsLoading(false)
                    toast.success("Successfully created")
                },
            )
        }else{
            request("chapters/createChapterQuestions","POST",formValues).subscribe(
                (res:any)=>{
                    setQuestions(res)
                    setIsLoading(false)
                },
            )
        }

    }
    const newChapterBtnHandler = ()=>{
        setQuestions([])
        setFormValues(state=>{
            return {
                ...state,
                chapterText:"",
                chapterName:""
            }
        })
    }
    return(
        <>

                <h1>Create chapter</h1>
                <div className={styles.formWrapper}>
                    <div className={styles.formC}>
                        <input name={"bookId"} placeholder={"BookId"} value={formValues.bookId} onChange={onFormChange} />
                        <input name={"chapterName"} placeholder={"Chapter name"} value={formValues.chapterName} onChange={onFormChange} />
                        <textarea name={"chapterText"} placeholder={"Book chapterText"} value={formValues.chapterText} onChange={onFormChange} />
                        <button disabled={isLoading} onClick={submitForm} className={styles.submitBtn}>Create</button>
                    </div>
                </div>
                        <button disabled={isLoading} onClick={newChapterBtnHandler}>Нова глава</button>
            {/*// @ts-ignore*/}
                {questions.length>0&&questions[0].options&&<div className={styles.questionsC}>
                    {questions.map((question:any,index:number)=>{
                        return <div key={index} className={styles.questionC}>
                            <label className={styles.question}>{question.question}</label>
                            <p className={styles.answer}>{question.options[0].option}</p>
                            <p className={styles.answer}>{question.options[1].option}</p>
                            <p className={styles.answer}>{question.options[2].option}</p>
                            <p className={styles.answer}>{question.options[3].option}</p>
                        </div>
                    })}
                </div>}
            {/*// @ts-ignore*/}
            {questions.length>0&&!questions[0].options&&<p>Problem with questions</p>}

        </>

    )
}