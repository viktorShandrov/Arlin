
import styles from "./TestsDashboard.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import {Link} from "react-router-dom";
import Loading from "../Spinner/Loading";
import Table from "../Table/Table";
import styles1 from "../Table/Table.module.css"
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
                if(res.testEls.submittedByUser){
                    res.testEls.submittedByUser.sort((a,b)=>new Date(b.submissionTime) - new Date(a.submissionTime))
                }
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
                        {!!testElTables.stats.allSubs&&
                            <h6><span className={styles.number}>{testElTables.stats.allSubs}</span> общо предадени от всички</h6>
                        }
                        {!!testElTables.stats.averageGrade&&
                            <h6><span className={styles.number}>{testElTables.stats.averageGrade}</span> средна оценка от твоя клас</h6>
                        }
                        {!!testElTables.stats.madeByTeachersClassCount&&
                            <h6><span className={styles.number}>{testElTables.stats.madeByTeachersClassCount}</span> направени теста от твоя клас</h6>
                        }
                        {!!testElTables.stats.createdByTeacher&&
                            <h6><span className={styles.number}>{testElTables.stats.createdByTeacher}</span> създадени от теб</h6>
                        }
                    </div>
                    <div className={styles.tables}>
                        {testElTables.assignedToUser&&
                            <Table title={"Възложени тестове"} arr={testElTables.assignedToUser}>
                                {testElTables.assignedToUser.length>0&&testElTables.assignedToUser.map((test)=>
                                    <Link to={`/main/testInfo/${test.testId}`}>
                                        <div className={styles1.cell}>
                                            <span>{test.title}</span>
                                            <span>детайли</span>
                                        </div>
                                    </Link>
                                )}
                            </Table>
                        }
                        {testElTables.madeByUser&&
                            <Table title={"Създадени твои тестове"} arr={testElTables.madeByUser}>
                                <>
                                    {testElTables.madeByUser.length>0&&testElTables.madeByUser.map((test)=>
                                        <Link to={`/main/testInfo/${test._id}`}>
                                            <div className={styles1.cell}>
                                                <span>{test.title}</span>
                                                <span>детайли</span>
                                            </div>
                                        </Link>
                                    )}
                                    <Link to={`/main/createTest`}>
                                        <div className={`${styles1.cell} ${styles1.createTestBtn}`}>
                                            <span>+ създаване на тест</span>
                                        </div>
                                    </Link>
                                </>

                            </Table>
                        }
                        {testElTables.submittedByUser&&
                            <Table title={"Предадени твои тестове"} arr={testElTables.submittedByUser}>
                                {testElTables.submittedByUser.length>0&&testElTables.submittedByUser.map((test)=>
                                    <Link to={`/main/testInfo/${test.testId}`}>
                                        <div className={styles1.cell}>
                                            <span>{test.title}</span>
                                            <span>детайли</span>
                                        </div>
                                    </Link>
                                )}
                            </Table>
                        }
                    </div>
                </div>
            </div>
        </>

        

    )
}