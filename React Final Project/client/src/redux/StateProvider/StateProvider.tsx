

import {createContext} from "react";
{/*// @ts-ignore*/}
import { useSynchronousState } from '@toolz/use-synchronous-state';







export const userContext = createContext(null);
{/*// @ts-ignore*/}
export default function StateProvider({initialState,children}){
    const [userState, setUser] = useSynchronousState(initialState);




    const setUserState =(user:any)=>{
        // console.log("state changed from:", window.location.hash)
        setUser(user)
    }

    return(
        <>
            {/*// @ts-ignore*/}
            <userContext.Provider value={{ userState, setUserState }}>
                {children}
            </userContext.Provider>
        </>

    )
}