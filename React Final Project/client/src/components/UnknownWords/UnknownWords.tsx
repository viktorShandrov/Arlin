import styles from "./UnknownWords.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import ComponentLoading from "../ComponentLoading/ComponentLoading.tsx";
import PopUpOverlay from "../PopUpOverlay/PopUpOverlay.tsx";
import useForm from "../../hooks/useForm.tsx";
import {toast} from "react-toastify";
import Popup from "../Popup/Popup";
import CreateWordContainer from "../CreateWordContainer/CreateWordContainer";

export default function UnknownWords(){
    // const [words,setWords] = useState([])
    const [userWordContainers, setUserWordContainers] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const [clickedWord,setClickedWord] = useState({
        isKnown:false,
        wordRef:{
            word:"",
            translatedText:"",
            examples:[]
        }

    })
    const [isCreateGroupPopUpVisible,setIsCreateGroupPopUpVisible] = useState(false)
    const [isWordInfoPopUpVisible,setWordInfoPopUpVisible] = useState(false)
    const [isWordExamplesPopUpVisible,setIsWordExamplesPopUpVisible] = useState(false)
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
        request("unknownWords/getWordContainers/true","GET").subscribe(
            (res:any)=>{
                setUserWordContainers(res.containers)
                setIsLoading(false)
            }
        )
    }
    const showPopUpClickHandler = ()=>{
        setIsCreateGroupPopUpVisible(true)
    }

    const hideWordInfoPopUp = () =>{
        setWordInfoPopUpVisible(false)
    }
    const showWordInfoPopUp = () =>{
        setWordInfoPopUpVisible(true)
    }
    const wordInfoClickHandler = (wordInfo:any) =>{
        setClickedWord(wordInfo)
        console.log(wordInfo)
        showWordInfoPopUp()
    }
    // @ts-ignore
    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.headingAndCountC}>
                        <h4 className={styles.heading}>Групи от запазени непознати думи</h4>
                    </div>

                    <hr className={styles.hr}/>
                    <div className={styles.wordsWrapper}>
                        {isLoading&&<ComponentLoading />}
                        <div className={styles.wordContainersC}>
                            {userWordContainers.length>0&&userWordContainers.map((container:any)=><details className={styles.wordContainer}>
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
                                    {container.words.length>0&&container.words.sort((a, b) => (a.isKnown === b.isKnown) ? 0 : a.isKnown ? 1 : -1).map((word:any,index:number)=>{

                                        return <div onClick={()=>wordInfoClickHandler(word)} data-isKnown={word.isKnown} className={styles.row} key={index}>
                                                {word.wordRef.word}
                                            <div className={styles.isKnownAndInfo}>
                                                {word.isKnown&&<h6 className={styles.wordIsKnown}>научена</h6>}
                                                <i  className={`${styles.info} fa-solid fa-info`}></i>
                                            </div>



                                            {/*<h6 className={styles.translation}>{word.wordRef.translatedText}</h6>*/}
                                        </div>


                                    })}

                                    {container.words.length==0&&
                                        <div className={styles.noWordsC}>Нямаш запазени непознати думи</div>
                                    }

                                </div>
                            </details>)
                            }
                        </div>
                    </div>
                    <div className={styles.actionBtnsC}>
                        <button onClick={showPopUpClickHandler} className={styles.createNewGroupBtn}>създай нова група</button>
                        <button className={styles.saveNEwWordsBtn}>намери още думи</button>
                    </div>


                </div>
            </div>

            <div className={styles.buyBtnWrapper}>
                {/*<stripe-buy-button*/}
                {/*    buy-button-id="buy_btn_1OIWmyAPrNaPFyVRmw78cr1J"*/}
                {/*    publishable-key="pk_live_51OEwwSAPrNaPFyVRf6RiYUnrC0lm4mHy12PxGfJUmWmC5SHbtvL2UErsfoOynjL0iH6pma7sQae15NFRz4AxLQTa00dgG5S75V"*/}
                {/*>*/}
                {/*</stripe-buy-button>*/}
            </div>
            {isCreateGroupPopUpVisible&& <CreateWordContainer setUserWordContainers={setUserWordContainers} setIsCreateGroupPopUpVisible={setIsCreateGroupPopUpVisible}/>



}
            {isWordInfoPopUpVisible&&
                    <Popup hidePopup={hideWordInfoPopUp} styleSelector={styles.popupWrapper}>
                        <div className={styles.wordInfoWrapper}>
                            <div className={styles.infosC}>
                                <div className={styles.infoC}>
                                    <p className={styles.infoTitle}>дума</p>
                                    <h5 className={styles.infoValue}>{clickedWord.wordRef.word}</h5>
                                </div>
                                <div className={styles.infoC}>
                                    <p className={styles.infoTitle}>превод</p>
                                    <h5 className={styles.infoValue}>{clickedWord.wordRef.translatedText}</h5>
                                </div>
                                <div className={styles.infoC}>
                                    <p className={styles.infoTitle}>позната ли е</p>
                                    <h5 className={styles.infoValue}>{clickedWord.isKnown?"да":"не"}</h5>
                                </div>
                                {clickedWord.wordRef.examples.length>0&&<div className={`${styles.infoC} ${styles.withBtn}`}>
                                    <div className={styles.example}>
                                        <p className={styles.infoTitle}>пример в изречение</p>
                                        <h5 className={styles.infoValue}>{clickedWord.wordRef.examples[0].sentenceWhereWordsIsPresent}</h5>
                                    </div>
                                    {clickedWord.wordRef.examples.length>1&&<button onClick={()=>setIsWordExamplesPopUpVisible(true)} className={styles.showMoreExamples}>виж още примери в изречения</button>}


                                </div>}
                            </div>
                        </div>
                    </Popup>

                }

            {isWordExamplesPopUpVisible&&<Popup hidePopup={()=>setIsWordExamplesPopUpVisible(false)} styleSelector={styles.popupWrapper}>
                <div className={styles.wordExamplesWrapper}>

                    <div className={styles.heading}>
                        <p>изречения включващи думата</p>
                        <h4>{clickedWord.wordRef.word}</h4>
                    </div>
                    <div className={styles.wordExamplesCWrapper}>
                        <div className={styles.wordExamplesC}>
                            {clickedWord.wordRef.examples.map((example:any)=><details className={styles.wordExampleC}>
                                <summary>{example.sentenceWhereWordsIsPresent}</summary>
                                <div className={styles.translation}>
                                    {example.translation}
                                </div>

                            </details>)}


                        </div>
                    </div>


                </div>

            </Popup> }


        </>
    )
}