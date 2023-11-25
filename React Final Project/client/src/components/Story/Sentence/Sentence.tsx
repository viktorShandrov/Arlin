

import "./Sentence.css"

export default function Sentence(props:any) {


    function onClickHandler(sentence:string){
        // functions.changeTranslation(sentence)

    }
    return(
        <span onClick={()=>onClickHandler(props.text+".")}  className={"sentence"} >{props.text+"."}</span>
    )
}