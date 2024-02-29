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








    ReactDOM.createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <HashRouter >
                <StateProvider>
                    <App />
                </StateProvider>
            </HashRouter>
        </StrictMode>


    )
// getDataFromServer().then((initialData) => {
//     store.dispatch(setInitialData(initialData));
// })


