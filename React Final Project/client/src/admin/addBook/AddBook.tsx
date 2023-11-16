
import styles from "./AddBook.module.css"
import {useEffect, useState} from "react";
import {request} from "../../functions";
import {useNavigate, useNavigationType, useParams} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
export default function AddBook(){
    const {bookId} = useParams()
    const navigate = useNavigate()
const [formValues,setFormValues] = useState({
    name:"",
    author:"",
    resume:"",
    releaseDate:"",
    genre:"",
})

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const formValueChangeHandler = (e)=>{
        setFormValues(()=>{
            return {
                ...formValues,
               [ e.target.name ]: e.target.value
            }

        })
    }
    useEffect(()=>{
        if(bookId){
            request(`books/${bookId}`).subscribe(
                (res)=>{
                    console.log(res.book)
                    delete res.book.image
                    setFormValues(res.book)
                },

            )


        }
    },[bookId])

    const createBookHandler = ()=>{
        const payload = new FormData()
        // for (const formValue of Object.entries(formValues)) {
        //     payload.append(formValue[0],formValue[1])
        // }
        payload.append("file",selectedFile!,selectedFile!.name)
        payload.append("upload_preset","xw4yrog1")


        request("books/create","POST",{bookData: formValues},

            ).subscribe(
            (res)=>{

                fetch(`http://localhost:3000/books/addImageToBook/${res._id}`, {
                    method: 'POST',
                    body: payload,
                    headers:{
                        Authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null
                    }
                }).then((response)=>{
                    if(response.ok){
                        navigate("/main/AllBooks")
                    }
                }).catch(()=>{
                    toast.error("Cannot upload image")
                });

            },
            (error)=>{
                console.log(error)
            }
        )
    }
    const editBookHandler = ()=>{
        request(`books/${bookId}/edit`,"POST",{bookData:formValues}).subscribe(
            (res)=>{
                toast.success("Book edit is successful")
                navigate("/main/AllBooks")
            },
        )
    }

    return(
        <>
            <h1>Create/Edit book</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formC}>
                    <input name={"name"} placeholder={"Book name"} value={formValues.name} onChange={formValueChangeHandler} />
                    <input name={"author"} placeholder={"Book author"} value={formValues.author} onChange={formValueChangeHandler} />
                    <textarea name={"resume"} placeholder={"Book resume"} value={formValues.resume} onChange={formValueChangeHandler} />
                    <input  name={"genre"} placeholder={"Book genre"} value={formValues.genre} onChange={formValueChangeHandler} />
                    <input type={"file"} name={"image"} placeholder={"Book image"}  onChange={handleFileChange} />
                    <input type={"date"}  name={"releaseDate"} placeholder={"Book releaseDate"} value={formValues.releaseDate} onChange={formValueChangeHandler} />
                    {!bookId&&
                        <button onClick={createBookHandler} className={styles.submitBtn}>Create</button>
                    }
                    {bookId&&
                        <button onClick={editBookHandler} className={styles.editBtn}>Edit</button>
                    }
                </div>
            </div>
        </>
    )
}