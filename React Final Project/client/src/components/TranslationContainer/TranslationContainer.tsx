import  { useEffect, useRef, useState } from "react";
import "./TranslationContainer.module.css";
import styles from "./TranslationContainer.module.css";
import { useParams} from "react-router-dom";
import {request} from "../../functions";
import ComponentLoading from "../ComponentLoading/ComponentLoading";
import Popup from "../Popup/Popup";
import {toast} from "react-toastify";

export default function TranslationContainer() {
    const [translatedSentence, setTranslatedSentence] = useState("");
    const [selectedWordInfo, setSelectedWordInfo] = useState("");
    const [userWordContainers, setUserWordContainers] = useState([]);
    const [clickedWordContainer, setClickedWordContainer] = useState({});
    {/*// @ts-ignore*/}
    const [isCreateWordContainerPopupVisible, setIsCreateWordContainerPopupVisible] = useState(false);
    const translationWrapper = useRef(null)
    const wordContainersRefs = useRef([])

    const [isTranslationLoading, setIsTranslationLoading] = useState(false);
    const [isTextTranslationEmerged, setIsTextTranslationEmerged] = useState(false);
    
    const [isWordExamplesPopupVisible, setIsWordExamplesPopupVisible] = useState(false);
    const [isWordSynonymsPopupVisible, setIsWordSynonymsPopupVisible] = useState(false);

    let { textToTranslate } = useParams();

    useEffect(() => {
        console.log(textToTranslate)
         if(textToTranslate){
            textToTranslate = decodeURIComponent(textToTranslate!);
            toggleTranslationContainer()
            setIsTranslationLoading(true)
            request("unknownWords/translateText","POST",{text:textToTranslate}).subscribe(
                (res:any)=>{
                    setTranslatedSentence(res.translation)
                    setIsTranslationLoading(false)
                }
            )
         }


    }, [textToTranslate]);


    const fetchUserWordContainers = () =>{
        request("unknownWords/getWordContainers","GET").subscribe(
            (res:any)=>{
                console.log(res.containers)
                setUserWordContainers(res.containers)
            }
        )
    }


    {/*// @ts-ignore*/}
    const wordClick = (word) =>{
        if(!userWordContainers.length){
            fetchUserWordContainers()
        }
        request("unknownwords/getWordInfo/"+word,"GET").subscribe(
            (res:any)=>{
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
    {/*// @ts-ignore*/}
    const selectContainerClick = (containerIndex) =>{
        const container = wordContainersRefs.current[containerIndex]
        setClickedWordContainer(userWordContainers[containerIndex])
        highlightWordContainer(container)
    }
    {/*// @ts-ignore*/}
    function highlightWordContainer(container){
        {/*// @ts-ignore*/}
        wordContainersRefs.current.find(el=>el.classList.contains(styles.clickedWordContainer))?.classList.remove(styles.clickedWordContainer)
        if(container){
            container.classList.add(styles.clickedWordContainer)
        }
    }
    {/*// @ts-ignore*/}
    const saveWordInContainerClick = (containerIndex) =>{
        {/*// @ts-ignore*/}
        const wordString = selectedWordInfo.word
        {/*// @ts-ignore*/}
        const containerId = clickedWordContainer._id

        request("unknownWords/addWordToContainer","POST",{wordString,containerId}).subscribe(
            ()=>{
                highlightWordContainer(null)
                setClickedWordContainer({})
                toast.success("успешно запазена")
            },
            ()=>{
                highlightWordContainer(null)
                setClickedWordContainer({})
            }
        )
    }
    const toggleTranslationContainer = () =>{
        {/*// @ts-ignore*/}
        setSelectedWordInfo({})
        setIsTextTranslationEmerged(!isTextTranslationEmerged)
    }

    // @ts-ignore
    return (
        <>
            <div
                ref={translationWrapper}
                className={`${styles.translationWrapper}`}
            >
                <div
                    className={styles.translationWrapperOverlay}
                    style={{display:isTextTranslationEmerged?"block":"none"}}
                ></div>
                <div ref={translationWrapper} className={`${styles.translationC} ${isTextTranslationEmerged?styles.emerged:null}`}>
                    <i  onClick={toggleTranslationContainer} className={`fa-solid fa-xmark ${styles.xmark}`}></i>

                    <div className={styles.sentenceAndTranslation}>
                        <div className={styles.sentenceC}>
                            {/*// @ts-ignore*/}
                            {textToTranslate&&textToTranslate.split(" ").map((word, index) => {
                                return <h6 onClick={()=>wordClick(word)} className={styles.word}>
                                    {word}
                                </h6>
                            })}
                        </div>
                        {/*// @ts-ignore*/}
                        {!selectedWordInfo.word&&
                            <div className={styles.sentenceTranslationC}>
                                <p className={styles.translation}>{isTranslationLoading&&<ComponentLoading bgColor={"#F4F4F4"}/>}{translatedSentence}</p>
                            </div>
                        }
                        {/*// @ts-ignore*/}
                        {selectedWordInfo.word&&
                            <div className={styles.wordDetailsC}>
                                <div className={styles.detailPair}>
                                    <h6 className={styles.detailLabel}>дума:</h6>
                                    {/*// @ts-ignore*/}
                                    <h6 className={styles.detailValue}>{selectedWordInfo.word}</h6>
                                </div>
                                <div className={styles.detailPair}>
                                    <h6 className={styles.detailLabel}>превод:</h6>
                                    {/*// @ts-ignore*/}
                                    <h6 className={styles.detailValue}>{selectedWordInfo.translatedText}</h6>
                                </div>
                                {/*// @ts-ignore*/}
                                {selectedWordInfo.examples&&selectedWordInfo.examples.length>0&&
                                    <div className={styles.detailPair}>
                                        <h6 className={styles.detailLabel}>примери в изречение:</h6>
                                        <h6 onClick={toggleWordExamplesPopupVisible} className={styles.detailValueLink}>{"виж >"} </h6>
                                    </div>
                                }
                                {/*// @ts-ignore*/}
                                {selectedWordInfo.synonyms&&selectedWordInfo.synonyms.length>0&&
                                    <div className={styles.detailPair}>
                                        <h6 className={styles.detailLabel}>синоними:</h6>
                                        <h6 onClick={toggleWordSynonymsPopupVisible} className={styles.detailValueLink}>{"виж >"} </h6>
                                    </div>
                                }

                                <div className={styles.wordContainersLAbelAndBtn}>
                                    <h6 className={styles.detailLabel}>Запази в група от думи:</h6>
                                    {/*// @ts-ignore*/}
                                    <button disabled={!clickedWordContainer._id} onClick={saveWordInContainerClick} className={styles.saveWordCBtn}>Запази</button>
                                </div>

                                <div className={styles.wordContainersC}>
                                    {userWordContainers.length>0&&userWordContainers.map((container,index)=><>
                                        <div
                                            className={styles.wordContainerC}
                                            // @ts-ignore*/
                                            style={{backgroundColor:container.colorCode}}
                                            // @ts-ignore*/
                                            ref={(el:any) => wordContainersRefs.current[index] = el}
                                            onClick={()=>selectContainerClick(index)}
                                        >
                                            {/*// @ts-ignore*/}
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
                        {/*// @ts-ignore*/}
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
                        {/*// @ts-ignore*/}
                        {selectedWordInfo.synonyms.map(syn=> <>
                            <h6 className={styles.text}>{syn}</h6>
                        </> )}
                    </div>
                </Popup>
            }
               </>


    );
}
