import styles from "./NewsDetails.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import TranslationContainer from "../TranslationContainer/TranslationContainer";
import Sentence from "../Story/Sentence/Sentence";
import ComponentLoading from "../ComponentLoading/ComponentLoading";

export default function NewsDetails(){
    const {id} = useParams()
    const navigate = useNavigate()
    const [news,setNews] = useState<any>({
        _id: undefined,
        title: undefined,
        date: undefined,
        urlToImage: undefined,
        splitedText:undefined
    })
    const [isLoading,setIsloading] = useState(true)
    useEffect(()=>{
        request(`news/${id}`,"GET").subscribe(
            (res:any)=>{

                const date = new Date(res.news.publishedAt).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                    timeZone: 'UTC', // Adjust the time zone based on your needs
                });
                res.news.date = date
                    res.news.splitedText =""
                for (let i = 0; i <3 ; i++) {
                    res.news.splitedText+=res.news.content
                }
                res.news.splitedText = res.news.splitedText.split(/(?<=[?!.])/)
                setNews(res.news)
                setIsloading(false)
            }
        )
    },[])
    const sentenceClickHandler = (sentence:string)=>{
        navigate(`/main/news/${news._id}/${sentence}`)
    }

    return(
        <>
            <div className={styles.detailsWrapper} >
                {isLoading&&<ComponentLoading/>}
                <div className={styles.detailsC} >
                    <h1 className={styles.title}>
                        {news.title}
                    </h1>
                    <span className={styles.date}>{news.date}</span>
                    <div className={styles.imgC} >
                        <img src={news.urlToImage} />
                    </div>
                    <div className={styles.content} >

                        {news.splitedText&&news.splitedText.map((sentence:string,index:number)=>{
                            return <div onClick={()=>sentenceClickHandler(sentence)} key={index}>
                                <Sentence  text={sentence}/>

                            </div>

                        })}
                    </div>
                </div>

                        <Routes>
                            <Route path={"/:textToTranslate"} element={<TranslationContainer/>} />
                        </Routes>
                    {/*<div className={styles.translationC}>*/}
                    {/*</div>*/}

            </div>
        </>
    )
}