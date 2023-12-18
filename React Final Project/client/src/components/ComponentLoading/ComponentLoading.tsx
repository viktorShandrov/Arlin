
import styles from "./ComponentLoading.module.css"
import Spinner from "react-bootstrap/Spinner";
export default function ComponentLoading(){
    return(
        <div className={styles.componentLoading}>
            <Spinner />
        </div>

    )
}