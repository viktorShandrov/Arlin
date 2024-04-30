
import styles from "./LevelInfo.module.css"
import {useContext, useEffect, useRef, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
//@ts-ignore
import PopUpOverlay from "../PopUpOverlay/PopUpOverlay";
import {rewardNames} from "../../contants";
import {calculateLevel} from "../../functions";
import Popup from "../Popup/Popup";
import {userContext} from "../../redux/StateProvider/StateProvider";
//@ts-ignore
// import {setUser} from "../../redux/user";
export default function LevelInfo(){
    // const {user} = useSelector((state:any)=>state.user)
    const { userState,setUserState } = useContext(userContext);

    const levelInfoWrapperRef=useRef(null)
    const [userCurrentLevel,setUserCurrentLevel] = useState(0)
    const [isRewardPopupVisible,setIsRewardPopupVisible] = useState(false)
    const [reward,setReward] = useState("")
    //@ts-ignore
    const [userInventory,setUserInventory] = useState(null)
    //@ts-ignore
    const [userAdvancementsAchieved,setUserAdvancementsAchieved] = useState(null)
    const [advancementAchievedInfo,setAdvancementAchievedInfo] = useState(null)
    const navigate = useNavigate()
    //@ts-ignore
    // const dispatch = useDispatch()

    // const [exp,setExp] = useState(0)

    useEffect(()=>{
        setTimeout(()=>{
            setUserCurrentLevel(calculateLevel(userState().exp))
        },0)
    },[])
    useEffect(()=>{
        showPopup()
        // saveExpToLocalStorage()
    },[userState().exp])
    useEffect(()=>{
            setUserInventory((old)=>{
                if(!old) return userState().inventory
                for (const [key,value] of Object.entries(userState().inventory)) {
                    // console.log("old",old[key])
                    // console.log("new",value)
                    //@ts-ignore
                    if(value>old[key]){
                        console.log("showing reward")
                        showRewardPopup(key)
                    }
                }
                return userState().inventory
            })
    },[userState().inventory])
    useEffect(()=>{
        if(userState().advancementsAchieved){
            const advancementInfo = userState().other.advancementsInfo.find((el:any)=>el.id===userState().advancementsAchieved[0])
            setAdvancementAchievedInfo(advancementInfo)
            // dispatch((dispatch, getState) => {
            //     setTimeout(async()=>{
            //         let { user } = getState();
            //         user = user.user
            //         dispatch(setUser({...user,advancementsAchieved:[...user.advancementsAchieved,advancementInfo.id]}));
            //     },0)
            // })
        }
    },[userState().advancementsAchieved])
    const closeAdvancementPopup=()=>{
        setAdvancementAchievedInfo(null)
        // dispatch(setUser({...user,advancementsAchieved:user.advancementsAchieved.slice(1)}))
    }
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



    // const saveExpToLocalStorage = ()=>{
    //     const oldLocalStorage = JSON.parse(localStorage.getItem("user")!)
    //     localStorage.setItem("user",JSON.stringify({...oldLocalStorage,exp:user.exp}))
    // }


    const hidePopup = ()=>{
        // @ts-ignore
        levelInfoWrapperRef.current.style.top="-100%"
    }
    const showPopup = ()=>{
        if(levelInfoWrapperRef.current){
        // @ts-ignore
            levelInfoWrapperRef.current.style.top="0"
        }
        setTimeout(()=>{
            hidePopup()
        },5000)
    }
    const navigateToTrophyRoad = ()=>{
        navigate("/main/trophyRoad")
        hidePopup()
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









    if(!userState().expMultiplier) return null



    return(
        <>
            <div ref={levelInfoWrapperRef} className={styles.levelWrapper}>
                <i onClick={hidePopup}      className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                {userState().expMultiplier.value>1&&<div className={styles.expMultiplier}>
                    множител на опит <span className={styles.value}>x{userState().expMultiplier.value}</span>
                </div>}

                <div className={styles.levelBarC}>
                    <div
                        style={{
                            width:calculateExpPercentage(userState().exp,userCurrentLevel)+"%"||0
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
                    <button onClick={navigateToTrophyRoad} className={styles.viewTrophyRoad}>виж пътя на наградите</button>
                    <div className={styles.levelInfo}>
                        <p>следващо ниво</p>
                        <h3>{userCurrentLevel+1}</h3>
                    </div>
                </div>

            </div>
            {isRewardPopupVisible&&<Popup hidePopup={hideRewardPopup} styleSelector={styles.popupWrapper}>

            <div className={styles.rewardWrapper}>
                    <div className={styles.rewardC}>
                        <h3>Честито</h3>
                        <h4>спечелихте награда</h4>
                        <div className={styles.rewardPicC}>
                            <img src={`/rewardImages/${reward}.png`} alt=""/>
                        </div>
                        {/*//@ts-ignore*/}
                        <h3 className={styles.rewardName}>{rewardNames[reward]}</h3>
                        <div className={styles.btnsC}>
                            <button onClick={navigateToInventory}>виж инвентар</button>
                            <button onClick={hideRewardPopup}>ок</button>
                        </div>


                    </div>

                </div>

            </Popup>}

            {advancementAchievedInfo&&<Popup hidePopup={closeAdvancementPopup} styleSelector={styles.popupWrapper}>

                <div className={styles.rewardWrapper}>
                    <div className={styles.rewardC}>
                        <h3>Честито</h3>
                        <h4>отключихте постижение</h4>
                        <div className={styles.rewardPicC}>
                            {/*//@ts-ignore*/}
                            <img src={`/advancementsIcons/${advancementAchievedInfo.type}.png`} alt=""/>
                        </div>
                        {/*//@ts-ignore*/}
                        <h3 className={styles.rewardName}>"{advancementAchievedInfo.name}"</h3>
                        <div className={styles.btnsC}>
                            <button onClick={closeAdvancementPopup}>супер</button>
                        </div>
                    </div>

                </div>

            </Popup>}
        </>

    )
}

