
import styles from "./TestsList.module.css"
import {Link} from "react-router-dom";
export default function TestsList(){
    return(
        <div className={styles.testListWrapper}>
            <div className={styles.testListC}>
                <h1>Всички видове тестове</h1>
                <Link to={"/main/test/randomWordsTests"}>
                    <div className={styles.testC}>
                        <div className={styles.titleAndDescription}>
                            <h4 className={styles.testTitle}>Думи от речника</h4>
                            <p className={styles.testDescription}>
                                системата избира думи от речника Ви с непознати думи и ако няма налични, то предоставя напълно
                                произволни думи
                            </p>
                        </div>
                        <video className={styles.testVideo}  autoPlay muted loop>
                            <source src="../../../public/videos/randomWordsTest.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </Link>

                <div className={styles.testC}>
                    <div className={styles.titleAndDescription}>
                        <h4 className={styles.testTitle}>Думи от глава на книга</h4>
                        <p className={styles.testDescription}>
                            системата избира думи от избрана глава на книга
                        </p>
                    </div>
                    <video className={styles.testVideo}   autoPlay muted loop>
                        <source src="../../../public/videos/randomWordsTest.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className={styles.testC}>
                    <div className={styles.titleAndDescription}>
                        <h4 className={styles.testTitle}>Въпроси от глава на книга</h4>
                        <p className={styles.testDescription}>
                            конкретни въпроси за съдържанието на текста на глава от книга
                        </p>
                    </div>
                    <video className={styles.testVideo}   autoPlay muted loop>
                        <source src="../../../public/videos/textQuestionsTest.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Link to={"/main/test/matchFourTests"}>
                    <div className={styles.testC}>
                        <div className={styles.titleAndDescription}>
                            <h4 className={styles.testTitle}>Вържи 4 с 4</h4>
                            <p className={styles.testDescription}>
                                системата избира четири думи и техният правилен отговор. Задачата е да свържете всяка дума с нейния правилен превод
                            </p>
                        </div>
                        <video className={styles.testVideo}  autoPlay muted loop>
                            <source src="../../../public/videos/matchFourTest.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </Link>


            </div>
        </div>

    )
}