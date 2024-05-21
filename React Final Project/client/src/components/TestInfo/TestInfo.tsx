
import styles from "./TestInfo.module.css"
import styles1 from "../Table/Table.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import Loading from "../Spinner/Loading";
import Table from "../Table/Table";
export default function TestInfo(){

    const {testId} = useParams()
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(true)
    const [testInfo,setTestInfo] = useState({
        submissions: [],
        assignedTo: [],
        assignedToClone: []

    })
    useEffect(()=>{
        request(`unknownWords/testInfo/${testId}`,"GET").subscribe(
            (res)=>{
                if(res.testInfo.assignedTo){
                    res.testInfo.assignedToClone = [...res.testInfo.assignedTo]
                }
                if(res.testInfo.submissions){
                    res.testInfo.submissions.sort((a,b)=>new Date(b.submissionTime) - new Date(a.submissionTime))
                }
                setTestInfo(res.testInfo)
                console.log(res.testInfo)
                setIsLoading(false)
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
                setTestInfo(old=>{
                    return {
                        ...old,
                        assignedToClone:[...testInfo.assignedTo]
                    }
                })
                // testInfo.assignedToClone = [...testInfo.assignedTo]
                toast.success("Успешно запазихте промените")
            }
        )
    }
    return(
        <>
            {isLoading&&<Loading/>}

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
                            <span className={styles.infoLabel}>активен до</span>
                            <h6 className={styles.infoValue}>{new Date(testInfo.endDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</h6>
                        </div>
                        <div className={styles.infoPair}>
                            <span className={styles.infoLabel}>активен за</span>
                            <h6 className={styles.infoValue}>{testInfo.workTime} часа</h6>
                        </div>
                        <div className={styles.infoPair}>
                            <span className={styles.infoLabel}>направен от</span>
                            <h6 className={styles.infoValue}>{testInfo.createdBy}</h6>
                        </div>
                    </div>
                    {!testInfo.isForTeacher&&
                        <div className={styles.btns}>
                            {!testInfo.isSubmittedAsTest&&!testInfo.isExpired&&
                                <Link to={`/main/test/${testInfo._id}`}>
                                    <button className={styles.begin}>Започни тест</button>
                                </Link>
                            }
                            {(testInfo.isSubmittedAsTest||testInfo.isExpired)&&
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
                        <Table title={"Твои предавания на този тест"} arr={testInfo.submissions} noContentText={"Няма твои предавания"}>
                            {testInfo.submissions.length>0&&testInfo.submissions.map((sub)=>
                                <Link to={`/main/testSubmission/${sub._id}`}>
                                    <div className={styles1.cell}>
                                        <span>{sub.isSubmittedAsTest?"тест":"упражнение"}</span>
                                        <span>детайли</span>
                                    </div>
                                </Link>
                            )}
                        </Table>

                    }
                    {testInfo.isForTeacher&&
                        <>
                                <Table title={"Възложен на"} arr={testInfo.availableStudents} noContentText={"Нямате ученици на които да го възложите"}>
                                    {testInfo.availableStudents.length>0&&testInfo.availableStudents.map((user)=>

                                        <div
                                            onClick={()=>
                                                submissionDetailsClick(user.submissionId,
                                                    testInfo.assignedTo.includes(user._id)?"unassign":"assign",user._id)
                                            }

                                            className={styles1.cell}
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
                                </Table>

                            <button disabled={JSON.stringify(testInfo.assignedToClone.sort())===JSON.stringify(testInfo.assignedTo.sort())} onClick={saveAssignmentsClick} className={styles.saveBtn}>Запази промените</button>
                        </>


                    }

                </div>
            </div>


        </>
    )
}