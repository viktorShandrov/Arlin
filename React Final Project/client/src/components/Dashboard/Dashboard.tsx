
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


    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return(
        <div className={styles.dashboardWrapper}>
            <div className={styles.summaryWrapper}>
                <DashboardStat name={"Тестове на произволни думи"} value={userInfo.randomWordsTests} />
                <DashboardStat name={"Тестове на думи от текст"} value={userInfo.wordsFromChapterTests} />
                <DashboardStat name={'Тестове за "Четене с разбиране"'} value={userInfo.chapterPlotTests} />
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}