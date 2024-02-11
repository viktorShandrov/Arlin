
import styles from "./PopUpOverlay.module.css"
export default function PopUpOverlay({children}){
    return(
        <div className={styles.popUpOverlay}>
            {children}
        </div>
    )
}