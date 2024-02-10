
import styles from "./DashboardStat.module.css"
import {useEffect, useState} from "react";

export default function DashboardStat({name,testValue}:any){

    const [visualValue,setVisualValue] = useState(0)

    useEffect(() => {
        const animate = () => {
                // Update element properties or styles for animation
                const currentTime = Date.now();
                const duration = 3000; // Animation duration in milliseconds
                const startValue = 0; // Initial value
                const endValue = testValue; // Final value
                const easing = t => t * (2 - t); // Easing function (ease out)

                const elapsed = Math.min(currentTime - startTime, duration);
                const progress = easing(elapsed / duration);
                const value = startValue + (endValue - startValue) * progress;

                // Update the element's visual representation based on the value
                setVisualValue(Math.round(value)) ;
                if (currentTime - startTime < duration) {
                    requestAnimationFrame(animate);
                }

        };

        const startTime = Date.now();
        if(testValue){
            animate();
        }

    }, [testValue]);
    return(
        <article className={styles.testInfo}>
            <span className={styles.number}>{visualValue||0}</span>
            <p className={styles.testName}>{name}</p>
        </article>
    )
}