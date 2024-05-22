import {useState} from "react";

export default function useLocalStorage(itemName:string, initialValue:any){
    const [item,setItem] = useState(()=>{
       const savedItem =  localStorage.getItem(itemName)
        if(savedItem){
            return JSON.parse(savedItem)
        }
        return initialValue
    })

    const changeItemState = (value:any)=>{
        setItem(value)
        if(typeof value ==="function"){
            localStorage.setItem(itemName,JSON.stringify(value(item)))
        }else{
            localStorage.setItem(itemName,JSON.stringify(value))
        }

    }
    return [
        item,
        changeItemState
    ]
}