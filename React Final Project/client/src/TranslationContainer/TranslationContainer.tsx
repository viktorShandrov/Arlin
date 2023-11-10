import {useEffect, useState} from "react";
import "./TranslationContainer.module.css"
import styles from "./TranslationContainer.module.css"
import {useParams} from "react-router-dom";
export default function  TranslationContainer (){
    const [translatedSentence,setTranslatedSentence] = useState("")


    const {textToTranslate} = useParams()

    useEffect(()=>{
        const API_KEY = "AIzaSyCwcafxQT_4clYPFoz6pR5C3KOAbNhvTc8"
        console.log(5555)


        const headers = new Headers({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${API_KEY}`,
        });

        const requestOptions = {
            method: 'POST', // or 'GET', 'PUT', 'DELETE', etc. depending on your API request
            headers: headers, // Include headers in the request options
            body: JSON.stringify({
                q: textToTranslate,
                target: "bg",
            }),
        };

        fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,requestOptions)
            .then((data)=>data.json())
            .then((response:any) => {
                const translatedText = response.data.translations[0].translatedText;
                setTranslatedSentence(translatedText)
            })
            .catch((error) => {
                console.error('Translation error:', error);
            });
    },[textToTranslate])

    // function changeTranslation(rawSentence:string){
    //     setRawSentance(rawSentence)
    // }
    // functions.changeTranslation = changeTranslation

    return(
        <div className={styles.container}>
            <p>{textToTranslate}</p>
            <hr/>
            <p>{translatedSentence}</p>
        </div>
    )
}