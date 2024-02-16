
import styles from "./LevelInfo.module.css"
import {useEffect, useRef, useState} from "react";
import { useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
export default function LevelInfo(){
    const {user} = useSelector((state:any)=>state.user)

    const levelInfoWrapperRef=useRef(null)
    const [userCurrentLevel,setUserCurrentLevel] = useState(0)
    const navigate = useNavigate()

    // const [exp,setExp] = useState(0)

    useEffect(()=>{
        setTimeout(()=>{
            calculateLevel(user.exp)
        },0)
    },[])
    useEffect(()=>{
        showPopup()
        saveExpToLocalStorage()
    },[user.exp])


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
    )
}

