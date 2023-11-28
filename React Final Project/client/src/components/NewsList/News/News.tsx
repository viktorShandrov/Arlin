import styles from "./News.module.css"
import {useNavigate} from "react-router-dom";

export default function News({el}){
    const navigate = useNavigate()

     const newsClickHandler = ()=>{
        navigate(el._id)
    }
    const date = new Date(el.publishedAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: 'UTC', // Adjust the time zone based on your needs
    });
    return (
        <div onClick={newsClickHandler} className={styles.news}>
            <div className={styles.title}>
                {el.title}
            </div>
            <div className={styles.image}>
                <img src={el.urlToImage} alt={"No image to display"}/>
            </div>
            <div className={styles.sourceAndDateC}>
                <label className={styles.source}>
                    {el.source.name}
                </label>
                <label className={styles.date}>
                    {date}
                </label>
            </div>
            <div className={styles.description}>
                {el.description}
            </div>
        </div>
    )
}