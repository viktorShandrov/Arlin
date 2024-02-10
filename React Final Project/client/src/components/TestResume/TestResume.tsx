
import styles from "./TestResume.module.css"
import {request} from "../../functions";
import {useNavigate} from "react-router-dom";
// @ts-ignore
export default function TestResume({questions,answers,testType}){
    console.log(answers)
    const navigate = useNavigate()
    const proceedClickHandler = (testType:string)=>{
        request("unknownWords/testCompleted","POST",{testType}).subscribe(
            ()=>{
                navigate("/main/read")
            }
        )
    }
    return(
        <div className={styles.testDoneContainer}>
            <h1>Какво научи от теста:</h1>
            <div className={styles.rowsC}>
                {questions.length>0&&questions.map((question:any,index:number)=>{
                    return <div key={index} className={styles.row}>
                        <span>{question}</span>
                        <span>{"--->"}</span>
                        <span>{answers[index].answer||answers[index].option||answers[index]}</span>

                    </div>
                })}
            </div>
            <button onClick={()=>proceedClickHandler(testType)} className={styles.proceedBtn}>Продължи</button>

        </div>
    )
}