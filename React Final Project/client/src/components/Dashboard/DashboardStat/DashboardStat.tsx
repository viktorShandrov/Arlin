
import styles from "./DashboardStat.module.css"
import {useEffect, useState} from "react";

export default function DashboardStat({name,testValue}:any){
    const [visualValue,setVisualValue] = useState(0)
            console.log(testValue)
    useEffect(()=>{

        setTimeout(()=>{
        },0)
        setVisualValue(testValue-5>=0?testValue-5:0)
       const interval = setInterval(()=>{
            setVisualValue((old:number)=>{
                console.log(old+1 ,testValue )
                if(old+1>testValue){
                    clearInterval(interval)
                    return testValue
                }else{
                    return old+1
                }
            })
        },1000)
    },[])
    return(
        <article className={styles.testInfo}>
            <span className={styles.number}>{visualValue}</span>
            <p className={styles.testName}>{name}</p>
        </article>
    )
}