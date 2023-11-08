import * as constants from "./contants";


  export function request(url:string,method?:string,body?:any,headers:any={}){
        return {
            subscribe(res:any,error:any){
                if(!headers.hasOwnProperty("Content-Type")){
                    headers["Content-Type"] = "application/json"
                }
                fetch(constants.REST_API+url,{
                    headers:{
                        ...headers,
                        Authorization:localStorage.getItem("token")!
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
                            const contentType = response.headers.get('content-type');
                            if (contentType && contentType.includes('application/json')) {
                                return response.json()
                            }else{
                                res(null)
                            }
                        }
                    })
                    .then((data:any)=>{
                        res(data)
                    })

            }
        }
}
export const functions:any = {

}