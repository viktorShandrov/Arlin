import React, { useEffect, useRef, useState } from "react";
import "./TranslationContainer.module.css";
import styles from "./TranslationContainer.module.css";
import { useParams } from "react-router-dom";
import { request } from "../functions";

export default function TranslationContainer() {
    const [translatedSentence, setTranslatedSentence] = useState("");
    const [clickedWords, setClickedWords] = useState([]);
    const wordsContainerRef = useRef()

    const { textToTranslate } = useParams();

    useEffect(() => {
        for (const wordRef of Array.from(wordsContainerRef.current!.children)) {
            wordRef.removeAttribute("data-isclicked")
        }

        const API_KEY = "AIzaSyCwcafxQT_4clYPFoz6pR5C3KOAbNhvTc8";
        const headers = new Headers({
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${API_KEY}`,
        });

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                q: textToTranslate,
                target: "bg",
            }),
        };

        fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
            requestOptions
        )
            .then((data) => data.json())
            .then((response: any) => {
                const translatedText = response.data.translations[0].translatedText;
                setTranslatedSentence(translatedText);
            })
            .catch((error) => {
                console.error("Translation error:", error);
            });
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
        for (const elements of Array.from(wordsContainerRef.current!.children).filter(el=>el.getAttribute("data-isclicked"))) {
            words.push(elements.textContent);
        }
        console.log(words);
        request("unknownWords/create", "POST", { words }).subscribe(
            (res) => {
                console.log("success");
            },
            (error) => {
                console.log(error);
            }
        );
    };

    // @ts-ignore
    return (
        <div className={styles.container}>
            <h3>Избери думите, които са ти непознати:</h3>
            <p className={styles.textForTranslate} ref={wordsContainerRef}>
                {textToTranslate!.split(" ").map((el, index) => {
                    // const spanRef = useRef<HTMLSpanElement>(null);

                    // Create a new ref each time the component renders
                    // clickedElementsRef.current[index] = spanRef;

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
            <p>{translatedSentence}</p>
        </div>
    );
}
