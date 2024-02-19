import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/user";
import {useEffect, useRef, useState} from "react";

export default function XP(){
    const {user} = useSelector((state:any)=>state.user)
    const dispatch = useDispatch();
    const originalFetch = useRef(window.fetch);
    // setTimeout(()=>{
    //     console.log(user.exp);
    // },0)



useEffect(()=>{

    // Override the fetch function with a custom implementation
    // @ts-ignore
    window.fetch = function(url, options) {
        // Log the request

        // Call the original fetch function
        return originalFetch.current.apply(this, arguments)
            .then(async(response) => {

                const clonedResponse = response.clone();

                const contentType = clonedResponse.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const responseData = await clonedResponse.json();

                    // console.log("responseData.itemAdded:", responseData.itemAdded);
                    // console.log("user.token:", user.token);



                    // Calculate the new user state outside of the action creator
                    if(responseData.itemAdded||responseData.expAdded){
                        console.log(responseData.itemAdded)
                        console.log(responseData.expAdded)
                        const exp = Number(user.exp) + (Number(responseData.expAdded)||0);
                        console.log(exp)
                        const newInventory = responseData.itemAdded? {
                            ...user.inventory,
                            [responseData.itemAdded]: (user.inventory[responseData.itemAdded] || 0) + 1
                        }:user.inventory;
                        dispatch(setUser({...user, exp, inventory: newInventory }));
                    }


// Dispatch a plain object action with the calculated values


                    // if(user.token&&responseData.expAdded){
                    //     const exp = Number(user.exp)+Number(responseData.expAdded)
                    //     if(responseData.itemAdded){
                    //         const newUser = {...user,exp,inventory:{...user.inventory,[responseData.itemAdded]:user.inventory[responseData.itemAdded]+1}}
                    //         console.log("newUser1",newUser)
                    //
                    //         dispatch(setUser(newUser))
                    //     }else{
                    //         const newUser = {...user,exp}
                    //         console.log("newUser2",newUser)
                    //         dispatch(setUser(newUser))
                    //     }
                    // }
                }

                return response;
            })
            .catch(error => {
                throw error;
            });
    }
},[user])



return null


}