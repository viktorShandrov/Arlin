
import styles from "./Chat.module.css"
import Navigation from "../Navigation/Navigation";
export default function Chat(){
    return(
        <div className={styles.chatWrapper}>
            <div className={styles.chatC}>
                <div data-role={"bot"} className={styles.message}>
                    <div className={styles.icon}>

                    </div>
                    <div className={styles.text}>
                        <p>Ivan</p>
                    </div>
                </div>
                <div data-role={"user"} className={styles.message}>
                    <div className={styles.icon}>

                    </div>
                    <div className={styles.text}>
                        <p>Ivan</p>
                    </div>
                </div>
            </div>
            <div className={styles.inputC}>
                <div className={styles.sendC}>
                    <input type={"text"} placeholder={"Type message..."} />
                    <div className={styles.paperIcon}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}