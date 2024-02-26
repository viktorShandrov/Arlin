
import styles from "./TrophyRoad.module.css"
import {calculateLevel} from "../../functions";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
export default function TrophyRoad(){
    const {user} = useSelector((state:any)=>state.user)
    const [rewardLevels,setRewardLevels] = useState([])

    useEffect(()=>{
        if(!user.other.levelRewards) return
        const rewardLevels = Object.entries(user.other.levelRewards).map(([level,rewardName])=> {
            return {level:Number(level),rewardName}
        })
        {/*//@ts-ignore*/}
        setRewardLevels(rewardLevels)
        const currentUserLevel = calculateLevel(user.exp)
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
    },[user])

    if(!user.other.levelRewards) return null





    return(
        <>
            <div className={styles.trophyRoadWrapper}>

            {/*<h1 className={styles.pageHeading}>Напредналост</h1>*/}
                <div className={styles.trophyRoadC}>
                    {rewardLevels.length>0&&rewardLevels.map((level:any)=><div data-isuserlevel={level.isUserLevel} className={styles.levelC}>
                            <h5 className={styles.levelName}>Ниво {level.level}</h5>
                            {level.isUserLevel&&<h5>текущо ниво</h5>}
                            {!level.isUserLevel&&<img src={`/public/rewardImages/${level.rewardName}.png`} alt=""/>}

                        </div>
                    )}
                </div>
            </div>
        </>


    )
}