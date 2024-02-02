
import styles from "./Dashboard.module.css"
import  { useEffect, useState} from 'react';

import {request} from "../../functions";
import {useSelector} from "react-redux";
export default function Dashboard(){
    const [userInfo,setUserInfo] = useState({
        randomWordsTests: undefined,
        wordsFromChapterTests: undefined,
        chapterPlotTests: undefined,
        username: undefined,
        email: undefined,
        imageURL: undefined,
        plan: "",
        exp: undefined
    })
    const {user} = useSelector((state:any)=>state.user)

    useEffect(()=>{
        request(`users/userInfo/${user.userId}`).subscribe(
            (res:any)=>{
                setUserInfo(res)
            }
        )
    },[])


    return(
        // <div className={styles.dashboardWrapper}>
        //     <div className={styles.summaryWrapper}>
        //         <DashboardStat name={"Тестове на произволни думи"} value={userInfo.randomWordsTests} />
        //         <DashboardStat name={"Тестове на думи от текст"} value={userInfo.wordsFromChapterTests} />
        //         <DashboardStat name={'Тестове за "Четене с разбиране"'} value={userInfo.chapterPlotTests} />
        //     </div>
        //     <ResponsiveContainer width="100%" height="100%">
        //         <LineChart width={500} height={300} data={data}>
        //             <CartesianGrid strokeDasharray="3 3" />
        //             <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        //             <YAxis />
        //             <Tooltip />
        //             <Legend />
        //             <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        //             <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        //         </LineChart>
        //     </ResponsiveContainer>
        // </div>
        <div className={styles.profileWrapper}>
            <div className={styles.profileC}>
                <section className={styles.credentialsSectionWrapper}>
                    <h1 className={styles.heading}>Credentials</h1>
                    <div className={styles.profileCredC}>
                        <div className={styles.credentialInfos}>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Username:</span> {userInfo.username}</p>
                                <button className={styles.changeBtn}>CHANGE</button>
                            </article>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Email:</span> {userInfo.email}</p>
                                <button className={styles.changeBtn}>CHANGE</button>
                            </article>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Password:</span> ****************</p>
                                <button className={styles.changeBtn}>CHANGE</button>
                            </article>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Subscription plan:</span> {userInfo.plan||"none"}</p>
                                <button className={`${styles.changeBtn} ${styles.subscriptionInfo}`}>UPGRADE</button>
                            </article>
                        </div>
                        <div className={styles.imageC}>
                            <img className={styles.userImage} src={userInfo.imageURL} alt=""/>
                            <span>change avatar</span>
                        </div>
                    </div>
                </section>


                <section className={styles.expWrapper}>
                    <div className={styles.expC}>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                        <div className={styles.fragment}></div>
                    </div>
                    <h6>{userInfo.exp} exp</h6>
                </section>



                <section className={styles.testsSectionWrapper}>
                    <h1 className={styles.heading}>Tests</h1>
                    <div className={styles.testsC}>
                        <article className={styles.testInfo}>
                            <span className={styles.number}>11{userInfo.randomWordsTests}</span>
                            <p className={styles.testName}>тестa на произволни думи</p>
                        </article>
                        <article className={styles.testInfo}>
                            <span className={styles.number}>{userInfo.wordsFromChapterTests}</span>
                            <p className={styles.testName}>тестa на думи от текст</p>
                        </article>
                        <article className={styles.testInfo}>
                            <span className={styles.number}>{userInfo.chapterPlotTests}</span>
                            <p className={styles.testName}>теста за "Четене с разбиране"</p>
                        </article>



                        {/*<DashboardStat name={} value= />*/}
                        {/*//         <DashboardStat name={""} value={userInfo.wordsFromChapterTests} />*/}
                        {/*//         <DashboardStat name={'"'} value={userInfo.chapterPlotTests} />*/}
                    </div>
                </section>
                <section className={styles.motivationalQuoteWrapper}>
                    <h1 className={styles.quote}>
                        Keep going! Arlin is with you
                    </h1>
                </section>


                <section className={styles.callToAction}>
                    <div className={styles.callToActionBtsC}>
                        <button className={`${styles.changeBtn}`}>DONATE</button>
                        <button className={`${styles.changeBtn} ${styles.subscriptionInfo}`}>UPGRADE</button>
                    </div>

                </section>
            </div>

        </div>

    )
}