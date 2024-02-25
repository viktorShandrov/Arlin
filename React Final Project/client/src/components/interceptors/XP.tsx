import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/user";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";

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
                    let userPayload = {...user}

                    if(responseData.advancementsAchieved){
                        userPayload = {...userPayload,advancementsAchieved:responseData.advancementsAchieved}
                    }
                    // Calculate the new user state outside of the action creator
                    console.log("responseData.expAdded",(Number(responseData.expAdded)||0))
                    if(responseData.itemAdded||responseData.expAdded){
                        const exp = Number(userPayload.exp) + (Number(responseData.expAdded)||0);
                        console.log(exp)

                        if(responseData.itemAdded&&!userPayload.inventory){
                            userPayload.inventory={}
                        }
                        const newInventory = responseData.itemAdded? {
                            ...userPayload.inventory,
                            [responseData.itemAdded]: (userPayload.inventory[responseData.itemAdded] || 0) + 1
                        }:userPayload.inventory;

                        userPayload = {...userPayload, exp, inventory: newInventory }
                        console.log(userPayload)
                    }
                    if(responseData.info){
                        for (const info of responseData.info) {
                            toast.info(info)
                        }
                    }
                        dispatch(setUser(userPayload));

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