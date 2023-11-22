

import styles from './App.module.css'
import {Route, Routes} from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import {createContext, useEffect, useState} from "react";
import Test from "./Test/Test";
import UnknownWords from "./UnknownWords/UnknownWords";
import AllBooks from "./AllBooks/AllBooks";
import BookDetails from "./BookDetails/BookDetails";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer ,toast} from "react-toastify";
import User from "./Users/Users";
import Main from "./Main/Main";
import useLocalStorage from "./hooks/useLocalStorage";
    export const userContext=createContext({})
function App() {
        const [user,setUser]= useLocalStorage("user",{})
    useEffect(()=>{
        console.log("initial load")
        // const userObject = localStorage.getItem("user")
        // if(userObject){
        //     setUser(JSON.parse(userObject))
        // }
    },[])

  return (
      <>

          <ToastContainer position={toast.POSITION.TOP_RIGHT} />
          <userContext.Provider value={{user,setUser}}>
              <div className={styles.mainWrapper}>
                  <Routes>
                      <Route path={"/admin/*"} element={<AdminPanel />}></Route>

                      <Route path={"/user/*"} element={<User />}></Route>
                      <Route path={"/main/*"} element={<Main />}></Route>
                  </Routes>
              </div>
          </userContext.Provider>




      </>

  )
}

export default App
