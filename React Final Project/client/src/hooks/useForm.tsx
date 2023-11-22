import {useState} from "react";

export default function useForm(initialValue){
    const [formValues,setFormValues] = useState(initialValue)
    const onFormChange=(e:any)=>{

        setFormValues(state=>{
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })
    }
    return[
        formValues,
        onFormChange
    ]
}