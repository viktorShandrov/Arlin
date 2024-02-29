

import styles from './App.module.css'
import {Navigate, Route, Routes} from "react-router-dom";
// import AdminPanel from "./admin/AdminPanel";
import Main from "./components/Main/Main";
import React, {createContext, useEffect, Suspense} from "react";
// @ts-ignore
import {store} from "./redux/store.js";

const AdminPanel = React.lazy(()=>import("./admin/AdminPanel"))


import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer ,toast} from "react-toastify";
import User from "./components/Users/Users";
import AuthGuard from "./guards/AuthGuard/AuthGuard";
import NotFound from "./components/NotFound/NotFound";
import XP from "./components/interceptors/XP";

// export const userContext=createContext({})
function App() {

    useEffect(()=>{
        console.log("initial load")
        // navigation("main/hero")

    },[])

  return (
      <>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} />
              <div  className={styles.mainWrapper}>
                  <Routes>

                          <Route element={<AuthGuard/>}>
                              <Route path={"/admin/*"} element={
                                  <Suspense fallback={<p>Entering admin panel</p>}>
                                      <AdminPanel />
                                  </Suspense>
                              }></Route>
                          </Route>

                          <Route path={"/"} element={<Navigate to={"/main/read"}/>}></Route>
                          <Route path={"/user/*"} element={<User />}></Route>
                          <Route path={"/main/*"} element={<Main />}></Route>
                          <Route path={"/404"} element={<NotFound />}></Route>



                  </Routes>
              </div>
                 <XP/>
          {/*<Provider store={store}>*/}
          {/*</Provider>*/}





      </>

  )
}

export default App
