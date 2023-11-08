import {useState} from "react";
import {request} from "../../functions";
export default function AddChapterPanel(){
    const [form,setForm] = useState({
        bookId:"",
        chapterName:"",
        chapterText:"",
    })
    const onFormChange=(e:any)=>{

        setForm(state=>{
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })
    }

    const submitForm = ()=>{
        console.log(JSON.stringify(form))
        request("chapters/create","POST",form).subscribe(
            (res)=>{

            },
            (error)=>{
                console.log(error)
            }
        )
    }
    return(
        <>
            <input
                type="text"
                name="bookId"
                placeholder={"BookId"}
                className={"bookNameInput"}
                value={form.bookId}
                onChange={onFormChange}
            />
            <input
                type="text"
                name="chapterName"
                placeholder={"Chapter name"}
                className={"chapterNameInput"}
                value={form.chapterName}
                onChange={onFormChange}
            />
            <textarea
                name="chapterText"
                placeholder={"Chapter text"}
                className={"chapterTextInput"}
                value={form.chapterText}
                onChange={onFormChange}
            />
            <button className={"submitBtn"} onClick={submitForm}>Add chapter</button>

        </>

    )
}