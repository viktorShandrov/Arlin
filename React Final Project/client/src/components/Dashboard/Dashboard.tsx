
import styles from "./Dashboard.module.css"
import {useContext, useEffect, useState} from 'react';

import {request} from "../../functions";
// import {useDispatch, useSelector} from "react-redux";
import DashboardStat from "./DashboardStat/DashboardStat";
// import {setUser} from "../../redux/user";
import {toast} from "react-toastify";
import {rewardNames} from "../../contants";
import {useNavigate} from "react-router-dom";
import NoContentSection from "../NoContentSection/NoContentSection";
import {userContext} from "../../redux/StateProvider/StateProvider";
export default function Dashboard(){
    const { userState,setUserState } = useContext(userContext);
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
        advancements: undefined,
        other: undefined,
        matchFourTests: undefined

    })
    {/*//@ts-ignore*/}
    const [changedCredential,setChangedCredential] = useState({
        field:"",
        oldValue:"",
        newValue:"",
    })
    const [expDueToCountDown,setExpDueToCountDown] = useState("")
    const [advancements,setAdvancements] = useState([])
    const [showedAdvancements,setShowedAdvancements] = useState([])
    // const passedTestNumberElementsRefs = useRef([])
    // const {user} = useSelector((state:any)=>state.user)
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        // setUserState(user)
        setUserInfo(userState())
        {/*//@ts-ignore*/}
        setAdvancements(setAdvancementsForUser(userState()))
        {/*//@ts-ignore*/}
        setShowedAdvancements(setAdvancementsForUser(userState()).splice(0,2))
        const hash = window.location.hash;
        if (hash.slice(hash.lastIndexOf("#")) === "#inventory") {
            const inventoryElement = document.getElementById("inventory");
            if (inventoryElement) {
                inventoryElement.scrollIntoView({ behavior: "smooth" });
            }
        }
        {/*//@ts-ignore*/}
        const timerInterval = setInterval(()=>updateCountdown(timerInterval), 1000);

    },[userState()])
    function setAdvancementsForUser(user:any){
        return [...user.other.advancementsInfo.filter((adv:any)=>user.advancements.includes(adv.id)),
            ...user.other.advancementsInfo.filter((adv:any)=>!user.advancements.includes(adv.id)).map((adv:any)=>{return {...adv,isLocked:true}})]

    }
    function showAllAdvancements(){
        setShowedAdvancements(advancements)
    }

    function updateCountdown(timerInterval:any) {
        if(!userState().expMultiplier.dueTo)  return clearInterval(timerInterval);

        // Get the current time
        const currentTime = new Date();

        // Convert the dueTo string to a Date object
        const expirationTime = new Date(userState().expMultiplier.dueTo);

        // Calculate the remaining time
        {/*//@ts-ignore*/}
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

                setUserState(
                    {...userState(),
                        inventory:{...userState().inventory,
                            expMultiplier:userState().inventory.expMultiplier-1
                        },
                        expMultiplier:{
                            value:1.5,
                            dueTo:expirationTime
                        }}
                )

                // dispatch(setUser(
                //     ))
                setTimeout(()=>{
                    {/*//@ts-ignore*/}
                    const timerInterval = setInterval(()=>updateCountdown(timerInterval), 1000);
                },0)

            }
        )
    }
    const openChest = ()=>{

    }
    const unlockBookForFree = ()=>{
        navigate("/main/AllBooks/freeBookMode")
    }


    return(

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
                                <p className={styles.info}><span>Имейл:</span> {userInfo.email}</p>
                                {/*<button className={styles.changeBtn}>ПРОМЕНИ</button>*/}
                            </article>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Парола:</span> ****************</p>
                                {/*<button className={styles.changeBtn}>ПРОМЕНИ</button>*/}
                            </article>
                            <article className={styles.credential}>
                                <p className={styles.info}><span>Абонаментен план:</span> {(userInfo.plan=="none"?"няма активиран":null)||userInfo.plan||"няма активиран"}</p>
                                {/*<button onClick={()=>navigate("/main/plans")} className={`${styles.changeBtn} ${styles.subscriptionInfo}`}>НАДГРАДИ</button>*/}
                            </article>
                        </div>
                        <div className={styles.userImageC}>
                            <img className={styles.userImage} src={userInfo.imageURL} alt=""/>
                            <span>смени снимка</span>
                        </div>
                    </div>
                </section>

                <section className={styles.badgeSectionWrapper}>
                    <h1 className={styles.heading}>Постижения</h1>
                    <div className={styles.advancementsC}>

                        {showedAdvancements.length>0&&showedAdvancements.map((adv:any)=>{
                            return <div className={styles.advancementC}>
                                <div className={styles.advImageCLocked}>
                                    <img src={`/advancementsIcons/${adv.type}.png`} alt=""/>
                                    {adv.isLocked&&<div className={styles.lockC}>
                                        <i className={`${styles.lock} fa-solid fa-lock`}></i>
                                    </div>}
                                </div>
                                <div className={styles.advName}>
                                    <h5>{adv.name}</h5>
                                </div>
                            </div>
                        })}

                        {showedAdvancements.length<advancements.length&&<button className={styles.showAllBtn} onClick={showAllAdvancements}>покажи всички</button> }

                    </div>
                </section>
                <section id={"inventory"} className={styles.inventoryWrapper}>
                    <h1 className={styles.heading}>Инвентар</h1>
                    {userInfo.inventory&&<div className={styles.inventoryC}>
                        {Object.entries(userInfo.inventory).length>0&&Object.entries(userInfo.inventory).map(([key,value])=><div className={styles.inventoryItem}>
                                <div className={styles.imageC}>
                                    <img src={`/rewardImages/${key}.png`} alt=""/>
                                    <div className={styles.count}>
                                        {/*//@ts-ignore*/}
                                        {value}
                                    </div>

                                </div>
                            {/*//@ts-ignore*/}
                                <h6>{rewardNames[key]}</h6>
                            {/*//@ts-ignore*/}
                                {key==="expMultiplier"&&value>0&&<button disabled={expDueToCountDown} onClick={useExpMultiplier} className={styles.useBtn}>{expDueToCountDown||'използвай'}</button>}
                            {/*//@ts-ignore*/}
                                {key==="freeBook"&&value>0&&<button onClick={unlockBookForFree} className={styles.useBtn}>отключи книга</button>}
                            {/*//@ts-ignore*/}
                                {key==="chest"&&value>0&&<button onClick={openChest} className={styles.useBtn}>отвори</button>}


                            </div>
                        )}

                    </div>}
                        {!userInfo.inventory&&<NoContentSection/>}

                </section>


                <section className={styles.motivationalQuoteWrapper}>
                    <h1 className={styles.quote}>
                        Продължавай напред! Арлин е с теб
                    </h1>
                </section>


                <section className={styles.callToAction}>
                    <div className={styles.callToActionBtsC}>
                        <button className={`${styles.changeBtn}`}>ОСТАВИ БАКШИШ</button>
                        <button onClick={()=>navigate("/main/plans")} className={`${styles.changeBtn} ${styles.subscriptionInfo}`}>НАДГРАДИ</button>
                    </div>

                </section>
            </div>

        </div>

    )
}