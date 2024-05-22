
import styles from "./Table.module.css"
{/*// @ts-ignore*/}
export default function Table({children,title,arr,noContentText="Няма тестове"}){
    return(
        <>
            <div className={styles.submissionsTable}>
                <div className={`${styles.cell} ${styles.heading}`}>
                    <h6>{title}</h6>
                </div>
                {children}
                {arr.length===0&&
                    <div className={`${styles.cell} ${styles.noContent}`}>
                        <span>{noContentText}</span>
                    </div>
                }
            </div>
        </>
    )
}