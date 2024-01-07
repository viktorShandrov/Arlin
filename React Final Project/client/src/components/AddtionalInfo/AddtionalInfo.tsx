
import styles from "./AddtionalInfo.module.css"
export default function AddtionalInfo({question,info,reference}){
    return(
        <article ref={(element) =>{
            reference.current.push(element)
        } } className={styles.helpfulInformationC}>
            <p className={styles.information}>
                {info}
            </p>
            <h1 className={styles.question}>
                {question}
            </h1>
        </article>
    )
}