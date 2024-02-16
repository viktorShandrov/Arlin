
import styles from "./TrophyRoad.module.css"
import {useEffect} from "react";
export default function TrophyRoad(){
    const rewardLevels = [
        {
            level:10
        },{
            level:20
        },{
            level:30
        },{
            level:40
        },{
            level:50
        },{
            level:60
        },{
            level:70
        },{
            level:80
        },{
            level:90
        },{
            level:100
        }
    ]
    const currentUserLevel = 31
    for (let i =0;i<rewardLevels.length;i++){
        const previousLevel = rewardLevels[i-1]?.level

        const currentLevel = rewardLevels[i].level
        if(currentUserLevel===currentLevel){
            rewardLevels.splice(i,1,{level:currentUserLevel,isUserLevel:true})
            break
        }else if(currentUserLevel<Math.min(...rewardLevels.map((el)=>el.level))){
            rewardLevels.unshift({level:currentUserLevel,isUserLevel:true})
            break
        }else if(currentUserLevel>previousLevel&&currentUserLevel<currentLevel){
            rewardLevels.splice(i,0,{level:currentUserLevel,isUserLevel:true})
            break
        }else if(currentUserLevel>Math.max(...rewardLevels.map((el)=>el.level))){
            rewardLevels.push({level:currentUserLevel,isUserLevel:true})
            break
        }
    }



    return(
        <>
            <div className={styles.trophyRoadWrapper}>

            {/*<h1 className={styles.pageHeading}>Напредналост</h1>*/}
                <div className={styles.trophyRoadC}>
                    {rewardLevels.map((level:any)=><div data-isuserlevel={level.isUserLevel} className={styles.levelC}>
                            <h5 className={styles.levelName}>Ниво {level.level}</h5>
                            {level.isUserLevel&&<h5>текущо ниво</h5>}
                        </div>
                    )}
                </div>
            </div>
        </>


    )
}