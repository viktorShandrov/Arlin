
import styles from "./NoContentSection.module.css"
import {request} from "../../functions";
import {loadStripe} from "@stripe/stripe-js";
export default function NoContentSection({isWithBtns=false}){

    const subscribeBtnClickHandler = () =>{
        request("stripe/create-subscription-checkout-session",'POST').subscribe(
            async (res:any)=>{
                const stripe = await loadStripe('pk_test_51OEwwSAPrNaPFyVRyPTVcpxfNfy2RJiSVgl3frnwPgKe2tQZhlOVVz5PCvVN8nqoEyT2HwarufbQcoQzNy1giqkg00bLGKyRr4');
                stripe.redirectToCheckout({ sessionId: res.id })
            }
        )
    }
    return(
        <div className={styles.noContentInThisSectionWrapper}>
            <div className={styles.noContentInThisSectionC}>
                <h5>Няма съдържание за тази секция</h5>
                {isWithBtns&&<div className={styles.noContentBtns}>
                    <button onClick={subscribeBtnClickHandler}  className={`${styles.noContentBtn} ${styles.subscribeBtn}`}>абонирай се</button>
                    <button className={`${styles.noContentBtn} ${styles.buyBookBtn}`}>купи книга</button>
                </div>}
            </div>
        </div>
    )
}