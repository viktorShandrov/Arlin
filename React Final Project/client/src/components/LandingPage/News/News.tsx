
import styles from "./News.module.css"
import {Link} from "react-router-dom";
export default function News({newsElement}){

    const news = [
        {
            "_id": {
                "$oid": "6570ad33d375c9a6d950eade"
            },
            "source": {
                "name": "Emma McKee"
            },
            "title": "Taylor Swift Has Signed Lyrics From a Classic Paul McCartney Song Hanging in Her Bathroom",
            "description": "Taylor Swift asked Paul McCartney to sign some lyrics for her. She considers them a cherished gift and keeps them hanging in her bathroom.",
            "urlToImage": "https://www.cheatsheet.com/wp-content/uploads/2023/12/Paul-McCartney-Taylor-Swift.jpg",
            "publishedAt": "2023-12-06 17:10:00",
            "content": "Like many people, Taylor Swift grew up listening to Paul McCartney , but unlike most, she has had the opportunity to meet him. Swift is friends with McCartney’s daughter, Stella McCartney, and had a lengthy conversation with him for an interview. When Swift met him, she asked him to sign a paper with her favorite lyrics. They’re from a classic Beatles song, and the paper is now hanging in her bathroom. Taylor Swift has Paul McCartney lyrics hanging in her bathroom When Swift met McCartney for Rolling Stone’s Musicians on Musicians series in 2020, she asked him for a favor. “We walk into his office for a chat, and after I make a nervous request, Paul is kind enough to handwrite my favorite lyric of his and sign it,” Swift wrote. “He makes a joke about me selling it, and I laugh because it’s something I know I’ll cherish for the rest of my life .” In 2023, Time Magazine named Swift its Person of the Year. Though she didn’t identify the cherished McCartney lyric in her Rolling Stone article, she revealed to Time that the lyric is from the Beatles song “Blackbird.” The signed note reads, “Take these broken wings and learn to fly.” Taylor Swift said she learned about her own career from Paul McCartney Swift saw McCartney in concert and walked away with a lesson on how to handle her own career . “I went with my family to see you in concert in 2010 or 2011, and the thing I took away from the show most was that it was the most selfless set list I had ever seen,” Swift said. “It was completely geared toward what it would thrill us to hear. It had new stuff, but it had every hit we wanted to hear, every song we’d ever cried to, every song people had gotten married to, or been brokenhearted to. And I just remembered thinking, ‘I’ve got to remember that,’ that you do that set list for your fans.” She realized that part of her job is to play the songs her fans most want to hear. “I think that learning that lesson from you taught me at a really important stage in my career that if people want to hear ‘Love Story’ and ‘Shake It Off,’ and I’ve played them 300 million times, play them the 300-millionth-and-first time,” she said. “I think there are times to be selfish in your career, and times to be selfless, and sometimes they line up.” She has another gift from a classic artist in her home McCartney is not the only artist who has gifted Swift something she keeps on display in her home. Stevie Nicks, who has often praised Swift , sent her a Stevie Nicks Barbie doll. According to Time, it sits in Swift’s kitchen. Swift said she learned a lot from McCartney. Nicks, however, doesn’t think she should even try to teach the younger musician about fame. “I don’t give Taylor advice about being famous,” she said. “She doesn’t need it.”",
            "__v": 0,
            'category':"POLITIC"
        }
    ]
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