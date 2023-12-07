

import styles from './App.module.css'
import {Navigate, Route, Routes} from "react-router-dom";
// import AdminPanel from "./admin/AdminPanel";
import Main from "./components/Main/Main";
import React, {createContext, useEffect,Suspense} from "react";
import {Provider} from "react-redux";
// @ts-ignore
import {store} from "./redux/store.js";

const AdminPanel = React.lazy(()=>import("./admin/AdminPanel"))


import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer ,toast} from "react-toastify";
import User from "./components/Users/Users";
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

                        <Route path={"/admin/*"} element={
                            <Suspense fallback={<p>Entering admin panel</p>}>
                                <AdminPanel />
                            </Suspense>
                        }></Route>

                      <Route path={"/"} element={<Navigate to={"/main/read"}/>}></Route>
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
