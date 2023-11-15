import * as constants from "./contants";
import {toast} from "react-toastify";

export function request(url: string, method?: string, body?: any, headers: any = {}) {
    return {
        subscribe(res: any, error?: any) {
            if (!headers.hasOwnProperty("Content-Type")) {
                // headers["Content-Type"] = "application/json";
            }
            const promiseRequest = fetch(constants.REST_API + url, {
                headers: {
                    ...headers,
                    Authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null
                },
                body: headers["Content-Type"] = "application/json"?JSON.stringify(body):body,
                method
            });
            toast.promise(promiseRequest, {
                pending: 'Sending server request',
                // success: 'Successful server request 👌',
                error: 'Unsuccessful server request 🤯'
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
                    toast.error(err.message);
                    if (error) {
                        error(err); // Call the error function if provided
                    } else if (res) {
                        res(null); // Optionally call res with null if there is no error function
                    }
                });

        }
    };
}

export const functions:any = {

}