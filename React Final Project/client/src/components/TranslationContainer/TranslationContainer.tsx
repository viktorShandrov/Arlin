import  { useEffect, useRef, useState } from "react";
import "./TranslationContainer.module.css";
import styles from "./TranslationContainer.module.css";
import { useParams } from "react-router-dom";
import {request, translateText} from "../../functions";

export default function TranslationContainer() {
    const [translatedSentence, setTranslatedSentence] = useState("");
    const [clickedWords, setClickedWords] = useState([]);
    const wordsContainerRef = useRef<HTMLParagraphElement>(null)

    let { textToTranslate } = useParams();

    useEffect(() => {
         textToTranslate = decodeURIComponent(textToTranslate!);
        if(wordsContainerRef.current) {
            // @ts-ignore
            for (const wordRef of Array.from(wordsContainerRef.current!.children)) {
                // @ts-ignore
                wordRef.removeAttribute("data-isclicked")
            }


            translateText(textToTranslate)
                .then(setTranslatedSentence)

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

    // @ts-ignore
    return (
        <>
            {textToTranslate&&<div className={styles.container}>
                <h3>Избери думите, които са ти непознати:</h3>
                <p className={styles.textForTranslate} ref={wordsContainerRef}>
                    {textToTranslate?.split(" ").map((el, index) => {
                        console.log("i")
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
                <h3>Превод:</h3>
                <p className={styles.translation}>{translatedSentence}</p>
            </div>}
        </>


    );
}
