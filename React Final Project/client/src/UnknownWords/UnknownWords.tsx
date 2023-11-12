import styles from "./UnknownWords.module.css"
import {useEffect, useState} from "react";
import {request} from "../functions";

export default function UnknownWords(){
    const [words,setWords] = useState([])
    useEffect(()=>{
        request("unknownWords/all","GET").subscribe(
            (res)=>{
                setWords(res)
            },
                (error)=>{
                    console.log(error)
                }
        )
    },[])
    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h2 className={styles.heading}>Непознати думи</h2>
                    <hr/>
                    <div className={styles.wordsContainer}>
                        {words.length>0&&words.map((word,index)=>{

                            return <details key={index}>
                                    <summary>{word.word}</summary>
                                    {word.translatedText}
                                </details>


                        })}

                    </div>
                </div>
            </div>
        </>
    )
}