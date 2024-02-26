
import styles from "./PopUpOverlay.module.css"
{/*//@ts-ignore*/}
export default function PopUpOverlay({children}){
    return(
        <div className={styles.popUpOverlay}>
            {children}
        </div>
    )
}