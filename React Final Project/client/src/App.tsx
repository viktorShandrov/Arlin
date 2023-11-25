

import styles from './App.module.css'
import {Route, Routes} from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import {createContext, useEffect, useState} from "react";
import {Provider} from "react-redux";
import {store} from "./redux/store.js";


import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer ,toast} from "react-toastify";
import User from "./components/Users/Users";
import Main from "./components/Main/Main";
import useLocalStorage from "./hooks/useLocalStorage";
    export const userContext=createContext({})
function App() {
        const [user,setUser]= useLocalStorage("user",{})
    useEffect(()=>{
        console.log("initial load")

    },[])

  return (
      <>

          <ToastContainer position={toast.POSITION.TOP_RIGHT} />
          <Provider store={store}>
              <div className={styles.mainWrapper}>
                  <Routes>
                      <Route path={"/admin/*"} element={<AdminPanel />}></Route>

                      <Route path={"/user/*"} element={<User />}></Route>
                      <Route path={"/main/*"} element={<Main />}></Route>
                  </Routes>
              </div>
          </Provider>
          <userContext.Provider value={{user,setUser}}>
          </userContext.Provider>




      </>

  )
}

export default App
