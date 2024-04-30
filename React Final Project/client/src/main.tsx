import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from "react-router-dom";


import {REST_API} from "./contants";
//@ts-ignore
import {store} from "./redux/store";
import {setInitialData} from "./redux/user";
import StateProvider from "./redux/StateProvider/StateProvider";
import {StrictMode} from "react";



async function getDataFromServer(){
    const token = localStorage.getItem("token")
    if(token){
        const userData = await(await fetch(`${REST_API}users/userInfo`,{headers:{Authorization:token}})).json()
        return {...userData,token,userId:userData._id}
    }else{
        return null
    }
}


getDataFromServer()
    .then((user:any)=>{
        ReactDOM.createRoot(document.getElementById('root')!).render(
            <HashRouter >
                <StateProvider initialState={user}>
                    <App />
                </StateProvider>
            </HashRouter>
        )
    })


// getDataFromServer().then((initialData) => {
//     store.dispatch(setInitialData(initialData));
// })


