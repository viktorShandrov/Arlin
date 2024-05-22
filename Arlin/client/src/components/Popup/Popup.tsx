
import styles from "./Popup.module.css"
import PopUpOverlay from "../PopUpOverlay/PopUpOverlay";
{/*//@ts-ignore*/}
export default function Popup({children,hidePopup,styleSelector,isWithDisplayNone = true}){
    return(
        <div style={
            {
                display: isWithDisplayNone?"none":"block"
            }
        }>
            <PopUpOverlay>
                <div className={`${styles.popup} ${styleSelector}`}>
                    <i  onClick={()=>hidePopup()} className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                    <div className={styles.popUpElements}>
                        {children}
                    </div>
                </div>
            </PopUpOverlay>
        </div>
    )
}