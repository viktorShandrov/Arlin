

import "./Sentence.css"

export default function Sentence(props:any) {


    function onClickHandler(){
        // functions.changeTranslation(sentence)

    }
    return(
        <span onClick={()=>onClickHandler()}  className={"sentence"} >{props.text}</span>
    )
}