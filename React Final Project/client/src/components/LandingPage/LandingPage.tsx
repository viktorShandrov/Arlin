
import styles from "./LandingPage.module.css"
import additional from "../AddtionalInfo/AddtionalInfo.module.css"
import AddtionalInfo from "../AddtionalInfo/AddtionalInfo";
import {useEffect, useRef, useState} from "react";
import FreeChapter from "./FreeChapter/FreeChapter";
import ScrollerContainer from "../ScrollerContainer/ScrollerContainer";
import {request} from "../../functions";
import News from "./News/News";
export default function LandingPage(){
    const additionalInfos = useRef([])
    const wrapper = useRef(0)
    const [freeChapters,setFreeChapters] = useState([])
    useEffect(()=>{
// @ts-ignore
        wrapper.current.addEventListener("scroll",()=>{
            for (const additionalInfo of additionalInfos.current) {
                // @ts-ignore
                const position = additionalInfo.getBoundingClientRect();
                // Check if the element is in the viewport
                if (position.top < window.innerHeight-200 && position.bottom >= 0) {
                    // @ts-ignore
                    additionalInfo.classList.add(additional.fadeIn);
                }
            }
        })
        // @ts-ignore
        additionalInfos.current[0].classList.add(additional.fadeIn);
        getFreeChapters()
    },[])

    function getFreeChapters(){
        request("chapters/freeRotation","GET").subscribe(
            (res:any)=>{
                setFreeChapters(res.freeRotationChapters)
            }
        )
    }
    const handleScroll = () => {
        const container = document.getElementById(styles.freeChaptersWrapper); // Replace with your actual container ID
        if (container) {
            container.scrollIntoView({ behavior: 'smooth' });
        }
    };
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
            "category":"POLITICS"
        },
        {
            "_id": {
                "$oid": "6570ad33d375c9a6d950eae6"
            },
            "source": {
                "name": "Joseph Holloway"
            },
            "title": "Fayetteville police meet with other departments to discuss new ways to fight violent crime",
            "description": "FAYETTEVILLE, N.C. (WNCN) — The Fayetteville Police Department came together Wednesday with dozens of other departments to explore new ways to fight violent crime. More than 40 departments attended the conference focused on fighting back against violent crime. A CBS 17 crew also attended the conference but was not allowed inside the sessions. Fayetteville Police [...]",
            "urlToImage": "https://www.cbs17.com/wp-content/uploads/sites/29/2023/12/IMG_8868-rotated.jpeg?w=900",
            "publishedAt": "2023-12-06 17:07:10",
            "content": "FAYETTEVILLE, N.C. (WNCN) — The Fayetteville Police Department came together Wednesday with dozens of other departments to explore new ways to fight violent crime. More than 40 departments attended the conference focused on fighting back against violent crime. A CBS 17 crew also attended the conference but was not allowed inside the sessions. Fayetteville Police Chief Kem Braden told CBS 17 that he made the goal of bringing in instructors from across the country and making sure neighboring law enforcement had the same kind of preparation. “Where does Cumberland County start and Fayetteville end? Criminals don’t understand those boundaries so I think it’s important we all are on the same sheet of music to what our response to violent crime is going to be.” Braden says while violent crime in Fayetteville is down nine percent from last year, homicide and domestic violence numbers are up. That’s why they’re trying to understand the latest trends of how violent criminals are operating, like through social media and other forms of technology. “We’re trying to stay at the forefront on being innovative on how we approach crime.” The police department says officers from six federal agencies are also attending today’s conference, which runs through Thursday.",
            "__v": 0,
            "category":"POLITICS"
        },
        {
            "_id": {
                "$oid": "6570ad33d375c9a6d950eae0"
            },
            "source": {
                "name": "Kristin Contino"
            },
            "title": "Julia Roberts reveals the one beauty trend she’d tell her younger self to avoid",
            "description": "The \"Pretty Woman\" actress shared what she'd tell her 19-year-old self in a new interview with People on Wednesday.",
            "urlToImage": "https://pagesix.com/wp-content/uploads/sites/3/2023/12/73344962.jpg?quality=90&strip=all",
            "publishedAt": "2023-12-06 17:09:33",
            "content": "Live and learn, Julia. Julia Roberts got real about her past beauty mistakes in a new interview with People , sharing the tidbit of advice she’d give her 19-year-old self in a piece published Wednesday. “Stand up straighter. It’s all going to be okay, and don’t pluck your eyebrows,” the “Pretty Woman” star, 56, said. The question comes after Roberts posted a sweet Instagram tribute to her twins Phinnaeus and Hazel, who turned 19 last month. “✨✨19✨✨ There are no words for the joy, the fun, the wild rumpus of life together. 💕” she posted on November 28, sharing a rare photo of herself holding her baby twins. The “Wonder” actress — who stars in the new Netflix movie “Leave the World Behind,” debuting Friday — is still turning heads with her beauty decades later, including promoting the film last week in London. Roberts stunned in a pink blazer short set and sparkling fringe Gucci heels that matched her massive diamond necklace. As for her beauty advice, Roberts is far from the first star to share her eyebrow woes. For more Page Six Style … When Harper’s Bazaar asked Julianne Moore about the beauty advice she’d give her daughter, Liv Freundlich, the Oscar winner gave a similar tip as Roberts. “The one thing I always say is do not touch her eyebrows. Don’t destroy your eyebrows like I did, and countless other women that I know,” she said. Charlize Theron also has brow regrets, telling InStyle this summer that she was “still recovering” from her overplucked era and saying her worst beauty mistake was “Hands down, the thin eyebrow from the ’90s.”",
            "__v": 0,
            "category":"HOME"
        },
        {
            "_id": {
                "$oid": "6570aa98f7573bef856bdb24"
            },
            "source": {
                "name": "Alexander Bolton"
            },
            "title": "Senate progressives demand Biden reduce Gaza civilian deaths caused by US weapons",
            "description": "A group of progressive Senate Democrats led by Sen. Elizabeth Warren (D-Mass.) are pressing President Biden and his administration to step up oversight of the use of U.S. military weapons by Israel Defense Forces (IDF) in Gaza to reduce the civilian death toll. In a letter to President Biden Tuesday, the senators raised alarm...",
            "urlToImage": "https://thehill.com/wp-content/uploads/sites/2/2023/11/warrenelizabeth_110723gn01_w.jpg?w=900",
            "publishedAt": "2023-12-06 15:41:41",
            "content": "A group of progressive Senate Democrats led by Sen. Elizabeth Warren (D-Mass.) are pressing President Biden and his administration to step up oversight of the use of U.S. military weapons by Israel Defense Forces (IDF) in Gaza to reduce the civilian death toll. In a letter to President Biden Tuesday, the senators raised alarm over Israeli forces firing 155mm artillery shells, which are unguided explosive weapons that have a kill radius of between 100 and 300 meters, close to densely populated civilian areas. “The IDF has previously used these shells to ‘hit populated areas including neighborhoods, hospitals, schools, shelters and safe zones,’ causing a staggering number of civilian deaths,” , noting that more than 30 U.S.-based civil society groups warned Secretary of Defense Lloyd Austin against providing those shells to Israel. They circulated the letter ahead of a key procedural Senate vote Wednesday to begin debate on a $110 billion emergency foreign aid package that includes $14 billion in aid to Israel. Israel launched an offensive against Hamas in Gaza after the U.S.-designated terrorist group launched at attack on Oct. 7 that killed about 1,200 people. The civilian death toll in Gaza is estimated at around 15,000, according to the health ministry there. One of the letter’s signatories, Sen. Bernie Sanders (I-Vt.), has already said he will oppose more military aid to Israel without conditions to limit civilian casualties. Senate Republicans say they will block the bill because it does not include immigration and asylum policy reforms to reduce the flow of migrants across the U.S.-Mexico border. The Democratic senators who signed the letter to Biden cited press reports that the Defense Department only sent one Marine Corps general to advise Israel on how to mitigate civilian casualties and that U.S. military officials have yet to define safeguards or say how Israel should use U.S. weapons. “Civilian harm prevention is a cornerstone of American foreign policy, and U.S. policy and international law requires that American weapons transferred to foreign governments, including Israel, are used in a manner consistent with protecting civilian lives,” they wrote. They expressed “concerns” over what they called “insufficient transparency around weapons transfers to Israel” because Israel is allowed to use Foreign Military Financing from the United States to buy U.S. weapons directly from domestic arms manufactures, which only requires classified notifications of those sales to a few members of the Senate Foreign Relations and House Foreign Affairs Committees. They pointed out that United Nations Secretary General António Guterres has called the strikes on civilian areas “clear violations of international humanitarian law.” The senators note that Biden’s request for military aid to Israel asks Congress to waive notification requirements. They say this would further limit congressional oversight and harm “our ability to monitor and determine whether U.S. assistance is contributing to disproportionate civilian harm.” They argue that lawmakers are in the dark about what role U.S. weapons have played in killing Palestinian civilians because Israeli forces have restricted independent human rights groups and media organizations from visiting Gaza. “Your administration must ensure that existing guidance and standards are being used to evaluate the reports of Israel using U.S. weapons in attacks that harm civilians in order to more rigorously protect civilian safety during Israel’s operations in Gaza,” the senators wrote. Warren and her colleagues concluded their letter with more than a dozen questions about what steps the Pentagon has taken to reduce civilian casualties. They want to know if U.S. officials are aware of the Israel Defense Force’s policy on preventing civilian harm, what insights the U.S. government has about how Israel assesses the proportionality of civilian deaths and whether the Israel has a system for reporting allegations of civilian harm. They asked what systems Israel has in place to investigate allegations of civilian harm and what training the U.S. has provided to Israeli troops to prevent civilian deaths.",
            "__v": 0,
            "category":"POLITICS"
        },
    ]
    return(
            <>
                {/*// @ts-ignore*/}
                <div ref={wrapper} className={styles.landingPageWrapper}>
                    <section className={styles.heroSectionWrapper}>
                        <div className={styles.textC}>
                            <h1 className={styles.heading}>
                                Учене на език, чрез книги, новини и AI.
                            </h1>
                            <h2 className={styles.afterHeading}>
                                учи чужд език по лесен и интерактивен начин с Arlin - твоята дигитална библиотека
                            </h2>
                            <button onClick={handleScroll} className={styles.beginBtn}>ЗАПОЧНИ СЕГА</button>

                        </div>
                        <div className={styles.heroImageC}>
                            <img src="/hero.png" alt=""/>
                        </div>
                    </section>




                    <section className={styles.helpfulInformationWrapper}>
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Нашата мисия"}
                            info={"В нашето приложение вярваме, че ученето на нов език трябва да бъде свободно и достъпно за всеки. Мисията ни е като пътешествие, където всеки е добре дошъл. Предоставяме ти ключове към знание, като поставяме в твоите ръце инструменти, които правят ученето лесно и забавно. 🗝️🌍📚" }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={"Четенето на книги е като пътешествие, където твоят мозък е изследовател. Страници са магични портали към светове на знание, които разгръщат пред теб богатство от идеи. Когато се потапяш в думите, мозъкът ти танцува със сюжетите, създавайки креативен фойерверк от асоциации. 📚🌟" }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Не е нужно да плащам?!?"}
                            info={"Да! Ние именно вярваме в идеята, че знанието трябва да бъде свободно и достъпно за всеки, поради което приложението ни осигурява безплатни ресурси за учене на чужд език. Ти можеш да се възползваш от обширния ни набор от материали и инструменти без да плащаш. 🌐📘🆓" }
                        />
                        <section id={styles.freeChaptersWrapper} className={styles.freeChaptersWrapper}>
                            <h1 className={styles.freeMaterialsHeading}>Безплатни материали тази седмица</h1>
                            <ScrollerContainer>
                                {freeChapters.length>0&&freeChapters.map((chapter:any)=><FreeChapter key={chapter.chapterId} chapter={chapter} />) }
                            </ScrollerContainer>
                        </section>
                        <section id={styles.freeChaptersWrapper} className={styles.freeChaptersWrapper}>
                            <h1 className={styles.topNewsHeading}>ТОП НОВИНИ ДНЕС</h1>
                            <ScrollerContainer>
                                {news.length>0&&news.map((newsEl:any)=><News key={newsEl._id.$oid} newsElement={newsEl} />) }
                            </ScrollerContainer>
                        </section>
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Как Arlin ще ми помогне?"}
                            info={"Нашето приложение разширява твоето възприятие за учене на нов език, предлагайки нестандартни и вдъхновяващи методи. През пътешествие с книги и новини, ти се поглъщаш от реални ситуации и разнообразни теми. Тестовете на думи те предизвикват да разшириш своя лексикон. 📖📰🎓" }
                        />


                    </section>

                </div>

            </>
    )
}
