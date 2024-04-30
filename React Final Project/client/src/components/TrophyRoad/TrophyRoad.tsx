
import styles from "./TrophyRoad.module.css"
import {calculateLevel} from "../../functions";
import {useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../../redux/StateProvider/StateProvider";
export default function TrophyRoad(){
    // const {user} = useSelector((state:any)=>state.user)
    const { userState,setUserState } = useContext(userContext);
    const [rewardLevels,setRewardLevels] = useState([])

    useEffect(()=>{
        if(!userState().other.levelRewards) return
        const rewardLevels = Object.entries(userState().other.levelRewards).map(([level,rewardName])=> {
            return {level:Number(level),rewardName}
        })
        {/*//@ts-ignore*/}
        setRewardLevels(rewardLevels)
        const currentUserLevel = calculateLevel(userState().exp)
        for (let i =0;i<rewardLevels.length;i++){
            const previousLevel = rewardLevels[i-1]?.level

            const currentLevel = rewardLevels[i].level
            if(currentUserLevel===currentLevel){
                {/*//@ts-ignore*/}
                rewardLevels.splice(i,1,{level:currentUserLevel,isUserLevel:true})
                break
            }else if(currentUserLevel<Math.min(...rewardLevels.map((el)=>el.level))){
                {/*//@ts-ignore*/}
                rewardLevels.unshift({level:currentUserLevel,isUserLevel:true})
                break
            }else if(currentUserLevel>previousLevel&&currentUserLevel<currentLevel){
                {/*//@ts-ignore*/}
                rewardLevels.splice(i,0,{level:currentUserLevel,isUserLevel:true})
                break
            }else if(currentUserLevel>Math.max(...rewardLevels.map((el)=>el.level))){
                {/*//@ts-ignore*/}
                rewardLevels.push({level:currentUserLevel,isUserLevel:true})
                break
            }
        }
    },[userState()])

    if(!userState().other.levelRewards) return null





    return(
        <>
            <div className={styles.trophyRoadWrapper}>

            {/*<h1 className={styles.pageHeading}>Напредналост</h1>*/}
                <div className={styles.trophyRoadC}>
                    {rewardLevels.length>0&&rewardLevels.map((level:any)=><div data-isuserlevel={level.isUserLevel} className={styles.levelC}>
                            <h5 className={styles.levelName}>Ниво {level.level}</h5>
                            {level.isUserLevel&&<h5>текущо ниво</h5>}
                            {!level.isUserLevel&&<img src={`/rewardImages/${level.rewardName}.png`} alt=""/>}

                        </div>
                    )}
                </div>
            </div>
        </>


    )
}