
import styles from "./NoContentSection.module.css"
import {useNavigate} from "react-router-dom";
export default function NoContentSection({isWithBtns=false}){
    const navigate = useNavigate()

    const subscribeBtnClickHandler = () =>{
        navigate("/main/plans")
    }
    return(
        <div className={styles.noContentInThisSectionWrapper}>
            <div className={styles.noContentInThisSectionC}>
                <h5>Няма съдържание за тази секция</h5>
                {isWithBtns&&<div className={styles.noContentBtns}>
                    <button onClick={subscribeBtnClickHandler}  className={`${styles.noContentBtn} ${styles.subscribeBtn}`}>абонирай се</button>
                    <button className={`${styles.noContentBtn} ${styles.buyBookBtn}`}>купи книга</button>
                </div>}
            </div>
        </div>
    )
}