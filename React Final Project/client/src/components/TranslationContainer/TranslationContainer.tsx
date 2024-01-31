import  { useEffect, useRef, useState } from "react";
import "./TranslationContainer.module.css";
import styles from "./TranslationContainer.module.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {request, translateText} from "../../functions";

export default function TranslationContainer() {
    const [translatedSentence, setTranslatedSentence] = useState("");
    const [clickedWords, setClickedWords] = useState([]);
    const wordsContainerRef = useRef<HTMLParagraphElement>(null)

    let { textToTranslate } = useParams();
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
         textToTranslate = decodeURIComponent(textToTranslate!);
        if(wordsContainerRef.current) {
            // @ts-ignore
            for (const wordRef of Array.from(wordsContainerRef.current!.children)) {
                // @ts-ignore
                wordRef.removeAttribute("data-isclicked")
            }


            request("unknownWords/translateText/"+textToTranslate).subscribe(
                (res:any)=>{
                    setTranslatedSentence(res.translation)
                }
            )


            // translateText(textToTranslate)
            //     .then(setTranslatedSentence)

            // fetch(
            //     `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
            //     requestOptions
            // )
            //     .then((data) => data.json())
            //     .then((response: any) => {
            //         const translatedText = response.data.translations[0].translatedText;
            //         setTranslatedSentence(translatedText);
            //     })
            //     .catch((error) => {
            //         console.error("Translation error:", error);
            //     });
        }
    }, [textToTranslate]);

    const handleWordClick = (index: number) => {
        setClickedWords((prevClickedWords) => {
            const newClickedWords: any = [...prevClickedWords];
            newClickedWords[index] = !newClickedWords[index];
            return newClickedWords;
        });
    };

    // let clickedElements: any;
    // useEffect(() => {
    //     clickedElements = clickedElementsRef.current
    //         .map((ref) => ref.current)
    //         .filter((element) => element?.getAttribute("data-isclicked") === "true");
    //
    //     // Do something with the filtered elements
    // }, [clickedWords]);

    const saveWordsClickHandler = () => {
        const words = [];
        if(wordsContainerRef.current){
            // @ts-ignore
            for (const elements of Array.from(wordsContainerRef.current!.children).filter(el=>el.getAttribute("data-isclicked"))) {
                // @ts-ignore
                words.push(elements.textContent);
            }
            console.log(words);
            request("unknownWords/create", "POST", { words }).subscribe(
                () => {
                    console.log("success");
                }
            );
        }

    };
    const closeTextToTranslatePanel = ()=>{
        const newUrlArr =  location.pathname.split("/")
        newUrlArr.pop()
        const newUrl = newUrlArr.join("/")
        navigate(newUrl)
    }

    // @ts-ignore
    return (
        <>
            {textToTranslate&&<div className={ `${styles.container} ${textToTranslate?styles.visible:null}` }>
                <i  onClick={()=>closeTextToTranslatePanel()} className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                <h6 className={styles.heading}>Избери думите, които са ти непознати:</h6>
                <p className={styles.textForTranslate} ref={wordsContainerRef}>
                    {textToTranslate?.split(" ").map((el, index) => {
                        if(!el){
                            return null
                        }
                        el = el.replace(/^[,."\s:]+|[,\s:]+$/g, "")
                        return (
                            <span
                                key={index}
                                className={`${styles.word} `}
                                data-isclicked={clickedWords[index]}
                                onClick={() => handleWordClick(index)}
                                // ref={spanRef}
                            >
                          {el}
                        </span>
                        );
                    })}
                </p>
                {clickedWords.some((el) => el) && (
                    <button onClick={saveWordsClickHandler} className={styles.saveWords}>
                        Запази думи
                    </button>
                )}

                <hr />
                <h6 className={styles.heading}>Превод:</h6>
                <p className={styles.translation}>{translatedSentence}</p>
            </div>}
            <div className={styles.overlay}></div>
        </>


    );
}
