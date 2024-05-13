
import styles from "./TestsDashboard.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import {Link} from "react-router-dom";
import Loading from "../Spinner/Loading";
export default function TestsDashboard(){
    const [testElTables,setTestElTables] = useState({
        madeByUser: [],
        submittedByUser: [],
        assignedToUser: [],
        stats:{}
    })
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        request("unknownWords/testElements","GET").subscribe(
            (res)=>{
                console.log(res)
                setTestElTables(res.testEls)
                setIsLoading(false)
            }
        )
    },[])
    return(
        <>
            {isLoading&&<Loading/>}
            <div className={styles.testDashboardWrapper}>
                <div className={styles.testDashboardC}>
                    <h1 className={styles.header}>Тестове</h1>
                    <div className={styles.stats}>
                        {testElTables.stats.allSubs&&
                            <h6><span className={styles.number}>{testElTables.stats.allSubs}</span> общо предадени от всички</h6>
                        }
                        {testElTables.stats.averageGrade&&
                            <h6><span className={styles.number}>{testElTables.stats.averageGrade}</span> средна оценка от твоя клас</h6>
                        }
                        {testElTables.stats.madeByTeachersClassCount&&
                            <h6><span className={styles.number}>{testElTables.stats.madeByTeachersClassCount}</span> направени теста от твоя клас</h6>
                        }
                        {testElTables.stats.createdByTeacher&&
                            <h6><span className={styles.number}>{testElTables.stats.createdByTeacher}</span> създадени от теб</h6>
                        }
                    </div>





                    <div className={styles.tables}>
                        {testElTables.assignedToUser&&
                            <div className={styles.submissionsTable}>
                                <div className={`${styles.cell} ${styles.heading}`}>
                                    <h6>Възложени тестове</h6>
                                </div>
                                {testElTables.assignedToUser.length>0&&testElTables.assignedToUser.map((test)=>
                                    <Link to={`/main/testInfo/${test.testId}`}>
                                        <div className={styles.cell}>
                                            <span>{test.title}</span>
                                            <span>детайли</span>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        }
                        {testElTables.madeByUser&&
                            <div className={styles.submissionsTable}>
                                <div className={`${styles.cell} ${styles.heading}`}>
                                    <h6>Създадени твои тестове</h6>
                                </div>
                                {testElTables.madeByUser.length>0&&testElTables.madeByUser.map((test)=>
                                    <Link to={`/main/testInfo/${test._id}`}>
                                        <div className={styles.cell}>
                                            <span>{test.title}</span>
                                            <span>детайли</span>
                                        </div>
                                    </Link>
                                )}
                                <Link to={`/main/createTest`}>
                                    <div className={`${styles.cell} ${styles.createTestBtn}`}>
                                        <span>+ създай тест</span>
                                    </div>
                                </Link>
                            </div>
                        }

                        {testElTables.submittedByUser&&
                            <div className={styles.submissionsTable}>
                                <div className={`${styles.cell} ${styles.heading}`}>
                                    <h6>Предадени твои тестове</h6>
                                </div>
                                {testElTables.submittedByUser.length>0&&testElTables.submittedByUser.map((test)=>
                                    <Link to={`/main/testSubmission/${test.submissionId}`}>
                                        <div className={styles.cell}>
                                            <span>{test.title}</span>
                                            <span>детайли</span>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        }

                    </div>



                </div>
            </div>
        </>

        

    )
}