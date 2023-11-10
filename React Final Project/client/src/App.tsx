

import './App.css'
import {Route, Routes} from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import Main from "./Main/Main";
function App() {


  return (
      <>
          <Routes>
              <Route path={"/admin/*"} element={<AdminPanel />}></Route>
              <Route path={"/main/*"} element={<Main />}></Route>
          </Routes>


      </>

  )
}

export default App
