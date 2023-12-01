import styles from "./UnknownWords.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";

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
                    <div className={styles.headingAndCountC}>
                        <h3 className={styles.heading}>Непознати думи</h3>
                        <div className={styles.count}>{words.length>99?"99+":words.length}</div>
                    </div>

                    <hr className={styles.hr}/>
                    <div className={styles.wordsWrapper}>
                        <div className={styles.wordsContainer}>
                            {words.length>0&&words.reverse().map((word,index)=>{

                                return <details className={styles.row} key={index}>
                                    <summary className={styles.summary}>
                                        {word.word}
                                        <i className="fa-solid fa-caret-down"></i>
                                    </summary>
                                    <h5>{word.translatedText}</h5>
                                </details>


                            })}

                            {words.length==0&&
                                <div className={styles.noWordsC}>Нямаш запазени непознати думи</div>
                            }

                        </div>

                    </div>

                </div>
            </div>
            <div className={styles.buyBtnWrapper}>
                <stripe-buy-button
                    buy-button-id="buy_btn_1OIWmyAPrNaPFyVRmw78cr1J"
                    publishable-key="pk_live_51OEwwSAPrNaPFyVRf6RiYUnrC0lm4mHy12PxGfJUmWmC5SHbtvL2UErsfoOynjL0iH6pma7sQae15NFRz4AxLQTa00dgG5S75V"
                >
                </stripe-buy-button>
            </div>

        </>
    )
}