
import styles from "./Loading.module.css"
import Spinner from "react-bootstrap/Spinner";

export default function Loading(){
    // @ts-ignore
    return(
        <div className={styles.spinner}>
    {/*// @ts-ignore*/}
            <Spinner>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>


    )
}