import { useState } from "react"

export default function Counter(){

    const [count,setCount] = useState(0)

    function incrementCount(){
        setCount(count+1)
    }
    function decrementCount(){
        setCount(count-1)
        
    }
    return(
        <>
            <button disabled={count==0} onClick={decrementCount} >-</button>
            <h1>Count: {count}</h1>
            <button onClick={incrementCount} >+</button>
            {count==0&&<p>Ivan</p>}
        </>
    )



}