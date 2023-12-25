
import styles from "./AddtionalInfo.module.css"
export default function AddtionalInfo({question,info,reference}){
    return(
        <article ref={(element) =>{
            console.log(reference)
            reference.current.push(element)
        } } className={styles.helpfulInformationC}>
            <p className={styles.information}>
                {info}
            </p>
            <h3 className={styles.question}>
                {question}
            </h3>
        </article>
    )
}