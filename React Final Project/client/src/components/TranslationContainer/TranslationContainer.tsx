import  { useEffect, useRef, useState } from "react";
import "./TranslationContainer.module.css";
import styles from "./TranslationContainer.module.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {request} from "../../functions";
import ComponentLoading from "../ComponentLoading/ComponentLoading";
import PopUpOverlay from "../PopUpOverlay/PopUpOverlay";

export default function TranslationContainer() {
    const [translatedSentence, setTranslatedSentence] = useState("");
    const [selectedWordInfo, setSelectedWordInfo] = useState("");
    const [clickedWords, setClickedWords] = useState([]);
    const [userWordContainers, setUserWordContainers] = useState([]);
    const [isTranslationLoading, setIsTranslationLoading] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
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

    const handleWordClick = (e:any,text: string) => {
        if(e.target.classList.contains(styles.info)) return
        setClickedWords((prevClickedWords) => {
            const element = prevClickedWords.find((el:any)=>el.text===text)
            if(element){
                prevClickedWords.splice(prevClickedWords.indexOf(element),1)
            }else{
                // @ts-ignore
                prevClickedWords = [...prevClickedWords,{text,targetContainer:"Неконкретизирани",colorCode:"#a6a600",isSaved:false}];
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
            request("unknownWords/create", "POST", { words:clickedWords.filter((word:any)=>!word.isSaved)} ).subscribe(
                () => {
                    setClickedWords((previous:any)=>{
                        return [...previous.map((word:any)=>{return {...word,isSaved:true}})]
                    })
                }
            );
        }

    };
    const closeTextToTranslatePanel = ()=>{
        const newUrlArr =  location.pathname.split("/")
        newUrlArr.pop()
        const newUrl = newUrlArr.join("/")
        navigate(newUrl)
        setClickedWords([])

    }
    const closeWordInfoPopup = ()=>{
        setIsPopupVisible(false)
    }
    const fetchUserWordContainers = () =>{
        request("unknownWords/getWordContainers","GET").subscribe(
            (res:any)=>{
                setUserWordContainers(res.containers)
            }
        )
    }
    const showWordInfoClickHandler = (word:string) =>{
        setIsPopupVisible(true)
        setSelectedWordInfo(word)
        if(!userWordContainers.length){
            fetchUserWordContainers()
        }
    }
    const addWordToSpecificGroupClickHandler = (wordText:string,containerName:string,colorCode:any) =>{
        const word = clickedWords.find((word:any)=>word.text===wordText)
        const index = clickedWords.indexOf(word!)
        // @ts-ignore
        setClickedWords((previousWords:any)=>{
            const updated = [...previousWords]
            updated[index] = {...updated[index],targetContainer:containerName,colorCode}
            return updated
        })
        closeWordInfoPopup()
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
                                style={
                                    {
                                            backgroundColor:clickedWords.find((word:any)=>word.text===el)?.colorCode
                                    }
                                }
                                key={index}
                                className={`${styles.word} `}
                                data-isclicked={!!clickedWords.find((word:any)=>word.text===el)}
                                onClick={(e) => handleWordClick(e,el)}
                                // ref={spanRef}
                            >
                          {el}
                                {!!clickedWords.find((word:any)=>word.text===el)&&<i onClick={()=>showWordInfoClickHandler(el)} className={`${styles.info} fa-solid fa-info`}></i>}
                        </span>
                        );
                    })}
                </p>
                {clickedWords.some((el) => !el.isSaved) && (
                    <button onClick={saveWordsClickHandler} className={styles.saveWords}>
                        Запази думи
                    </button>
                )}

                <hr />
                <h6 className={styles.heading}>Превод:</h6>
                <p className={styles.translation}>{isTranslationLoading&&<ComponentLoading/>}{translatedSentence}</p>
            </div>}
            <div onClick={()=>closeTextToTranslatePanel()} className={styles.overlay}></div>

            {isPopupVisible&&<PopUpOverlay>
                <div className={styles.wordInfoWrapper}>
                    <i  onClick={()=>closeWordInfoPopup()} className={`fa-solid fa-xmark ${styles.xmark}`}></i>
                    <div className={styles.wordInfoC}>
                        <div className={styles.infosC}>
                            <div className={styles.infoC}>
                                <p className={styles.infoTitle}>дума</p>
                                <h5 className={styles.infoValue}>{selectedWordInfo}</h5>
                            </div>

                        </div>
                        <div className={styles.userWordContainersC}>
                            <h6 className={styles.groupsHeading}>групи от думи</h6>
                            {userWordContainers.map((container:any)=>{
                               return <div onClick={()=>addWordToSpecificGroupClickHandler(selectedWordInfo,container.name,container.colorCode)} className={styles.userWordContainerC}>
                                   <div
                                       style={{
                                           backgroundColor:container.colorCode
                                        }
                                       }
                                       className={styles.containerColor}
                                   >
                                   </div>

                                   {container.name}
                                </div>
                            })}
                            <div className={styles.userWordContainerC}>
                                <i className={`${styles.plusSign} fa-solid fa-plus`}></i>
                                нова група
                            </div>
                            {!userWordContainers.length&&<ComponentLoading/>}
                        </div>


                    </div>
                </div>

            </PopUpOverlay>}
        </>


    );
}
