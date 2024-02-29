
import styles from "./StateProvider.module.css"
import {createContext, useEffect, useState} from "react";
import {REST_API} from "../../contants";



async function getDataFromServer(){
    const token = localStorage.getItem("token")
    if(token){
        const userData = await(await fetch(`${REST_API}users/userInfo`,{headers:{Authorization:token}})).json()
        return {...userData,token,userId:userData._id}
    }else{
        return null
    }
}


export const userContext = createContext(await getDataFromServer());
export default function StateProvider({children}){
    const [userState, setUserState] = useState(null);

            useEffect(()=>{
                console.log("State updated: ",userState)
            },[userState])
    // const setUser =(user:any)=>{
    //     setUserState(user)
    // }
    return(
        <userContext.Provider value={{ userState, setUserState }}>
            {children}
        </userContext.Provider>
    )
}