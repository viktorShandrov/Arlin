import styles from "./Navigation.module.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function NavigationOld(){
    // const {user} = useContext(userContext)
    const {user} = useSelector((selector:any)=>selector.user)
    return(
        <div className={styles.navC}>
            <nav className={styles.nav}>
                {user.token&&
                    <>
                        <Link to={"/main/read"} className={styles.navItem}>Read</Link>
                        <Link to={"/user/login"} className={`${styles.navItem} ${styles.booksNav}`}>Books</Link>
                        <div className={styles.booksMenu}>
                            <Link to={"/main/AllBooks"} className={styles.navItem}>All books</Link>
                            <Link to={"/user/login"} className={styles.navItem}>My books</Link>
                        </div>
                        <Link to={"/main/unknownWords"} className={styles.navItem}>My unknown words</Link>
                        <Link to={"/user/login"} className={`${styles.navItem} ${styles.testsNav}`}>Tests</Link>
                        <div className={styles.testsMenu}>
                            <Link to={"/main/dashboard"} className={styles.navItem}>Dashboard</Link>
                            <Link to={"/main/test/randomWords"} className={styles.navItem}>Random words</Link>
                            {/*<Link to={"/main/test/textWords/:chapterId"} className={styles.navItem}>Words from text</Link>*/}
                            {/*<Link to={"/main/test/textQuestions"} className={styles.navItem}>Chapter plot</Link>*/}
                        </div>
                        <Link to={"/main/news"} className={`${styles.navItem} `}>News</Link>
                        {user.role==="admin"&&<Link to={"/admin"} className={`${styles.navItem} `}>Admin</Link>}
                    </>

                }

                {!user.token&&
                    <>
                        <Link to={"/user/login"} className={styles.navItem}>Login</Link>
                        <Link to={"/user/register"} className={styles.navItem}>Register</Link>
                        <Link to={"/main/news"} className={`${styles.navItem} `}>News</Link>

                    </>

                }

            </nav>
        </div>
    )
}