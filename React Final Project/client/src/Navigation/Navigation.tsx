import styles from "./Navigation.module.css";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {userContext} from "../App";

export default function Navigation(){
    const {user} = useContext(userContext)

    return(
        <div className={styles.navC}>
            <nav className={styles.nav}>
                {user&&
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
                            <Link to={"/user/login"} className={styles.navItem}>My tests</Link>
                            <Link to={"/main/test/randomWords"} className={styles.navItem}>Random words</Link>
                            <Link to={"/main/test/textWords"} className={styles.navItem}>Words from text</Link>
                            <Link to={"/main/test/textQuestions"} className={styles.navItem}>Chapter plot</Link>
                        </div>
                    </>

                }

                {!user&&
                    <>
                        <Link to={"/user/login"} className={styles.navItem}>Login</Link>
                        <Link to={"/user/register"} className={styles.navItem}>Register</Link>
                    </>

                }

            </nav>
        </div>
    )
}