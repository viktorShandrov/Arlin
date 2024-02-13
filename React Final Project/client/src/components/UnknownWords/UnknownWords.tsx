import styles from "./UnknownWords.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import ComponentLoading from "../ComponentLoading/ComponentLoading.tsx";
import PopUpOverlay from "../PopUpOverlay/PopUpOverlay.tsx";
import useForm from "../../hooks/useForm.tsx";
import {toast} from "react-toastify";

export default function UnknownWords(){
    // const [words,setWords] = useState([])
    const [userWordContainers, setUserWordContainers] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const [isPopUpVisible,setIsPopUpVisible] = useState(false)
    const [createWordContainerForm,onChange] = useForm({containerName:"",colorCode:"#de2bff"})
    useEffect(()=>{
        setIsLoading(true)
        fetchUserWordContainers()
        // request("unknownWords/all","GET").subscribe(
        //     (res)=>{
        //         setWords(res)
        //         setIsLoading(false)
        //
        //     }
        // )
    },[])

    const fetchUserWordContainers = () =>{
        request("unknownWords/getWordContainers","GET").subscribe(
            (res:any)=>{
                console.log(res.containers)
                setUserWordContainers(res.containers)
                setIsLoading(false)
            }
        )
    }
    const showPopUpClickHandler = ()=>{
        setIsPopUpVisible(true)
    }
    const createWordContainerClickHandler = () =>{

        request("unknownWords/createWordContainer","POST",{colorCode:createWordContainerForm.colorCode,name:createWordContainerForm.containerName}).subscribe(
            (res:any)=>{
                toast.success("Успешно създадена група")
                hidePopup()
            }
        )
    }
    const cancelWordContainerClickHandler = () =>{
        hidePopup()
    }
    const hidePopup = () =>{
        setIsPopUpVisible(false)
        onChange({target:{name:"containerName",value:""}})
        onChange({target:{name:"colorCode",value:"#de2bff"}})
    }
    // @ts-ignore
    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.headingAndCountC}>
                        <h4 className={styles.heading}>Непознати думи</h4>
                    </div>

                    <hr className={styles.hr}/>
                    <div className={styles.wordsWrapper}>
                        {isLoading&&<ComponentLoading />}
                        <div className={styles.wordContainersC}>
                            {userWordContainers.length&&userWordContainers.map((container:any)=><details className={styles.wordContainer}>
                                <summary>
                                    <div className={styles.firstInfo}>
                                        <i className={`${styles.optionsBtn} fa-solid fa-gear`}></i>
                                        <div
                                            style={{
                                                backgroundColor:container.colorCode
                                            }
                                            }
                                            className={styles.containerColor}
                                        >


                                        </div>
                                        <div className={styles.containerName}>
                                            {container.name}
                                        </div>
                                    </div>


                                    <div className={styles.countAndToggleBtn}>
                                        <h5 className={styles.count}>{container.words.length>99?"99+":container.words.length}</h5>
                                        <i className="fa-solid fa-caret-down"></i>
                                    </div>
                                </summary>

                                <div className={styles.wordsContainer}>
                                    {container.words.length>0&&container.words.reverse().map((word:any,index:number)=>{

                                        return <details className={styles.row} key={index}>
                                            <summary className={styles.summary}>
                                                {word.wordRef.word}
                                                <i className="fa-solid fa-caret-down"></i>
                                            </summary>
                                            <h6 className={styles.translation}>{word.wordRef.translatedText}</h6>
                                        </details>


                                    })}

                                    {container.words.length==0&&
                                        <div className={styles.noWordsC}>Нямаш запазени непознати думи</div>
                                    }

                                </div>




                            </details>)
                            }
                        </div>



                    </div>

                </div>
            </div>
            <div className={styles.actionBtnsC}>
                <button onClick={showPopUpClickHandler} className={styles.createNewGroupBtn}>създай нова група</button>
                <button className={styles.saveNEwWordsBtn}>намери още думи</button>
            </div>
            <div className={styles.buyBtnWrapper}>
                {/*<stripe-buy-button*/}
                {/*    buy-button-id="buy_btn_1OIWmyAPrNaPFyVRmw78cr1J"*/}
                {/*    publishable-key="pk_live_51OEwwSAPrNaPFyVRf6RiYUnrC0lm4mHy12PxGfJUmWmC5SHbtvL2UErsfoOynjL0iH6pma7sQae15NFRz4AxLQTa00dgG5S75V"*/}
                {/*>*/}
                {/*</stripe-buy-button>*/}
            </div>
            {isPopUpVisible&&<PopUpOverlay>
                <div className={styles.createWordGroupWrapper}>
                    <div className={styles.createWordGroupC}>
                        <h5>създаване на нова група за думи</h5>
                        <div className={styles.colorPickAndNameInput}>
                            <div className={styles.colorPicker}>
                                <input value={createWordContainerForm.colorCode} onChange={onChange} name={"colorCode"} type="color"/>
                            </div>
                            <input value={createWordContainerForm.containerName} onChange={onChange} name={"containerName"} className={styles.nameInput} type="text" placeholder={"Име на нова група"}/>

                        </div>
                        <div className={styles.createBtns}>
                            <button disabled={!createWordContainerForm.containerName} onClick={createWordContainerClickHandler} className={styles.createBtn}>създай</button>
                            <button onClick={cancelWordContainerClickHandler} className={styles.cancelBtn}>отказ</button>
                        </div>

                    </div>

                </div>




            </PopUpOverlay>}


        </>
    )
}