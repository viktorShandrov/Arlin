import {useState} from "react";
import {request} from "../../functions";
import styles from "../addBook/AddBook.module.css";
export default function AddChapterPanel(){
    const [formValues,setFormValues] = useState({
        bookId:"",
        chapterName:"",
        chapterText:"",
    })
    const onFormChange=(e:any)=>{

        setFormValues(state=>{
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })
    }

    const submitForm = ()=>{
        // console.log(JSON.stringify(form))
        request("chapters/create","POST",formValues).subscribe(
            (res)=>{

            },
        )
    }
    return(
        <>
            <h1>Create chapter</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formC}>
                    <input name={"bookId"} placeholder={"BookId"} value={formValues.bookId} onChange={onFormChange} />
                    <input name={"chapterName"} placeholder={"Chapter name"} value={formValues.chapterName} onChange={onFormChange} />
                    <textarea name={"chapterText"} placeholder={"Book chapterText"} value={formValues.chapterText} onChange={onFormChange} />
                    <button onClick={submitForm} className={styles.submitBtn}>Create</button>
                </div>
            </div>
        </>

    )
}