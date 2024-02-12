import  { useEffect, useRef, useState } from "react";
import "./TranslationContainer.module.css";
import styles from "./TranslationContainer.module.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {request} from "../../functions";
import ComponentLoading from "../ComponentLoading/ComponentLoading";

export default function TranslationContainer() {
    const [translatedSentence, setTranslatedSentence] = useState("");
    const [clickedWords, setClickedWords] = useState([]);
    const [isTranslationLoading, setIsTranslationLoading] = useState(false);
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

            setIsTranslationLoading(true)
            request("unknownWords/translateText/"+textToTranslate).subscribe(
                (res:any)=>{
                    setTranslatedSentence(res.translation)
                    setIsTranslationLoading(false)
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

    const handleWordClick = (text: string) => {
        setClickedWords((prevClickedWords) => {
            const element = prevClickedWords.find((el:any)=>el.text===text)
            if(element){
                prevClickedWords.splice(prevClickedWords.indexOf(element),1)
            }else{
                // @ts-ignore
                prevClickedWords = [...prevClickedWords,{text,targetContainer:"Неконкретизирани"}];
            }
            const newClickedWords = [...prevClickedWords]
            // newClickedWords[index] = !newClickedWords[index];

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
        // const words = [];
        if(wordsContainerRef.current){
            // @ts-ignore
            // for (const elements of Array.from(wordsContainerRef.current!.children).filter(el=>el.getAttribute("data-isclicked"))) {
            //     // @ts-ignore
            //     words.push({
            //         text:elements.textContent,
            //         targetContainer:"Неконкретизирани"
            //     });
            // }
            request("unknownWords/create", "POST", { words:clickedWords} ).subscribe(
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
                                data-isclicked={!!clickedWords.find((word:any)=>word.text===el)}
                                onClick={() => handleWordClick(el)}
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
                <p className={styles.translation}>{isTranslationLoading&&<ComponentLoading/>}{translatedSentence}</p>
            </div>}
            <div onClick={()=>closeTextToTranslatePanel()} className={styles.overlay}></div>
        </>


    );
}
