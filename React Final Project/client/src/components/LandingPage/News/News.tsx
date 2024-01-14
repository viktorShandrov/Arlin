
import styles from "./News.module.css"
import {Link} from "react-router-dom";
{/*// @ts-ignore*/}
export default function News({newsElement}){


    return(
            <>
                <Link to={`/main/news/${newsElement._id.$oid}`}>
                    <article className={styles.newsArticleWrapper}>
                        <div className={styles.newsArticleC}>
                            <div className={styles.imageC}>
                                <img src={newsElement.urlToImage} alt="News Image"/>
                                <div className={styles.categoryLabel}>
                                    <h5>{newsElement.category}</h5>
                                </div>
                            </div>
                            <h6 className={styles.date}>{newsElement.publishedAt}</h6>
                            <h5 className={styles.title}>{newsElement.title}</h5>
                            <p className={styles.description}>{newsElement.description}</p>
                            <h5 className={styles.callToAction}>Виж новината</h5>
                        </div>
                    </article>
                </Link>

            </>
    )
}