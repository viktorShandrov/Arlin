
import styles from "./DashboardStat.module.css"

export default function DashboardStat({name,value}){
    return(
        <div className={styles.summary}>
            <label className={styles.text}>{name}</label>
            <div className={styles.count}>
                {value||0}
            </div>
        </div>
    )
}