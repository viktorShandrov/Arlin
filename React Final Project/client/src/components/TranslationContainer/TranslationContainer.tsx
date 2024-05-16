import  { useEffect, useRef, useState } from "react";
import "./TranslationContainer.module.css";
import styles from "./TranslationContainer.module.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {request} from "../../functions";
import ComponentLoading from "../ComponentLoading/ComponentLoading";
import Popup from "../Popup/Popup";
import CreateWordContainer from "../CreateWordContainer/CreateWordContainer";

export default function TranslationContainer() {
    const [translatedSentence, setTranslatedSentence] = useState("");
    const [selectedWordInfo, setSelectedWordInfo] = useState("");
    const [clickedWords, setClickedWords] = useState([]);
    const [userWordContainers, setUserWordContainers] = useState([]);
    const [isCreateWordContainerPopupVisible, setIsCreateWordContainerPopupVisible] = useState(false);
    const wordsContainerRef = useRef<HTMLParagraphElement>(null)
    const translationWrapper = useRef(null)

    const [isTranslationLoading, setIsTranslationLoading] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
    const [isWordExamplesPopupVisible, setIsWordExamplesPopupVisible] = useState(false);
    const [isWordSynonymsPopupVisible, setIsWordSynonymsPopupVisible] = useState(false);

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
            request("unknownWords/translateText","POST",{text:textToTranslate}).subscribe(
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
                    {/*//@ts-ignore*/}
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
                console.log(res.containers)
                setUserWordContainers(res.containers)
            }
        )
    }
    const showWordInfoClickHandler = (word:string) =>{
        setIsPopupVisible(true)
        setSelectedWordInfo(word)
        if(!userWordContainers.length){
            // fetchUserWordContainers()
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

    const wordClick = (word) =>{
        if(!userWordContainers.length){
            fetchUserWordContainers()

        }
        request("unknownwords/getWordInfo/"+word,"GET").subscribe(
            (res)=>{
                console.log(res.word)
                setSelectedWordInfo(
                    res.word?
                    res.word:
                    {
                        word,
                        translatedText:"/ще се преведе след запазване в контейнтер/"
                    }
                )
            }
        )
    }
    const toggleWordSynonymsPopupVisible = () =>{
        setIsWordSynonymsPopupVisible(!isWordSynonymsPopupVisible)
    }
    const toggleWordExamplesPopupVisible = () =>{
        setIsWordExamplesPopupVisible(!isWordExamplesPopupVisible)
    }

    // @ts-ignore
    return (
        <>
            <div ref={translationWrapper} className={styles.translationWrapper}>
                <div className={styles.translationWrapperOverlay}></div>
                <div ref={translationWrapper} className={styles.translationC}>
                    <div className={styles.sentenceAndTranslation}>
                        <div className={styles.sentenceC}>
                            {textToTranslate&&textToTranslate.split(" ").map((word, index) => {
                                return <h6 onClick={()=>wordClick(word)} className={styles.word}>
                                    {word}
                                </h6>
                            })}
                        </div>
                        {!selectedWordInfo.word&&
                            <div className={styles.sentenceTranslationC}>
                                <p className={styles.translation}>{isTranslationLoading&&<ComponentLoading/>}{translatedSentence}</p>
                            </div>
                        }
                        {selectedWordInfo.word&&
                            <div className={styles.wordDetailsC}>
                                <div className={styles.detailPair}>
                                    <h6 className={styles.detailLabel}>дума:</h6>
                                    <h6 className={styles.detailValue}>{selectedWordInfo.word}</h6>
                                </div>
                                <div className={styles.detailPair}>
                                    <h6 className={styles.detailLabel}>превод:</h6>
                                    <h6 className={styles.detailValue}>{selectedWordInfo.translatedText}</h6>
                                </div>
                                {selectedWordInfo.examples&&selectedWordInfo.examples.length>0&&
                                    <div className={styles.detailPair}>
                                        <h6 className={styles.detailLabel}>примери в изречение:</h6>
                                        <h6 onClick={toggleWordExamplesPopupVisible} className={styles.detailValueLink}>{"виж >"} </h6>
                                    </div>
                                }
                                {selectedWordInfo.synonyms&&selectedWordInfo.synonyms.length>0&&
                                    <div className={styles.detailPair}>
                                        <h6 className={styles.detailLabel}>синоними:</h6>
                                        <h6 onClick={toggleWordSynonymsPopupVisible} className={styles.detailValueLink}>{"виж >"} </h6>
                                    </div>
                                }

                                <h6 className={styles.detailLabel}>Запази в група от думи</h6>
                                <div className={styles.wordContainersC}>
                                    {userWordContainers.length>0&&userWordContainers.map(container=><>
                                        <div
                                            className={styles.wordContainerC}
                                            style={{backgroundColor:container.colorCode}}
                                        >
                                            {container.name}
                                        </div>
                                    </>)
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>


            {isWordExamplesPopupVisible&&
                <Popup hidePopup={toggleWordExamplesPopupVisible} isWithDisplayNone={!isWordExamplesPopupVisible} styleSelector={styles.wordExamplesPopup}>
                    <div className={styles.heading}>
                        <span>примери в изречение</span>
                    </div>
                    <div className={styles.examplesC}>
                        {selectedWordInfo.examples.map(ex=> <>
                            <div className={styles.examplePair}>
                                <h6 className={styles.text}>{ex.sentenceWhereWordsIsPresent}</h6>
                                <h6 className={styles.translation}>{ex.translation}</h6>
                            </div>

                        </> )}
                    </div>
                </Popup>
            }

            {isWordSynonymsPopupVisible&&
                <Popup hidePopup={toggleWordSynonymsPopupVisible} isWithDisplayNone={!isWordSynonymsPopupVisible} styleSelector={styles.wordExamplesPopup}>
                    <div className={styles.heading}>
                        <span>синоними</span>
                    </div>
                    <div className={styles.examplesC}>
                        {selectedWordInfo.synonyms.map(syn=> <>
                            <h6 className={styles.text}>{syn}</h6>
                        </> )}
                    </div>
                </Popup>
            }


            {/*{textToTranslate&&<div className={ `${styles.container} ${textToTranslate?styles.visible:null}` }>*/}
            {/*    <i  onClick={()=>closeTextToTranslatePanel()} className={`fa-solid fa-xmark ${styles.xmark}`}></i>*/}
            {/*    <div className={styles.elements}>*/}
            {/*        <h6 className={styles.heading}>Избери думите, които са ти непознати:</h6>*/}
            {/*        <p className={styles.textForTranslate} ref={wordsContainerRef}>*/}
            {/*            {textToTranslate?.split(" ").map((el, index) => {*/}
            {/*                if(!el){*/}
            {/*                    return null*/}
            {/*                }*/}
            {/*                el = el.replace(/^[,."\s:]+|[,\s:]+$/g, "")*/}
            {/*                return (*/}
            {/*                    <span*/}
            {/*                        style={*/}
            {/*                            {*/}
            {/*                                backgroundColor:clickedWords.find((word:any)=>word.text===el)?.colorCode*/}
            {/*                            }*/}
            {/*                        }*/}
            {/*                        key={index}*/}
            {/*                        className={`${styles.word} `}*/}
            {/*                        data-isclicked={!!clickedWords.find((word:any)=>word.text===el)}*/}
            {/*                        onClick={(e) => handleWordClick(e,el)}*/}
            {/*                        // ref={spanRef}*/}
            {/*                    >*/}
            {/*              {el}*/}
            {/*                        {!!clickedWords.find((word:any)=>word.text===el)&&<i onClick={()=>showWordInfoClickHandler(el)} className={`${styles.info} fa-solid fa-info`}></i>}*/}
            {/*            </span>*/}
            {/*                );*/}
            {/*            })}*/}
            {/*        </p>*/}
            {/*        {clickedWords.some((el) => !el.isSaved) && (*/}
            {/*            <button onClick={saveWordsClickHandler} className={styles.saveWords}>*/}
            {/*                Запази думи*/}
            {/*            </button>*/}
            {/*        )}*/}

            {/*        <hr />*/}
            {/*        <h6 className={styles.heading}>Превод:</h6>*/}
            {/*        <p className={styles.translation}>{isTranslationLoading&&<ComponentLoading/>}{translatedSentence}</p>*/}
            {/*    </div>*/}


            {/*</div>}*/}
            {/*<div onClick={()=>closeTextToTranslatePanel()} className={styles.overlay}></div>*/}

            {/*{isPopupVisible&&<Popup hidePopup={closeWordInfoPopup} styleSelector={styles.popupWrapper}>*/}
            {/*    <div className={styles.wordInfoWrapper}>*/}
            {/*        <div className={styles.wordInfoC}>*/}
            {/*            <div className={styles.infosC}>*/}
            {/*                <div className={styles.infoC}>*/}
            {/*                    <p className={styles.infoTitle}>дума</p>*/}
            {/*                    <h5 className={styles.infoValue}>{selectedWordInfo}</h5>*/}
            {/*                </div>*/}

            {/*            </div>*/}
            {/*            <div className={styles.userWordContainersC}>*/}
            {/*                <h6 className={styles.groupsHeading}>ваши създадени групи от думи</h6>*/}
            {/*                {userWordContainers.map((container:any)=>{*/}
            {/*                   return <div onClick={()=>addWordToSpecificGroupClickHandler(selectedWordInfo,container.name,container.colorCode)} className={styles.userWordContainerC}>*/}
            {/*                       <div*/}
            {/*                           style={{*/}
            {/*                               backgroundColor:container.colorCode*/}
            {/*                            }*/}
            {/*                           }*/}
            {/*                           className={styles.containerColor}*/}
            {/*                       >*/}
            {/*                       </div>*/}

            {/*                        {container.name}*/}

            {/*                    </div>*/}
            {/*                })}*/}
            {/*                <div onClick={()=>setIsCreateWordContainerPopupVisible(true)} className={styles.userWordContainerC}>*/}
            {/*                    <i className={`${styles.plusSign} fa-solid fa-plus`}></i>*/}
            {/*                    нова група*/}
            {/*                </div>*/}
            {/*                {!userWordContainers.length&&<ComponentLoading/>}*/}
            {/*            </div>*/}


            {/*        </div>*/}
            {/*    </div>*/}

            {/*</Popup>}*/}
            {/*{isCreateWordContainerPopupVisible&&<CreateWordContainer setUserWordContainers={setUserWordContainers} setIsCreateGroupPopUpVisible={setIsCreateWordContainerPopupVisible}/>}*/}
        </>


    );
}
