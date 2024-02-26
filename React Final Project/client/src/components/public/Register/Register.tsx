import {useRef, useState} from "react";
import styles from "./Register.module.css"
import {Link, useNavigate} from "react-router-dom";
import {request} from "../../../functions";
import {setUser} from "../../../redux/user";
import {useDispatch} from "react-redux";
import googleImage from "../../../../public/google.png"
import registerImage from "../../../../public/register.png"

export default function  Register(){

    // const {user,setUser}= useContext(userContext)
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const [formValues,setFormValues] = useState({
        username:"",
        email:"",
        image:"",
        password:"",
        repeatedPassword:"",
    })
    const [image,setImage] = useState(null)
    const imageUploadInput =useRef(null)
    const onFormChange=(e:any)=>{

        setFormValues(state=>{
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })
    }
    const onSubmit=()=>{
        formValues.image = image?image:""
        const formData = new FormData();
        for (const key in formValues) {
            formData.append(key, formValues[key]);
        }
        request("users/register","POST",formData,{},true).subscribe(
            (res:any)=>{
                // localStorage.setItem("user",JSON.stringify(res))
                if(res){
                    dispatch((dispatch, getState) => {
                        setTimeout(async()=>{
                            dispatch(setUser(res));
                        },0)
                    })
                    localStorage.setItem("token",res.token)
                    // navigate("/main")
                    setTimeout(async()=>{
                        navigate("/main/hero")
                    },100)
                }
            }
        )
    }

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setImage(imageFile)

    };

    // Function to trigger file input dialog
    const handleSelectImageClick = () => {
        imageUploadInput.current.click();
    };

    return(
        <>
        <div className={styles.container}>
            <div className={styles.left}>
                <form className={styles.form} >
                    <div className={styles.headingLeft}>
                        <h1>Влезте в своя профил</h1>
                        <p >Отключете всички възможности!</p>
                    </div>


                    <div className={styles.inputC}>
                        <i className="fa-solid fa-user"></i>
                        <input
                            className={styles.input}
                            type="text"
                            required
                            name="username"
                            placeholder="Потребителско име"
                            value={formValues.username}
                            onChange={onFormChange}
                        />
                    </div>

                <div className={styles.inputC}>
                    <i className="fa-regular fa-envelope"></i>
                    <input
                        className={styles.input}
                        type="email"
                        required
                        // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                        name="email"
                        placeholder="Имейл"
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
                placeholder="Парола"
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
                placeholder="Повторете паролата"
                value={formValues.repeatedPassword}
                onChange={onFormChange}
            />
        </div>

                        <button type={"button"} onClick={handleSelectImageClick} className={styles.uploadImageBtn}>

                            {!image&&<><i className="fa-solid fa-camera"></i>Избрери снимка</>}
                            {image&&<><i className="fa-solid fa-check"></i>Избрана успешно</>}

                        </button>
            <input
                className={`${styles.input} ${styles.imageInput}`}
                ref={imageUploadInput}
                type="file"
                name="image"
                placeholder="Снимка"
                onChange={handleImageChange}
            />
        {/*            <div className={styles.inputC}>*/}
        {/*</div>*/}

    {/*<button  className={styles.otherAuthBtn}>*/}
    {/*    <img src={googleImage} alt="google" /> Google*/}
    {/*    </button>*/}
                    {/*<LoginSocialFacebook*/}
                    {/*    appId={facebookAppId}*/}
                    {/*    onReject={()=>{*/}
                    {/*        console.log("rejected")*/}
                    {/*    }*/}
                    {/*    }*/}
                    {/*    onResolve={(e:any)=>{*/}
                    {/*        console.log(e)*/}
                    {/*    }}>*/}
                    {/*    <FacebookLoginButton />*/}
                    {/*</LoginSocialFacebook>*/}
                    {/*    <LoginSocialGoogle*/}
                    {/*        client_id={googleClientId}*/}
                    {/*        scope="https://www.googleapis.com/auth/"*/}
                    {/*        onReject={(e)=>{*/}
                    {/*            console.log(e)*/}
                    {/*           console.log("ree")*/}
                    {/*        }}*/}
                    {/*        onResolve={(e:any)=>{*/}
                    {/*            request("thirdPartyAuth/validate-google-user","POST",e.data).subscribe(*/}
                    {/*                (res)=>{*/}
                    {/*                    console.log(res)*/}
                    {/*                }*/}
                    {/*            )*/}
                    {/*            console.log(e)*/}
                    {/*        }}>*/}
                    {/*    <GoogleLoginButton />*/}
                    {/*</LoginSocialGoogle>*/}


    <div className={styles.rememberMeC}>
        <input
            type="checkbox"
            name="rememberMe"
        />
        <div>Приемам <span className={styles.accept}>условията за ползване</span></div>
    </div>

    <button className={styles.submitBtn} onClick={onSubmit}  type="button">Регистриране</button>
    <p>
        Имате съществуващ профил?
        <Link to={"/user/login"} className={styles.loginLink}>Влезте</Link>
    </p>
</form>
</div>
            <div className={styles.right}>
                <img src={registerImage} alt="register" />
                <div className={styles.headingRight}>Свързаност от всяко устройство.</div>
                <p>Нужна Ви е само интернет свързаност.</p>
            </div>
</div>
        </>
    )


}