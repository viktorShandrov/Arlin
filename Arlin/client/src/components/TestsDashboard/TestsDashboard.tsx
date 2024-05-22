
import styles from "./TestsDashboard.module.css"
import {useContext, useEffect, useState} from "react";
import {request} from "../../functions";
import {Link} from "react-router-dom";
import Loading from "../Spinner/Loading";
import Table from "../Table/Table";
import styles1 from "../Table/Table.module.css"
import {userContext} from "../../redux/StateProvider/StateProvider";
export default function TestsDashboard(){
    {/*// @ts-ignore*/}
    const { userState,setUserState } = useContext(userContext);
    const [testElTables,setTestElTables] = useState({
        madeByUser: [],
        submittedByUser: [],
        assignedToUser: [],
        stats:{}
    })
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        request("unknownWords/testElements","GET").subscribe(

            (res:any)=>{
                console.log(res)
                if(res.testEls.submittedByUser){
                    {/*// @ts-ignore*/}
                    res.testEls.submittedByUser.sort((a,b)=>new Date(b.submissionTime) - new Date(a.submissionTime))
                }
                setTestElTables(res.testEls)
                console.log(res.testEls)
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
                        {/*// @ts-ignore*/}
                        {!!testElTables.stats.allSubs&&
                            /*// @ts-ignore*/
                            <h6><span className={styles.number}>{testElTables.stats.allSubs}</span> общо предадени теста от всички</h6>
                        }
                        {/*// @ts-ignore*/}
                        {!!testElTables.stats.averageGrade&&
                            /*// @ts-ignore*/
                            <h6><span className={styles.number}>{testElTables.stats.averageGrade.toFixed(2)}</span> средна оценка от твоя клас</h6>
                        }
                        {/*// @ts-ignore*/}
                        {!!testElTables.stats.madeByTeachersClassCount&&
                            /*// @ts-ignore*/
                            <h6><span className={styles.number}>{testElTables.stats.madeByTeachersClassCount}</span> направени теста от твоя клас</h6>
                        }
                        {/*// @ts-ignore*/}
                        {!!testElTables.stats.createdByTeacher&&
                            /*// @ts-ignore*/
                            <h6><span className={styles.number}>{testElTables.stats.createdByTeacher}</span> създадени от теб тестове</h6>
                        }
                    </div>
                    {userState().role!=="teacher"&&
                        <div className={styles.btns}>
                            {<Link to={"/main/test"}>
                                <button className={`${styles.btn} ${styles.exBtn}`}>направи упражнение</button>
                            </Link>}
                        </div>
                    }

                    
                    <div className={styles.tables}>
                        {testElTables.assignedToUser&&
                            <Table title={"Възложени тестове"} arr={testElTables.assignedToUser}>
                                {testElTables.assignedToUser.length>0&&testElTables.assignedToUser.reverse().map((test)=>
                                    /*// @ts-ignore*/
                                    <Link to={`/main/testInfo/${test.testId}`}>
                                        <div className={styles1.cell}>
                                            {/*// @ts-ignore*/}
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
                                    /*// @ts-ignore*/
                                        <Link to={`/main/testInfo/${test._id}`}>
                                            <div className={styles1.cell}>
                                    {/*// @ts-ignore*/}
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
                            // @ts-ignore*/
                            <Table title={"Предадени тестове"} arr={testElTables.submittedByUser.filter(t=>!t.isPersonalExercise&&!t.isTestSubmittedOnlyAsExercise)}>
                        {/*// @ts-ignore*/}
                        {testElTables.submittedByUser.filter(t=>!t.isPersonalExercise&&!t.isTestSubmittedOnlyAsExercise).length>0&&testElTables.submittedByUser.filter(t=>!t.isPersonalExercise&&!t.isTestSubmittedOnlyAsExercise).reverse().map((test)=>
                                    {
                                        {/*// @ts-ignore*/}
                                            return  <Link to={`/main/testInfo/${test.testId}`}>
                                                <div className={styles1.cell}>
                                                    {/*// @ts-ignore*/}
                                                    <span>{test.title}</span>
                                                    <span>детайли</span>
                                                </div>
                                            </Link>
                                        }
                                )}
                            </Table>
                        }
                        {testElTables.submittedByUser&&
                            // @ts-ignore*/
                            <Table title={"Предадени упражнениея"} arr={testElTables.submittedByUser.filter(t=>t.isPersonalExercise||t.isTestSubmittedOnlyAsExercise)}>
                                {/*// @ts-ignore*/}
                                {testElTables.submittedByUser.filter(t=>t.isPersonalExercise||t.isTestSubmittedOnlyAsExercise).length>0&&testElTables.submittedByUser.filter(t=>t.isPersonalExercise||t.isTestSubmittedOnlyAsExercise).map((test)=>
                                {
                                    {/*// @ts-ignore*/}
                                        return  <Link to={`/main/testSubmission/${test.submissionId}`}>
                                            <div className={styles1.cell}>
                                                {/*// @ts-ignore*/}
                                                <span>{test.title}</span>
                                                <span>детайли</span>
                                            </div>
                                        </Link>
                                }
                                )}
                            </Table>
                        }
                    </div>
                </div>
            </div>
        </>

        

    )
}