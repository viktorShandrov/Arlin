
import styles from "./PlansCatalog.module.css"
import {request} from "../../functions";
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import Loading from "../Spinner/Loading";
export default function PlansCatalog(){
    const [plans,setPlans] = useState([])
    const [isLoading,setIsLoading] = useState(true)



    useEffect(()=>{
        getPlansInfo()
    },[])

    {/*//@ts-ignore*/}
    const subscribeBtnClickHandler = (stripeSubscriptionPriceId,subscriptionType) =>{
        setIsLoading(true)
        request("stripe/create-subscription-checkout-session",'POST',{stripeSubscriptionPriceId,subscriptionType}).subscribe(
            async (res:any)=>{
                const stripe = await loadStripe('pk_test_51OEwwSAPrNaPFyVRyPTVcpxfNfy2RJiSVgl3frnwPgKe2tQZhlOVVz5PCvVN8nqoEyT2HwarufbQcoQzNy1giqkg00bLGKyRr4');
                {/*//@ts-ignore*/}
                stripe.redirectToCheckout({ sessionId: res.id })
                setIsLoading(false)
            }
        )
    }
    const getPlansInfo = () =>{
        setIsLoading(true)
        request("users/getSubscriptionPlansInfo",'GET',).subscribe(
            (res:any)=>{
                setPlans(res.plans)
                setIsLoading(false)
            }
        )
    }
    const images =[
        "/public/rewardImages/freeBook.png",
        "/public/rewardImages/expMultiplier.png",
        "/public/rewardImages/chest.png",
    ]



    return(
        <>
            {isLoading&&<Loading/>}
            <div className={styles.plansWrapper}>
                <div className={styles.plansC}>
                    {plans.length>0&&plans.map((plan:any,index:number)=><article className={styles.planWrapper}>
                        <div className={styles.headingC}>
                            <div className={styles.imageC}>
                                <img src={images[index]} alt=""/>
                            </div>
                        </div>
                        <div className={styles.infoWrapper}>
                            <div className={styles.infoC}>
                                <h5 className={styles.planName}>{plan.name}</h5>
                                <section className={styles.secondaryInfo}>
                                    <h6 className={styles.whatYouGotHeading}>Всеки месец получавате: </h6>
                                    {plan.benefits.map((ben:string)=>
                                        <article className={styles.bulletPointC}>
                                            <div className={styles.dot}></div>
                                            <h6 className={styles.infoText}>{ben}</h6>
                                        </article>
                                    )}
                                </section>
                                <section className={styles.priceInfoAndBuyBtn}>
                                    <div className={styles.priceInfo}>
                                        <h6 className={styles.priceLabel}>Само за:</h6>
                                        <div className={styles.priceC}>
                                            <h4 className={styles.price}>{plan.price}лв.</h4>
                                            <h6 className={styles.perMonthLabel}>на месец</h6>
                                        </div>
                                    </div>
                                    <button onClick={()=>subscribeBtnClickHandler(plan.priceId,plan.type)} className={styles.buyBtn}>АБОНИРАЙ СЕ</button>
                                </section>
                            </div>
                        </div>
                    </article>)}
                </div>
            </div>
        </>
    )
}