
import styles from "./AddtionalInfo.module.css"
export default function AddtionalInfo({question,info}){
    return(
        <article className={styles.helpfulInformationC}>
            <p className={styles.information}>
                {info}
            </p>
            <h3 className={styles.question}>
                {question}
            </h3>
        </article>
    )
}