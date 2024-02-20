
import styles from "./Popup.module.css"
import PopUpOverlay from "../PopUpOverlay/PopUpOverlay";
export default function Popup({children,hidePopup,styleSelector}){
    return(
        <PopUpOverlay>
            <div className={`${styles.popup} ${styleSelector}`}>
                <i  onClick={()=>hidePopup()} className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                {children}
            </div>

        </PopUpOverlay>

    )
}