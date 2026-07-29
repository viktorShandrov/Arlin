import * as constants from "./contants";
import {toast} from "react-toastify";

export function request(url: string, method: string = "GET", body?: any, customHeaders: any = {}, isFileUpload = false) {
    return {
        subscribe(res: any, error?: any) {
            const headers: Record<string, string> = { ...customHeaders };

            if (!headers["Content-Type"] && !isFileUpload) {
                headers["Content-Type"] = "application/json";
            }

            const token = localStorage.getItem("token");
            if (token && token !== "null") {
                headers["Authorization"] = token;
            }

            const abortController = new AbortController();
            const signal = abortController.signal;

            const promiseRequest = fetch(constants.REST_API + url, {
                headers,
                body: headers["Content-Type"] === "application/json" && body ? JSON.stringify(body) : body,
                method,
                signal,
                credentials: "include"
            });

            toast.promise(promiseRequest, {
                pending: 'Достъпване на сървъра',
            });

            promiseRequest
                .then(async (response) => {
                    if (!response.ok) {
                        let errorData: any = { message: 'Възникна грешка при заявката' };
                        try {
                            errorData = await response.json();
                        } catch (e) {}
                        console.error('Fetch Error:', errorData);
                        toast.error(errorData.message || 'Грешка при връзка със сървъра');
                        if (error) {
                            error(errorData);
                        }
                        return null;
                    } else {
                        const contentType = response.headers.get('Content-Type');
                        if (contentType && contentType.includes('application/json')) {
                            return await response.json();
                        } else {
                            if (res) res(null);
                            return null;
                        }
                    }
                })
                .then(data => {
                    if (data && res) {
                        res(data);
                    }
                })
                .catch((err: any) => {
                    console.error('Fetch Error:', err);
                    if (err.name !== "AbortError" && err.message !== "The user aborted a request.") {
                        toast.error(err.message || "Грешка при връзка със сървъра");
                    }
                    if (error) {
                        error(err);
                    } else if (res) {
                        res(null);
                    }
                });

            return abortController;
        }
    };
}

export function calculateLevel(exp: number) {
    if (!exp) return 0;
    let expRequiredForPreviousLevel = 0;
    let expRequiredForNextLevel = 100;
    let level = 0;

    while (!(exp >= expRequiredForPreviousLevel && exp <= expRequiredForNextLevel)) {
        level++;
        expRequiredForPreviousLevel = expRequiredForNextLevel;
        expRequiredForNextLevel *= 1.5;
    }

    return Number(level);
}

export const functions: any = {};