

import styles from './App.module.css'
import {Route, Routes} from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import Main from "./Main/Main";
function App() {


  return (
      <>
          <div className={styles.mainWrapper}>
              <Routes>
                  <Route path={"/admin/*"} element={<AdminPanel />}></Route>
                  <Route path={"/main/*"} element={<Main />}></Route>
              </Routes>
          </div>



      </>

  )
}

export default App
