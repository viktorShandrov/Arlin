import * as constants from "./contants";
import {toast} from "react-toastify";
import { translationAPI} from "./contants";

export function request(url: string, method?: string, body?: any, headers: any = {},isFileUpload = false) {
    return {
        subscribe(res: any, error?: any) {
            if (!headers.hasOwnProperty("Content-Type")&&!isFileUpload) {
                headers["Content-Type"] = "application/json";
            }

            const abortController = new AbortController();
            const signal = abortController.signal;


            const promiseRequest = fetch(constants.REST_API + url, {
                headers: {
                    ...headers,
                    Authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).token : null
                },
                body: headers["Content-Type"] === "application/json"?JSON.stringify(body):body,
                method,
                signal,
                credentials: "include"
            });
            toast.promise(promiseRequest, {
                pending: 'Sending server request',
                // success: 'Successful server request 👌',
                // error: 'Unsuccessful server request 🤯'
            });
            promiseRequest
                .then((response: any) => {
                    if (!response.ok) {
                        response.json().then((errorData: any) => {
                            console.error('Fetch Error:', errorData);
                            toast.error(errorData.message);
                            if (error) {
                                error(errorData); // Call the error function if provided
                            }
                        });
                    } else {
                        const contentType = response.headers.get('Content-Type');
                        if (contentType && contentType.includes('application/json')) {
                            return response.json();
                        } else {
                            if (res) {
                                res(null);
                            }
                            return null;
                        }
                    }
                })
                .then(data=>{
                    res(data)
                })
                .catch((err: any) => {
                    console.error('Fetch Error:', err);
                    if(err.message!=="The user aborted a request."){
                        toast.error(err.message);
                    }
                    if (error) {
                        error(err); // Call the error function if provided
                    } else if (res) {
                        res(null); // Optionally call res with null if there is no error function
                    }
                });
            return abortController
        }
    };
}
export async function translateText(textToTranslate:string){
    try {




        const headers = new Headers({
            "Content-Type": "application/json",
        });



        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                q: textToTranslate,
                source: "en",
                target: "bg"
            }),
        };






        const response = await fetch(
            translationAPI,
            requestOptions
        )
        const data = await response.json()
        console.log(data)
        //@ts-ignore
        // return data.data.translations[0].translatedText;
    }catch (err){
        console.log(err)
    }



}

export const functions:any = {

}