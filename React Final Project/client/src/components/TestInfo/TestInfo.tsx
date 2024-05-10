
import styles from "./TestInfo.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import {useParams} from "react-router-dom";
export default function TestInfo(){

    const {testId} = useParams()
    const [testInfo,setTestInfo] = useState({

    })
    useEffect(()=>{
        request(`unknownWords/testInfo/${testId}`,"GET").subscribe(
            (res)=>{
                setTestInfo(res.testInfo)
            }
        )
    },[])
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

                </div>
            </div>


        </>
    )
}