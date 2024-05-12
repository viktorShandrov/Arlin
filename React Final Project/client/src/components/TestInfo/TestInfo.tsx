
import styles from "./TestInfo.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
export default function TestInfo(){

    const {testId} = useParams()
    const navigate = useNavigate()
    const [testInfo,setTestInfo] = useState({
        submissions: [],
        assignedTo: []

    })
    useEffect(()=>{
        request(`unknownWords/testInfo/${testId}`,"GET").subscribe(
            (res)=>{
                setTestInfo(res.testInfo)
                console.log(res.testInfo)
            }
        )
    },[])
    const submissionDetailsClick = (subId,operation,userId) => {
            if(!subId){
                if(operation=="assign"){
                    setTestInfo(old=>{
                        return {
                            ...old,
                            assignedTo: [...old.assignedTo,userId]
                        }
                    })
                }else if(operation=="unassign"){
                    setTestInfo(old=>{
                        const temp = {...old}
                        temp.assignedTo.splice(old.assignedTo.indexOf(userId),1)
                        return temp
                    })
                }

            }else{
                navigate(`/main/testSubmission/${subId}`)
            }

    }

    const saveAssignmentsClick = () =>{
        request("unknownWords/updateTestInfo","POST",{testInfo:{assignedTo:testInfo.assignedTo},testId:testInfo._id}).subscribe(
            (res)=>{
                toast.success("Успешно запзихте промените")
            }
        )
    }
    return(
        <>
            <div className={styles.testInfoWrapper}>
                <div className={styles.testInfoC}>
                    <h1>Информация за тест</h1>
                    <div className={styles.infoPairsC}>
                        <div className={styles.infoPair}>
                            <span className={styles.infoLabel}>име на теста</span>
                            <h6 className={styles.infoValue}>{testInfo.title}</h6>
                        </div>
                        <div className={styles.infoPair}>
                            <span className={styles.infoLabel}>брой въпроси</span>
                            <h6 className={styles.infoValue}>{testInfo.questionsCount}</h6>
                        </div>
                        <div className={styles.infoPair}>
                            <span className={styles.infoLabel}>начало</span>
                            <h6 className={styles.infoValue}>{new Date(testInfo.startDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</h6>
                        </div>
                        <div className={styles.infoPair}>
                            <span className={styles.infoLabel}>краен срок</span>
                            <h6 className={styles.infoValue}>{new Date(testInfo.endDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</h6>
                        </div>
                        <div className={styles.infoPair}>
                            <span className={styles.infoLabel}>продължителност</span>
                            <h6 className={styles.infoValue}>{testInfo.workTime}</h6>
                        </div>
                        <div className={styles.infoPair}>
                            <span className={styles.infoLabel}>направен от</span>
                            <h6 className={styles.infoValue}>{testInfo.createdBy}</h6>
                        </div>
                    </div>
                    {!testInfo.isForTeacher&&
                        <div className={styles.btns}>
                            {!testInfo.isSubmittedAsTest&&
                                <Link to={`/main/test/${testInfo._id}`}>
                                    <button className={styles.begin}>Започни тест</button>
                                </Link>
                            }
                            {testInfo.isSubmittedAsTest&&
                                <Link to={`/main/test/${testInfo._id}`}>
                                    <button className={styles.exercise}>Упражнявай</button>
                                </Link>
                            }
                            {testInfo.isUserAbleToEdit&&
                                <Link to={`/main/test/${testInfo._id}/edit`}>
                                    <button className={styles.edit}>Редактиране</button>
                                </Link>
                            }

                        </div>
                    }

                    {!testInfo.isForTeacher&&
                    <div className={styles.submissionsTable}>
                        <div className={`${styles.cell} ${styles.heading}`}>
                            <h6>Твои предавания на този тест</h6>
                        </div>
                        {testInfo.submissions.length>0&&testInfo.submissions.map((sub)=>
                            <Link to={`/main/testSubmission/${sub._id}`}>
                                <div className={styles.cell}>
                                    <span>{sub.isSubmittedAsTest?"тест":"упражнение"}</span>
                                    <span>детайли</span>
                                </div>
                            </Link>
                        )}
                    </div>
                    }
                    {testInfo.isForTeacher&&
                        <>
                            <div className={styles.submissionsTable}>
                                <div className={`${styles.cell} ${styles.heading}`}>
                                    <h6>Възложен на</h6>
                                </div>
                                {testInfo.availableStudents.length>0&&testInfo.availableStudents.map((user)=>

                                    <div
                                        onClick={()=>
                                            submissionDetailsClick(user.submissionId,
                                                testInfo.assignedTo.includes(user._id)?"unassign":"assign",user._id)
                                        }

                                        className={styles.cell}
                                    >
                                        <span>{user.firstName}</span>
                                        {testInfo.assignedTo.includes(user._id)&&
                                            <>
                                                <span className={user.submissionId?styles.submitted:styles.notSubmitted}>{user.submissionId?"предал":"непредал"}</span>
                                                <span>{user.submissionId?"детайли":"отмяна"}</span>
                                            </>
                                        }
                                        {!testInfo.assignedTo.includes(user._id)&&
                                            <>
                                                <span className={styles.notAssigned}>невъзложено</span>
                                                <span>възложи</span>
                                            </>

                                        }
                                    </div>

                                )}
                            </div>
                            <button onClick={saveAssignmentsClick} className={styles.saveBtn}>Запази промените</button>
                        </>


                    }

                </div>
            </div>


        </>
    )
}