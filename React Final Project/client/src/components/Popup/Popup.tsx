
import styles from "./Popup.module.css"
import PopUpOverlay from "../PopUpOverlay/PopUpOverlay";
{/*//@ts-ignore*/}
export default function Popup({children,hidePopup,styleSelector}){
    return(
        <PopUpOverlay>
            <div className={`${styles.popup} ${styleSelector}`}>
                <i  onClick={()=>hidePopup()} className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                <div className={styles.popUpElements}>
                    {children}
                </div>


            </div>

        </PopUpOverlay>

    )
}