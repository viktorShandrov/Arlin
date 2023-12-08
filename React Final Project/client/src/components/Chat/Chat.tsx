
import styles from "./Chat.module.css"
import useForm from "../../hooks/useForm";
import {request, translateText} from "../../functions";
import {useEffect, useRef, useState} from "react";
import Typed from 'react-typed';

export default function Chat(){


    const [formValues,onChange] = useForm({
        chatInput:''
    })
    const [isWaiting,setIsWaiting] = useState(false)
    const [messages,setMessages] = useState([])
    const chatC = useRef(undefined)
    const onSubmit=()=>{
        // @ts-ignore
        setMessages((oldMessages:any)=>{
            return [...oldMessages, {message:formValues.chatInput,isByUser:true}]
        })


        request("chat/getResponse","POST", {question:formValues.chatInput}).subscribe(
            async (res:any)=>{
                setIsWaiting(false)
                // @ts-ignore
                setMessages((oldMessages:any)=>{
                    return [...oldMessages, {message:res.message}]
                })

                const translation = await translateText(res.message)

                // @ts-ignore
                setMessages((oldMessages:any)=>{
                    const lastMessage = oldMessages[oldMessages.length-1]
                    console.log(lastMessage)
                    return [...oldMessages.slice(0,-1), {...lastMessage,translation }]
                })
            }
        )



        setIsWaiting(true)
    }
    useEffect(()=>{
        const chatContainer:any = chatC.current
        chatContainer.scrollTop = chatContainer.scrollHeight;
        console.log(messages)
    },[messages])
    // @ts-ignore
    return(
        <div className={styles.chatWrapper}>
            <div ref={chatC} className={styles.chatC}>
                {messages.map((message:any,index:number)=>{
                 return       <div key={index} data-role={message.isByUser?"user":"bot"} className={styles.message}>
                            <div className={styles.icon}>
                                <img src={message.isByUser?"/public/user.jpg":"/public/AI.png"} alt="AI.png"/>

                            </div>
                            <div className={styles.text}>
                                {message.isByUser&&
                                    <p>{message.message}</p>}

                                {!message.isByUser&&<Typed
                                    strings={[message.message]}
                                    typeSpeed={40}
                                    backSpeed={25}
                                    showCursor
                                    cursorChar="|"
                                />}
                                <div className={styles.translation}>
                                    {message.translation}
                                </div>
                            </div>
                        </div>
                })}


            </div>
            <div className={styles.inputC}>
                <div className={styles.sendC}>
                    <input value={formValues.chatInput} onChange={onChange} name={"chatInput"} type={"text"} placeholder={"Type message..."} />
                    <button disabled={isWaiting} onClick={onSubmit} className={styles.paperIcon}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}