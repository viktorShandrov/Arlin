
import styles from "./SearchBar.module.css"
import {Link} from "react-router-dom";
// @ts-ignore
export default function SearchBar({searchParams,searchParamsChangeHandler,filteredAutoCompletions}){
    return(
        <div className={styles.searchBarWrapper}>
            <div className={styles.searchBarC}>
                <input className={styles.searchBarInput} value={searchParams} onChange={searchParamsChangeHandler} placeholder={"Потърси книга"}  />
                <div className={styles.autoCompletionWrapper}>
                    <div className={styles.autoCompletionC}>
                        {filteredAutoCompletions.length>0&&filteredAutoCompletions.map((completion:any)=>{
                            return <div key={completion.bookId} className={styles.autoCompletion}>
                                <Link to={completion.bookId} className={styles.completion}>{completion.bookName}</Link>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}