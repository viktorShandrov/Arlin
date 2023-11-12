import * as constants from "./contants";
import {useNavigate} from "react-router-dom";

  export function request(url:string,method?:string,body?:any,headers:any={}){
        return {
            subscribe(res:any,error:any){
                if(!headers.hasOwnProperty("Content-Type")){
                    headers["Content-Type"] = "application/json"
                }
                fetch(constants.REST_API+url,{
                    headers:{
                        ...headers,
                        Authorization:JSON.parse(localStorage.getItem("user")).token
                    },
                    body:JSON.stringify(body),
                    method
                })
                    .then((response:any)=>{
                        if(!response.ok){
                            response.json().then((errorData: any) => {
                                error(errorData);
                            });
                        }else{
                            const contentType = response.headers.get('Content-Type');
                            if (contentType && contentType.includes('application/json')) {
                                return response.json()
                            }else{

                                res(null)
                                return null
                            }
                        }
                    })
                    .then((data:any)=>{
                        if (data !== null) { // Only execute when data is not null
                            res(data);
                        }
                    })
                    .catch((err: any) => {
                        console.error('Fetch Error:', err);
                        error(err);
                    });

            }
        }
}
export const functions:any = {

}