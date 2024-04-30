
import styles from "./StateProvider.module.css"
import {createContext, useEffect, useState} from "react";
import {REST_API} from "../../contants";
import { useSynchronousState } from '@toolz/use-synchronous-state';







export const userContext = createContext(null);
export default function StateProvider({initialState,children}){
    const [userState, setUser] = useSynchronousState(initialState);




    const setUserState =(user:any)=>{
        // console.log("state changed from:", window.location.hash)
        setUser(user)
    }
    return(
        <userContext.Provider value={{ userState, setUserState }}>
            {children}
        </userContext.Provider>
    )
}