
import styles from "./Dashboard.module.css"
import  { useEffect, useState} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {request} from "../../functions";
import {useSelector} from "react-redux";
import DashboardStat from "./DashboardStat/DashboardStat";
export default function Dashboard(){
    const [userInfo,setUserInfo] = useState({
        randomWordsTests: undefined,
        wordsFromChapterTests: undefined,
        chapterPlotTests: undefined
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
            <section className={styles.credentialsSectionWrapper}>
                <h1 className={styles.heading}>Credentials</h1>
                <div className={styles.profileC}>
                    <div className={styles.credentialInfos}>
                        <article className={styles.credential}>
                            <h5 className={styles.info}><span>Username:</span> {userInfo.username}</h5>
                            <button className={styles.changeBtn}>CHANGE</button>
                        </article>
                        <article className={styles.credential}>
                            <h5 className={styles.info}><span>Email:</span> {userInfo.email}</h5>
                            <button className={styles.changeBtn}>CHANGE</button>
                        </article>
                        <article className={styles.credential}>
                            <h5 className={styles.info}><span>Password:</span> ********</h5>
                            <button className={styles.changeBtn}>CHANGE</button>
                        </article>
                        <article className={styles.credential}>
                            <h5 className={styles.info}><span>Subscription plan:</span> {userInfo.plan||"none"}</h5>
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
        </div>

    )
}