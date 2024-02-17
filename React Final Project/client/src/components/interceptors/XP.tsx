import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/user";
import {useEffect} from "react";
import {lightGreen} from "@mui/material/colors";

export default function XP(){
    const {user} = useSelector((state:any)=>state.user)
    const dispatch = useDispatch();
    // setTimeout(()=>{
    //     console.log(user.exp);
    // },0)



useEffect(()=>{
    const originalFetch = window.fetch;

    // Override the fetch function with a custom implementation
    // @ts-ignore
    window.fetch = function(url, options) {
        // Log the request

        // Call the original fetch function
        return originalFetch.apply(this, arguments)
            .then(async(response) => {
                const clonedResponse = response.clone();

                const contentType = clonedResponse.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const responseData = await clonedResponse.json();

                    // console.log("responseData.itemAdded:", responseData.itemAdded);
                    // console.log("user.token:", user.token);

                    if(user.token&&responseData.expAdded){
                        dispatch(setUser({...user,exp:Number(user.exp)+Number(responseData.expAdded)}))
                    }
                    if(user.token&&responseData.itemAdded){
                        dispatch(setUser({...user,inventory:{...user.inventory,[responseData.itemAdded]:user.inventory[responseData.itemAdded]+1}}))
                    }
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