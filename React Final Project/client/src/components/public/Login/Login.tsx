import { useState} from "react";
import styles from "./Login.module.css"
import {Link, useNavigate} from "react-router-dom";
import {request} from "../../../functions";
// import {userContext} from "../../App";
import {setUser} from "../../../redux/user"
import {useDispatch} from "react-redux";
import googleImage from "../../../../public/google.png"
import registerImage from "../../../../public/register.png"
export default function  Login(){

    // const {user,setUser} = useContext(userContext)
    // const {user} = useSelector((state:any)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formValues,setFormValues] = useState({
        email:"viktor_shandrov@abv.bg",
        password:"111111111",
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
        request("users/login","POST",formValues).subscribe(
            (res:any)=>{
                if(res){
                    console.log("login",res)
                    dispatch(setUser(res))
                    localStorage.setItem("user",JSON.stringify(res))
                    navigate("/main/hero")
                    // navigate(-1)

                }
            }
        )
    }


    return(
        <>
        <div className={styles.container}>
            <div className={styles.left}>
                <form className={styles.form} >
                <div className={styles.headingLeft}>
                    <h1>Log in to your account</h1>
                    <p >Unlock all Features!</p>
                </div>
                 {/*   <div className={styles.otherAuth}>*/}
                 {/*       <button  className={styles.otherAuthBtn}>*/}
                 {/*        <img src="/public/google.png" alt="google" /> Google*/}
                 {/*       </button>*/}

                 {/* </div>*/}
                 {/*<hr />*/}
                    {/*<div className="centered-text">or log in with email</div>*/}


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

    <button  className={styles.otherAuthBtn}>
        <img src={googleImage} alt="google" /> Google
        </button>



    <button className={styles.submitBtn}  onClick={onSubmit} type="button">LOGIN</button>
    <p>
        Don't have an account?
        <Link to={"/user/register"} className={styles.loginLink}>Sign up</Link>
    </p>
</form>
</div>
    <div className={styles.right}>
        <img src={registerImage} alt="register" />
        <div className={styles.headingRight}>Connect with any device.</div>
        <p>Everything you need is an internet connection.</p>
    </div>
</div>
        </>
    )


}