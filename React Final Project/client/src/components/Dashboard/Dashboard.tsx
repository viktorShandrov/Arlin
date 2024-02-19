
import styles from "./Dashboard.module.css"
import {useEffect, useState} from 'react';

import {request} from "../../functions";
import {useDispatch, useSelector} from "react-redux";
import DashboardStat from "./DashboardStat/DashboardStat";
import {setUser} from "../../redux/user";
import {toast} from "react-toastify";
import {rewardNames} from "../../contants";
export default function Dashboard(){
    const [userInfo,setUserInfo] = useState({
        randomWordsTests: undefined,
        wordsFromChapterTests: undefined,
        chapterPlotTests: undefined,
        username: undefined,
        email: undefined,
        imageURL: undefined,
        plan: "",
        exp: undefined,
        inventory: {},
    })
    const [changedCredential,setChangedCredential] = useState({
        field:"",
        oldValue:"",
        newValue:"",
    })
    const [expDueToCountDown,setExpDueToCountDown] = useState("")
    // const passedTestNumberElementsRefs = useRef([])
    const {user} = useSelector((state:any)=>state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserInfo(user)
        const hash = window.location.hash;
        if (hash.slice(hash.lastIndexOf("#")) === "#inventory") {
            const inventoryElement = document.getElementById("inventory");
            if (inventoryElement) {
                inventoryElement.scrollIntoView({ behavior: "smooth" });
            }
        }
        const timerInterval = setInterval(()=>updateCountdown(timerInterval), 1000);

    },[user])

    function updateCountdown(timerInterval:any) {
        if(!user.expMultiplier.dueTo)  return clearInterval(timerInterval);

        // Get the current time
        const currentTime = new Date();

        // Convert the dueTo string to a Date object
        const expirationTime = new Date(user.expMultiplier.dueTo);

        // Calculate the remaining time
        const remainingTime = expirationTime - currentTime;

        // Check if the expiration time (dueTo) is in the future
        if (remainingTime > 0) {
            // Convert remaining time to minutes and seconds
            const minutes = Math.floor(remainingTime / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            setExpDueToCountDown(`00:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`)

        } else {
            console.log("The expMultiplier has expired.");
            setExpDueToCountDown("")
            clearInterval(timerInterval); // Stop the timer
        }
    }


    const useExpMultiplier = ()=>{
        request("users/useExpMultiplier","GET").subscribe(
            ()=>{
                toast.success("Успешно активирахте множител на опит")
                const expirationTime = new Date();
                expirationTime.setMinutes(expirationTime.getMinutes() + 30);

                dispatch(setUser(
                    {...user,
                            inventory:{...user.inventory,
                            expMultiplier:user.inventory.expMultiplier-1
                            },
                        expMultiplier:{
                            value:1.5,
                            dueTo:expirationTime
                        }}))
                setTimeout(()=>{
                    const timerInterval = setInterval(()=>updateCountdown(timerInterval), 1000);
                },0)

            }
        )
    }
    const openChest = ()=>{

    }
    const unlockBookForFree = ()=>{

    }


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
            {changedCredential.field&&<div className={styles.popupOverlay}>
                <div className={styles.changeCredentialPopup}>

                </div>
            </div>}
            <div className={styles.profileC}>
                <section className={styles.credentialsSectionWrapper}>
                    <h1 className={styles.heading}>Лични данни</h1>
                    <div className={styles.profileCredC}>
                        <div className={styles.credentialInfos}>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Потребителско име:</span> {userInfo.username}</p>
                                <button className={styles.changeBtn}>ПРОМЕНИ</button>
                            </article>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Имейл:</span> {userInfo.email}</p>
                                <button className={styles.changeBtn}>ПРОМЕНИ</button>
                            </article>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Парола:</span> ****************</p>
                                <button className={styles.changeBtn}>ПРОМЕНИ</button>
                            </article>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Subscription plan:</span> {userInfo.plan||"none"}</p>
                                <button className={`${styles.changeBtn} ${styles.subscriptionInfo}`}>НАДГРАДИ</button>
                            </article>
                        </div>
                        <div className={styles.userImageC}>
                            <img className={styles.userImage} src={userInfo.imageURL} alt=""/>
                            <span>смени снимка</span>
                        </div>
                    </div>
                </section>


                {/*<section className={styles.expWrapper}>*/}
                {/*    <div className={styles.expC}>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*        <div className={styles.fragment}></div>*/}
                {/*    </div>*/}
                {/*    <h6>{userInfo.exp} exp</h6>*/}
                {/*</section>*/}
                <section className={styles.testsSectionWrapper}>
                    <h1 className={styles.heading}>Брой взети тестове</h1>
                    <div className={styles.testsC}>
                        <DashboardStat name={"тестa на произволни думи"} testValue={userInfo.randomWordsTests} />
                        <DashboardStat name={"тестa на думи от текст"} testValue={userInfo.wordsFromChapterTests}  />
                        <DashboardStat name={"теста за 'Четене с разбиране'"} testValue={userInfo.chapterPlotTests}  />
                    </div>
                </section>
                <section id={"inventory"} className={styles.inventoryWrapper}>
                    <h1 className={styles.heading}>Инвентар</h1>
                    <div className={styles.inventoryC}>
                        {Object.entries(userInfo.inventory).length>0&&Object.entries(userInfo.inventory).map(([key,value])=><div className={styles.inventoryItem}>
                                <div className={styles.imageC}>
                                    <img src={`/public/rewardImages/${key}.png`} alt=""/>
                                    <div className={styles.count}>
                                        {value}
                                    </div>

                                </div>
                                <h6>{rewardNames[key]}</h6>
                                {key==="expMultiplier"&&value>0&&<button disabled={expDueToCountDown} onClick={useExpMultiplier} className={styles.useBtn}>{expDueToCountDown||'използвай'}</button>}
                                {key==="freeBook"&&value>0&&<button onClick={unlockBookForFree} className={styles.useBtn}>отключи книга</button>}
                                {key==="chest"&&value>0&&<button onClick={openChest} className={styles.useBtn}>отвори</button>}


                        </div>
                        )}

                    </div>

                </section>


                <section className={styles.motivationalQuoteWrapper}>
                    <h1 className={styles.quote}>
                        Keep going! Arlin is with you
                    </h1>
                </section>


                <section className={styles.callToAction}>
                    <div className={styles.callToActionBtsC}>
                        <button className={`${styles.changeBtn}`}>ДАРИ</button>
                        <button className={`${styles.changeBtn} ${styles.subscriptionInfo}`}>НАДГРАДИ</button>
                    </div>

                </section>
            </div>

        </div>

    )
}