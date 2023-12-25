
import styles from "./LandingPage.module.css"
import additional from "../AddtionalInfo/AddtionalInfo.module.css"
import AddtionalInfo from "../AddtionalInfo/AddtionalInfo";
import {useEffect, useRef} from "react";
export default function LandingPage(){
    const additionalInfos = useRef([])
    const wrapper = useRef(0)
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
    },[])
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
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={" Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias assumenda beatae dicta distinctio eius ex explicabo inventore ipsam laborum libero molestias provident quod repellendus, rerum suscipit voluptatibus. Dicta ea, et eum exercitationem soluta ut voluptatem. Adipisci eligendi est impedit nulla quaerat quisquam reprehenderit unde. Culpa eaque esse in ipsum iure numquam praesentium qui reprehenderit rerum veniam! A accusantium adipisci aliquid asperiores assumenda, eos esse et facere harum inventore quae quia quo saepe ut voluptatum! Ab ad beatae delectus earum eligendi expedita fugit nostrum provident repudiandae voluptate. Ducimus explicabo, temporibus." }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={" Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias assumenda beatae dicta distinctio eius ex explicabo inventore ipsam laborum libero molestias provident quod repellendus, rerum suscipit voluptatibus. Dicta ea, et eum exercitationem soluta ut voluptatem. Adipisci eligendi est impedit nulla quaerat quisquam reprehenderit unde. Culpa eaque esse in ipsum iure numquam praesentium qui reprehenderit rerum veniam! A accusantium adipisci aliquid asperiores assumenda, eos esse et facere harum inventore quae quia quo saepe ut voluptatum! Ab ad beatae delectus earum eligendi expedita fugit nostrum provident repudiandae voluptate. Ducimus explicabo, temporibus." }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={" Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias assumenda beatae dicta distinctio eius ex explicabo inventore ipsam laborum libero molestias provident quod repellendus, rerum suscipit voluptatibus. Dicta ea, et eum exercitationem soluta ut voluptatem. Adipisci eligendi est impedit nulla quaerat quisquam reprehenderit unde. Culpa eaque esse in ipsum iure numquam praesentium qui reprehenderit rerum veniam! A accusantium adipisci aliquid asperiores assumenda, eos esse et facere harum inventore quae quia quo saepe ut voluptatum! Ab ad beatae delectus earum eligendi expedita fugit nostrum provident repudiandae voluptate. Ducimus explicabo, temporibus." }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={" Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias assumenda beatae dicta distinctio eius ex explicabo inventore ipsam laborum libero molestias provident quod repellendus, rerum suscipit voluptatibus. Dicta ea, et eum exercitationem soluta ut voluptatem. Adipisci eligendi est impedit nulla quaerat quisquam reprehenderit unde. Culpa eaque esse in ipsum iure numquam praesentium qui reprehenderit rerum veniam! A accusantium adipisci aliquid asperiores assumenda, eos esse et facere harum inventore quae quia quo saepe ut voluptatum! Ab ad beatae delectus earum eligendi expedita fugit nostrum provident repudiandae voluptate. Ducimus explicabo, temporibus." }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={" Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias assumenda beatae dicta distinctio eius ex explicabo inventore ipsam laborum libero molestias provident quod repellendus, rerum suscipit voluptatibus. Dicta ea, et eum exercitationem soluta ut voluptatem. Adipisci eligendi est impedit nulla quaerat quisquam reprehenderit unde. Culpa eaque esse in ipsum iure numquam praesentium qui reprehenderit rerum veniam! A accusantium adipisci aliquid asperiores assumenda, eos esse et facere harum inventore quae quia quo saepe ut voluptatum! Ab ad beatae delectus earum eligendi expedita fugit nostrum provident repudiandae voluptate. Ducimus explicabo, temporibus." }
                        />
                        <AddtionalInfo
                            reference = {additionalInfos}
                            question={"Защо четенето на книги увеличава запоманянето на информация"}
                            info={" Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias assumenda beatae dicta distinctio eius ex explicabo inventore ipsam laborum libero molestias provident quod repellendus, rerum suscipit voluptatibus. Dicta ea, et eum exercitationem soluta ut voluptatem. Adipisci eligendi est impedit nulla quaerat quisquam reprehenderit unde. Culpa eaque esse in ipsum iure numquam praesentium qui reprehenderit rerum veniam! A accusantium adipisci aliquid asperiores assumenda, eos esse et facere harum inventore quae quia quo saepe ut voluptatum! Ab ad beatae delectus earum eligendi expedita fugit nostrum provident repudiandae voluptate. Ducimus explicabo, temporibus." }
                        />
                    </section>

                </div>

            </>
    )
}
