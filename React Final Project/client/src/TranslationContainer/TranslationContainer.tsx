import {useEffect, useState} from "react";
import "./TranslationContainer.css"

import {functions} from "../functions";
export default function  TranslationContainer (){
    const [rawSentence,setRawSentance] = useState("")
    const [translatedSentence,setTranslatedSentance] = useState("")


    useEffect(()=>{
        const API_KEY = "AIzaSyCwcafxQT_4clYPFoz6pR5C3KOAbNhvTc8"




        const headers = new Headers({
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${API_KEY}`,
        });

        const requestOptions = {
            method: 'POST', // or 'GET', 'PUT', 'DELETE', etc. depending on your API request
            headers: headers, // Include headers in the request options
            body: JSON.stringify({
                q: rawSentence,
                target: "bg",
            }),
        };

        fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,requestOptions)
            .then((data)=>data.json())
            .then((response:any) => {
                const translatedText = response.data.translations[0].translatedText;
                setTranslatedSentance(translatedText)
            })
            .catch((error) => {
                console.error('Translation error:', error);
            });
    },[rawSentence])

    function changeTranslation(rawSentence:string){
        setRawSentance(rawSentence)
    }
    functions.changeTranslation = changeTranslation

    return(
        <div className={"container"}>
            <p>{rawSentence}</p>
            <hr/>
            <p>{translatedSentence}</p>
        </div>
    )
}