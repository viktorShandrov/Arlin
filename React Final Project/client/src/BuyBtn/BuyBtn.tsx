import styles from "../BookDetails/BookDetails.module.css";
import {request} from "../functions";
import {useStripe} from "@stripe/react-stripe-js";

export default function  BuyBtn(){
    const stripe = useStripe();

    const onBuyClickHandler = ()=>{
        request("stripe/create-checkout-session","POST",{}).subscribe(
            async(res)=>{
                const { error } = await stripe!.redirectToCheckout({
                    sessionId: res.id,
                });

                if (error) {
                    console.error(error);
                }
            }
        )
    }
    return(
        <button onClick={onBuyClickHandler} className={styles.buyBtn}>Buy</button>
    )
}