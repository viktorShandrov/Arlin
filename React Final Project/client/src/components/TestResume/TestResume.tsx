
import styles from "./TestResume.module.css"
import {request} from "../../functions";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {userContext} from "../../redux/StateProvider/StateProvider";
import {useContext, useEffect} from "react";
// import {useDispatch} from "react-redux";
// import {setUser} from "../../redux/user";
// @ts-ignore
export default function TestResume(){
    const navigate = useNavigate()
    const {testId} = useParams()
    const { userState,setUserState } = useContext(userContext);


    // const dispatch = useDispatch()
    useEffect(()=>{
        request(`unknownWords/testDetails/${testId}`,"GET").subscribe(
            (res:any)=>{
                console.log(res)
            }
        )
    },[testId])

    return(
        <>
            <div className={styles.questionsListC}>
                <div className={styles.questionListItem}>
                    <div className={styles.headings}>
                        <p>Затвърдена е</p>
                        <p>време за отговор 12:00 мин.</p>
                    </div>
                    <div className={styles.wordPair}>
                        <span>дума</span>
                        <p>Book</p>
                    </div>
                    <div className={styles.wordPair}>
                        <span>правилен отговор</span>
                        <p>книга</p>
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