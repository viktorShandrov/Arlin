

import styles from './App.module.css'
import {Route, Routes} from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import Main from "./Main/Main";
import Register from "./public/Register/Register";
import Login from "./public/Login/Login";
import {createContext, useEffect, useState} from "react";
import Test from "./Test/Test";
import UnknownWords from "./UnknownWords/UnknownWords";
import AllBooks from "./AllBooks/AllBooks";
import BookDetails from "./BookDetails/BookDetails";
    export const userContext=createContext({})
function App() {
        const [user,setUser]= useState({})
    useEffect(()=>{
        const userObject = localStorage.getItem("user")
        if(userObject){
            setUser(JSON.parse(userObject))
        }
    },[])

  return (
      <>
          <userContext.Provider value={{user,setUser}}>
              <div className={styles.mainWrapper}>
                  <Routes>
                      <Route path={"/admin/*"} element={<AdminPanel />}></Route>
                      <Route path={"/main/test/*"} element={<Test />}></Route>
                      <Route path={"/main/unknownWords"} element={<UnknownWords />}></Route>
                      <Route path={"/main/AllBooks/"} element={<AllBooks />}></Route>
                      <Route path={"/main/AllBooks/:id"} element={<BookDetails />}></Route>
                      <Route path={"/user/register"} element={<Register />}></Route>
                      <Route path={"/user/login"} element={<Login />}></Route>
                      <Route path={"/main/*"} element={<Main />}></Route>
                  </Routes>
              </div>
          </userContext.Provider>




      </>

  )
}

export default App
