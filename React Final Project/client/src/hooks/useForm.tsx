import {useState} from "react";

export default function useForm(initialValue:any){
    const [formValues,setFormValues] = useState(initialValue)
    const onFormChange=(e:any)=>{

        setFormValues((state:any)=>{
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })
    }
    {/*// @ts-ignore*/}
    const populateForm = (data) =>{
        setFormValues(data)
    }
    const resetForm = (keep=[]) =>{
        const payload = {...initialValue}
        for (const [key,value] of Object.entries(formValues)) {
            {/*// @ts-ignore*/}
            if(keep.includes(key)){
                payload[key] = value
            }
        }
        setFormValues(payload)
    }
    return[
        formValues,
        onFormChange,
        resetForm,
        populateForm
    ]
}