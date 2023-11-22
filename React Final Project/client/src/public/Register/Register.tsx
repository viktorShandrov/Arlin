import {useContext, useState} from "react";
import styles from "./Register.module.css"
import {Link, useNavigate} from "react-router-dom";
import {request} from "../../functions";
import {userContext} from "../../App";

export default function  Register(){

    const {user,setUser}= useContext(userContext)
    const navigate =useNavigate()
    const [formValues,setFormValues] = useState({
        email:"",
        password:"",
        repeatedPassword:"",
    })
    const onFormChange=(e:any)=>{

        setFormValues(state=>{
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })
    }
    const onSubmit=()=>{
        request("users/register","POST",formValues).subscribe(
            (res)=>{
                // localStorage.setItem("user",JSON.stringify(res))
                if(res){
                    setUser(res)
                    navigate("/main")
                }
            },
            (error)=>{
                console.log(error)
            }
        )
    }

    return(
        <>
        <div className={styles.container}>
            <div className={styles.left}>
                <form className={styles.form} >
                <div className={styles.headingLeft}>
                    <h1>Create your account</h1>
                    <p >Unlock all Features!</p>
                </div>




                <div className={styles.inputC}>
                    <i className="fa-regular fa-envelope"></i>
                    <input
                        className={styles.input}
                        type="email"
                        required
                        // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={onFormChange}
                    />
                </div>

        <div className={styles.inputC}>
            <i className="fa-solid fa-key"></i>
            <input
                className={styles.input}
                type="password"
                required
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={onFormChange}
            />
        </div>
    <div className={styles.inputC}>
        <i className="fa-solid fa-key"></i>
        <input
            className={styles.input}
            type="password"
            required
            name="repeatedPassword"
            placeholder="Confirm Password"
            value={formValues.repeatedPassword}
            onChange={onFormChange}
        />
    </div>
    <button  className={styles.otherAuthBtn}>
        <img src="/public/google.png" alt="google" /> Google
        </button>

    <div className={styles.rememberMeC}>
        <input
            type="checkbox"
            name="rememberMe"
        />
        <div>Accept <span className={styles.accept}>terms and conditions</span></div>
    </div>

    <button className={styles.submitBtn} onClick={onSubmit}  type="button">REGISTER</button>
    <p>
        You have an account?
        <Link to={"/user/login"} className={styles.loginLink}>Sign in</Link>
    </p>
</form>
</div>
    <div className={styles.right}>
        <img src="/public/register.png" alt="register" />
        <div className={styles.headingRight}>Connect with any device.</div>
        <p>Everything you need is an internet connection.</p>
    </div>
</div>
        </>
    )


}