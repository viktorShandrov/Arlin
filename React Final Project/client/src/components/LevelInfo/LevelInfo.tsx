
import styles from "./LevelInfo.module.css"
import {useEffect, useRef, useState} from "react";
import { useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import PopUpOverlay from "../PopUpOverlay/PopUpOverlay";
import {rewardNames} from "../../contants";
export default function LevelInfo(){
    const {user} = useSelector((state:any)=>state.user)

    const levelInfoWrapperRef=useRef(null)
    const [userCurrentLevel,setUserCurrentLevel] = useState(0)
    const [isRewardPopupVisible,setIsRewardPopupVisible] = useState(false)
    const [reward,setReward] = useState("")
    const [userInventory,setUserInventory] = useState(null)
    const navigate = useNavigate()

    // const [exp,setExp] = useState(0)

    useEffect(()=>{
        setTimeout(()=>{
            calculateLevel(user.exp)
        },0)
    },[])
    useEffect(()=>{
        showPopup()
        // saveExpToLocalStorage()
    },[user.exp])
    useEffect(()=>{
        setUserInventory((old)=>{
            if(!old) return user.inventory
            for (const [key,value] of Object.entries(user.inventory)) {
                if(value!==old[key]){
                    showRewardPopup(key)
                }
            }
        })
    },[user.inventory])
    const showRewardPopup = (key:any) =>{
        setReward(key)
        setIsRewardPopupVisible(true)
    }
    const hideRewardPopup = () =>{
        setIsRewardPopupVisible(false)
    }
    const navigateToInventory = () =>{
        navigate("/main/dashboard#inventory")
        setIsRewardPopupVisible(false)
    }



    const saveExpToLocalStorage = ()=>{
        const oldLocalStorage = JSON.parse(localStorage.getItem("user")!)
        localStorage.setItem("user",JSON.stringify({...oldLocalStorage,exp:user.exp}))
    }


    const hidePopup = ()=>{
        // @ts-ignore
        levelInfoWrapperRef.current.style.top="-100%"
    }
    const showPopup = ()=>{
        // @ts-ignore
        levelInfoWrapperRef.current.style.top="0"
        setTimeout(()=>{
            hidePopup()
        },5000)
    }

    // setTimeout(()=>{
    //     setExp(300)
    // },6000)
    // @ts-ignore
    function calculateExpPercentage(exp, level) {
        const baseExp = 100; // Base experience required for level 1
        const expMultiplier = 1.5; // Multiplier to increase experience requirement for each level
        let expRequiredForPreviousLevel = 0
        for (let i= 0;i<level;i++){
            if(!expRequiredForPreviousLevel){
                expRequiredForPreviousLevel = baseExp
            }else{
                expRequiredForPreviousLevel*=1.5

            }
        }

        // const expRequiredForPreviousLevel = baseExp*(level-1)*expMultiplier
        const expRequiredForNextLevel = expRequiredForPreviousLevel?expRequiredForPreviousLevel*expMultiplier:baseExp
        const percentageAchieved = ((exp-expRequiredForPreviousLevel)/(expRequiredForNextLevel-expRequiredForPreviousLevel))*100

        if( exp>=expRequiredForNextLevel){
            setUserCurrentLevel(userCurrentLevel+1)
        }

        return percentageAchieved
    }




    function calculateLevel(exp:number) {
        if(!exp) return 0
        let expRequiredForPreviousLevel =0
        let expRequiredForNextLevel = 100
        let level = 0

        while(!(exp>=expRequiredForPreviousLevel&&exp<=expRequiredForNextLevel)){
            level++
            expRequiredForPreviousLevel = expRequiredForNextLevel
            expRequiredForNextLevel*=1.5
        }

        setUserCurrentLevel(level)
    }








    return(
        <>
            <div ref={levelInfoWrapperRef} className={styles.levelWrapper}>
                <i onClick={hidePopup}      className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                <div className={styles.levelBarC}>
                    <div
                        style={{
                            width:calculateExpPercentage(user.exp,userCurrentLevel)+"%"||0
                        }}
                        className={styles.levelBarProgress}>

                        <div className={styles.arrow}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                    </div>
                </div>
                <div className={styles.btnAndLevelInfo}>
                    <button onClick={()=>navigate("/main/trophyRoad")} className={styles.viewTrophyRoad}>виж пътя на наградите</button>
                    <div className={styles.levelInfo}>
                        <p>следващо ниво</p>
                        <h3>{userCurrentLevel+1}</h3>
                    </div>
                </div>

            </div>
            {isRewardPopupVisible&&<PopUpOverlay>
                <div className={styles.rewardWrapper}>
                    <div className={styles.rewardC}>
                        <h3>Честито</h3>
                        <h4>спечелихте награда</h4>
                        <div className={styles.rewardPicC}>
                            <img src={`/public/rewardImages/${reward}.png`} alt=""/>
                        </div>
                        <h3 className={styles.rewardName}>{rewardNames[reward]}</h3>
                        <div className={styles.btnsC}>
                            <button onClick={navigateToInventory}>виж инвентар</button>
                            <button onClick={hideRewardPopup}>ок</button>
                        </div>


                    </div>

                </div>

            </PopUpOverlay>}
        </>

    )
}

