
import styles from "./ComponentLoading.module.css"
import Spinner from "react-bootstrap/Spinner";
export default function ComponentLoading({isForReadMoreNews=false}){
    return(
        <div className={isForReadMoreNews?styles.forReadMoreNews:styles.componentLoading}>
            <Spinner />
        </div>

    )
}