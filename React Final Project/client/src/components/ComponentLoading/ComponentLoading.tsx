
import styles from "./ComponentLoading.module.css"
import Spinner from "react-bootstrap/Spinner";
export default function ComponentLoading({isForReadMoreNews=false,bgColor="white"}){
    return(
        <div
            className={isForReadMoreNews?styles.forReadMoreNews:styles.componentLoading}
            style={{backgroundColor:bgColor}}
        >
            <Spinner />
        </div>

    )
}