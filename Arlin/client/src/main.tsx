import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter} from "react-router-dom";
import {REST_API} from "./contants";
import StateProvider from "./redux/StateProvider/StateProvider";

async function getDataFromServer() {
    const token = localStorage.getItem("token");
    if (token && token !== "null") {
        try {
            const response = await fetch(`${REST_API}users/userInfo`, {
                headers: { Authorization: token }
            });
            if (response.ok) {
                const userData = await response.json();
                return { ...userData, token, userId: userData._id };
            } else {
                localStorage.removeItem("token");
            }
        } catch (e) {
            console.error("Initial load fetch error:", e);
        }
    }
    return null;
}

getDataFromServer()
    .then((user: any) => {
        ReactDOM.createRoot(document.getElementById('root')!).render(
            <HashRouter>
                <StateProvider initialState={user}>
                    <App />
                </StateProvider>
            </HashRouter>
        );
    });
