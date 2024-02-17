import { createSlice } from '@reduxjs/toolkit'
import {REST_API} from "../contants";



export const counterSlice = createSlice({
    name: 'user',
    initialState:{
        user:await getDataFromServer()
    },
    reducers: {
        setUser(state,action){
            state.user = action.payload
        }
    },
})
// function getDataFromLocalStorage(){
//     const item = localStorage.getItem("user")
//     if(item){
//         return JSON.parse(item)
//     }
//     return {}
// }
async function getDataFromServer(){
    const token = localStorage.getItem("token")
    const userData = await(await fetch(`${REST_API}users/userInfo`,{headers:{Authorization:token}})).json()
    return userData
}

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions

export default counterSlice.reducer