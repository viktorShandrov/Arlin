import { createSlice } from '@reduxjs/toolkit'




export const counterSlice = createSlice({
    name: 'user',
    initialState:{
        user:null
    },
    reducers: {
        setUser(state,action){
            state.user = action.payload
        },
        setInitialData: (state, action) => {
            //@ts-ignore
            state.user = action.payload;
        },
    },
})
// function getDataFromLocalStorage(){
//     const item = localStorage.getItem("user")
//     if(item){
//         return JSON.parse(item)
//     }
//     return {}
// }


// Action creators are generated for each case reducer function
export const { setUser,setInitialData } = counterSlice.actions

export default counterSlice.reducer