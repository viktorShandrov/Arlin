// import {useDispatch, useSelector} from "react-redux";
// import {setUser} from "../../redux/user";
import {useContext, useEffect, useRef} from "react";
import {toast} from "react-toastify";
import {userContext} from "../../redux/StateProvider/StateProvider";

export default function XP(){
    {/*// @ts-ignore*/}
    const { userState,setUserState } = useContext(userContext);

    // const {user} = useSelector((state:any)=>state.user)
    // const dispatch = useDispatch();
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
        //@ts-ignore
        return originalFetch.current.apply(this, arguments)
            .then(async(response) => {

                const clonedResponse = response.clone();


                const contentType = clonedResponse.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await newUserData(userState())

                    if(Object.keys(data)[0]){
                        setUserState(data);
                    }

                    //@ts-ignore
                   async function newUserData(trueUser){
                        const responseData = await clonedResponse.json();

                        // console.log("responseData.itemAdded:", responseData.itemAdded);
                        // console.log("user.token:", user.token);
                        let userPayload = {...trueUser}

                        if(responseData.advancementsAchieved){
                            userPayload = {...userPayload,advancementsAchieved:responseData.advancementsAchieved}
                        }
                        // Calculate the new user state outside of the action creator
                        if(responseData.itemAdded||responseData.expAdded){
                            const exp = Number(userPayload.exp) + ((Number(responseData.expAdded)||0)*userState().expMultiplier.value);

                            if(responseData.itemAdded&&!userPayload.inventory){
                                userPayload.inventory={}
                            }
                            const newInventory = responseData.itemAdded? {
                                ...userPayload.inventory,
                                [responseData.itemAdded]: (userPayload.inventory[responseData.itemAdded] || 0) + 1
                            }:userPayload.inventory;

                            userPayload = {...userPayload, exp, inventory: newInventory }
                        }
                        if(responseData.info){
                            for (const info of responseData.info) {
                                toast.info(info)
                            }
                        }
                        return userPayload
                    }
                }
                return response;
            })
            .catch(error => {
                throw error;
            });
    }
    return setUserState;
},[])



return null


}