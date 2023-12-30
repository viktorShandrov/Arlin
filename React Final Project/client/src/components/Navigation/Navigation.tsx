
import styles from "./Navigation.module.css"
import {Link} from "react-router-dom";
import {useState} from "react";
export default function Navigation(){
    const [currentSectionName,setCurrentSectionName] = useState("")
    const navigateHandler = (e:any)=>{
        setCurrentSectionName(e.target.textContent)
    }

    return(
        <div className={styles.navigationWrapper}>

            <div className={styles.currentSectionLabelC}>
                {currentSectionName.length>0&&currentSectionName.split("").map((char,index)=><h1 key={index} className={styles.currentSectionLabelChar}>{char}</h1>)}
            </div>


            <section className={styles.logoC}>
                <div className={styles.logoPicC}>
                    <img src="/logo/logo.png" alt=""/>
                </div>
                <div className={styles.logoNameC}>
                    <img src="/logo/name.png" alt=""/>
                </div>
            </section>
            <section className={styles.linksC}>
                <Link onClick={navigateHandler} to={"/main/read"} className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина5.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Четене</h1>
                    </article>
                </Link>
                <Link onClick={navigateHandler} to={"/main/AllBooks"} className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина5.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Kниги</h1>
                    </article>
                </Link>
                <Link onClick={navigateHandler} to={"/main/news"} className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/newspaper.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Новини</h1>
                    </article>
                </Link>
                <Link onClick={navigateHandler} to={"/main/unknownWords"} className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина1.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Непознати думи</h1>
                    </article>
                </Link>
                <Link onClick={navigateHandler} to={"/main/test/randomWords"}  className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина4.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Тестове</h1>
                    </article>
                </Link>
                <Link onClick={navigateHandler} to={"/main/dashboard"}  className={styles.linkItem} >
                    <article className={styles.linkC}>
                        <div className={styles.imageC}>
                            <img src="/Navigation%20Icons/Картина3.png" alt=""/>
                        </div>
                        <h1 className={styles.navItemLabel}>Чат с изк. интелект</h1>
                    </article>
                </Link>
                <Link onClick={navigateHandler} to={"/main/dashboard"}  className={styles.linkItem} >
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