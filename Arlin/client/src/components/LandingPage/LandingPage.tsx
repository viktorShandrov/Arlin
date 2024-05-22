
import styles from "./LandingPage.module.css"
import additional from "../AddtionalInfo/AddtionalInfo.module.css"
import AddtionalInfo from "../AddtionalInfo/AddtionalInfo";
import {useEffect, useRef, useState} from "react";
import FreeChapter from "./FreeChapter/FreeChapter";
import ScrollerContainer from "../ScrollerContainer/ScrollerContainer";
import {request} from "../../functions";
import News from "./News/News";
import {useNavigate} from "react-router-dom";
export default function LandingPage(){
    const additionalInfos = useRef([])
    const wrapper = useRef(0)
    const [freeChapters,setFreeChapters] = useState([])
    const [news,setNews] = useState([])
    const navigate = useNavigate()
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
        getTopNews()
    },[])

    function getFreeChapters(){
        request("chapters/freeRotation","GET").subscribe(
            (res:any)=>{
                setFreeChapters(res.freeRotationChapters)
            }
        )
    }
    function getTopNews(){
        request("news/topNews","GET").subscribe(
            (res:any)=>{
                setNews(res)
            }
        )
    }
    const handleScroll = () => {
        const container = document.getElementById(styles.topNewsWrapper);
        if (container) {
            container.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                                учи английски език по иновативен, лесен и интерактивен начин, чрез книги и новини
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
                            <ScrollerContainer  scrollSpeed={600} >
                                {freeChapters.length>0&&freeChapters.map((chapter:any)=><FreeChapter key={chapter.chapterId} chapter={chapter} />) }
                            </ScrollerContainer>
                        </section>
                        <section id={styles.topNewsWrapper} className={`${styles.freeChaptersWrapper} ${styles.topNewsWrapper}` }>
                            <h1 className={styles.topNewsHeading}>ТОП НОВИНИ ДНЕС</h1>
                            <ScrollerContainer scrollSpeed={600}>
                                {news.length>0&&news.map((newsEl:any)=><News key={newsEl._id.$oid} newsElement={newsEl} />) }
                            </ScrollerContainer>
                        </section>
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Как Arlin ще ми помогне?"}
                            info={"Нашето приложение разширява твоето възприятие за учене на нов език, предлагайки нестандартни и вдъхновяващи методи. През пътешествие с книги и новини, ти се поглъщаш от реални ситуации и разнообразни теми. Тестовете на думи те предизвикват да разшириш своя лексикон. 📖📰🎓" }
                        />


                    </section>
                    <section className={styles.callToActionBtsWrapper}>
                        <div className={styles.callToActionBtsC}>
                            <button onClick={()=>navigate("/main/AllBooks")}  className={styles.beginBtn}>КУПИ КНИГА</button>
                            <button onClick={()=>navigate("/main/plans")} className={styles.beginBtn}>АБОНИРАЙ СЕ</button>
                            <button  className={styles.beginBtn}>ОСТАВИ БАКШИШ</button>
                        </div>
                    </section>

                </div>

            </>
    )
}
