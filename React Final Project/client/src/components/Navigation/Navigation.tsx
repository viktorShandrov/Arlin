
import styles from "./Navigation.module.css"
import {Link} from "react-router-dom";
export default function Navigation(){
    return(
        <div className={styles.navigationWrapper}>
            <section className={styles.linksC}>
                <Link to={"/main/AllBooks"} className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина5.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Всички книги</h1>
                    </article>
                </Link>
                <Link to={"/main/news"} className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/newspaper.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Новини</h1>
                    </article>
                </Link>
                <Link to={"/main/unknownWords"} className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина1.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Непознати думи</h1>
                    </article>
                </Link>
                <Link to={"/main/test/randomWords"}  className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина4.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Тестове</h1>
                    </article>
                </Link>
                <Link to={"/main/dashboard"}  className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина3.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Чат с изк. интелект</h1>
                    </article>
                </Link>
                <Link to={"/main/dashboard"}  className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина11.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Профил</h1>
                    </article>
                </Link>

            </section>
        </div>
    )
}