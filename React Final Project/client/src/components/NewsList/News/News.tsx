import styles from "./News.module.css"

export default function News({el}){
    return (
        <div className={styles.news}>
            <div className={styles.title}>
                {el.title}
            </div>
            <div className={styles.image}>
                <img src={el.urlToImage}/>
            </div>
            <div className={styles.sourceAndDateC}>
                <label className={styles.source}>
                    {el.source.name}
                </label>
                <label className={styles.date}>
                    {el.publishedAt}
                </label>
            </div>
            <div className={styles.description}>
                {el.description}
            </div>
        </div>
    )
}