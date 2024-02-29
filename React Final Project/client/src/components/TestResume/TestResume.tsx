
import styles from "./TestResume.module.css"
import {request} from "../../functions";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {userContext} from "../../redux/StateProvider/StateProvider";
import {useContext} from "react";
// import {useDispatch} from "react-redux";
// import {setUser} from "../../redux/user";
// @ts-ignore
export default function TestResume({questions,answers,testType,wordsIds=null}){
    const navigate = useNavigate()
    const { userState,setUserState } = useContext(userContext);


    // const dispatch = useDispatch()
    const proceedClickHandler = (testType:string)=>{
        request("unknownWords/testCompleted","POST",{testType,wordsIds}).subscribe(
            ()=>{
                navigate("/main/read")

                setUserState(
                    {...userState,[testType]:userState[testType]+1}
                )

                // dispatch((dispatch, getState) => {
                //     setTimeout(()=>{
                //         let { user } = getState();
                //         user = user.user
                //         dispatch(setUser());
                //     },0)
                // })
                toast.success("Браво за успеха!")
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