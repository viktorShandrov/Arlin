
import styles from "./LandingPage.module.css"
import additional from "../AddtionalInfo/AddtionalInfo.module.css"
import AddtionalInfo from "../AddtionalInfo/AddtionalInfo";
import {useEffect, useRef, useState} from "react";
import FreeChapter from "./FreeChapter/FreeChapter";
import BookElement from "../AllBooks/BookElement/BookElement";
import ScrollerContainer from "../ScrollerContainer/ScrollerContainer";
import {request} from "../../functions";
export default function LandingPage(){
    const additionalInfos = useRef([])
    const wrapper = useRef(0)
    const [freeChapters,setFreeChapters] = useState([])
    useEffect(()=>{

        wrapper.current.addEventListener("scroll",()=>{
            for (const additionalInfo of additionalInfos.current) {
                const position = additionalInfo.getBoundingClientRect();
                // Check if the element is in the viewport
                if (position.top < window.innerHeight-600 && position.bottom >= 0) {
                    additionalInfo.classList.add(additional.fadeIn);
                }
            }
        })
        getFreeChapters()
    },[])

    function getFreeChapters(){
        request("chapters/freeRotation","GET").subscribe(
            (res)=>{
                setFreeChapters(res.freeRotationChapters)
            }
        )
    }
    return(
            <>
                <div ref={wrapper} className={styles.landingPageWrapper}>
                    <section className={styles.heroSectionWrapper}>
                        <div className={styles.textC}>
                            <h1 className={styles.heading}>
                                Учене на език, чрез книги, новини и AI.
                            </h1>
                            <p className={styles.afterHeading}>
                                учи чужд език по лесен и интерактивен начин с Arlin - твоята дигитална библиотека
                            </p>
                            <button className={styles.beginBtn}>Започни сега</button>
                        </div>
                        <div className={styles.heroImageC}>
                            <img src="../../../public/hero.png" alt=""/>
                        </div>
                    </section>




                    <section className={styles.helpfulInformationWrapper}>
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Нашата мисия"}
                            info={"В нашето приложение вярваме, че ученето на нов език трябва да бъде свободно и достъпно за всеки. Мисията ни е като пътешествие, където всеки е добре дошъл. Предоставяме ти ключове към знание, като поставяме в твоите ръце инструменти, които правят ученето лесно и забавно. Желаем да разширим хоризонтите на ученето на чужди езици, предоставяйки още повече безплатни материали. Така, дори ако си начинаещ или опитен езиков ученик, учебният процес да бъде приятен и достъпен за всеки, който иска да се потопи в чудесния свят на нови езици. 🗝️🌍📚" }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={"Четенето на книги е като пътешествие, където твоят мозък е изследовател. Страници са магични портали към светове на знание, които разгръщат пред теб богатство от идеи. Когато се потапяш в думите, мозъкът ти танцува със сюжетите, създавайки креативен фойерверк от асоциации. Този умствен танц подобрява запомнянето, като го правиш гъвкав и силен. В света на книгите, всяка страница е тренировка за интелекта, а читателят става състезател на умове, готов да преодолява интелектуални върхове. 📚🌟" }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Не е нужно да плащам?!?"}
                            info={"Да! Ние именно вярваме в идеята, че знанието трябва да бъде свободно и достъпно за всеки, поради което приложението ни осигурява безплатни ресурси за учене на чужд език. Ти можеш да се възползваш от обширния ни набор от материали и инструменти без да плащаш. Нашата мисия е да направим ученето възможно най-лесно и достъпно за всеки, без да слагаме финансови бариери пред знание. Така че не, не е нужно да плащаш, за да се насладиш на обучението и да развиваш уменията си по нов език в нашето приятелско образователно общество. 🌐📘🆓" }
                        />
                        <section className={styles.freeChaptersWrapper}>
                            <h1 className={styles.freeMaterialsHeading}>Безплатни материали тази седмица</h1>
                            <ScrollerContainer>
                                {freeChapters.length>0&&freeChapters.map((chapter:any)=><FreeChapter key={chapter.chapterId} chapter={chapter} />) }
                            </ScrollerContainer>
                        </section>
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Как Arlin ще ми помогне?"}
                            info={"Нашето приложение разширява твоето възприятие за учене на нов език, предлагайки нестандартни и вдъхновяващи методи. През пътешествие с книги и новини, ти се поглъщаш от реални ситуации и разнообразни теми. Тестовете на думи те предизвикват да разшириш своя лексикон. И най-доброто? Всичко това е напълно безплатно, за да направим ученето на нов език интересно, свободно и лесно достъпно за всеки. С нас, ти не просто учиш език, а се погруждаш в езиковата култура чрез иновативни и обогатяващи материали. 📖📰🎓" }
                        />


                    </section>

                </div>

            </>
    )
}
