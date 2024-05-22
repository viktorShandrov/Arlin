import {useContext, useEffect, useRef, useState} from "react";
import styles from "./Register.module.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {request} from "../../../functions";
// import {setUser} from "../../../redux/user";
// import {useDispatch} from "react-redux";
import registerImage from "../../../../public/register.png"
import {userContext} from "../../../redux/StateProvider/StateProvider";
import useForm from "../../../hooks/useForm";

export default function  LoginAndRegister(){

    // const {user,setUser}= useContext(userContext)
    const {portal} = useParams()
    // @ts-ignore
    const { userState,setUserState } = useContext(userContext);
    const navigate =useNavigate()
    // const dispatch = useDispatch()
    const [formValues,onFormChange,resetForm] = useForm({
        firstName:"",
        lastName:"",
        email:"",
        image:"",
        password:"",
        repeatedPassword:"",
    })

    const [image,setImage] = useState(null)
    const [isLogin,setIsLogin] = useState(null)
    const imageUploadInput =useRef(null)

    useEffect(()=>{
        if(portal=="login"){
            {/*// @ts-ignore*/}
            setIsLogin(true)
        } else{
            {/*// @ts-ignore*/}
            setIsLogin(false)
        }
    },[portal])

    const onSubmit=()=>{
        formValues.image = image?image:""
        const formData = new FormData();
        for (const key in formValues) {
            formData.append(key, formValues[key]);
        }
        request(`users/${isLogin?"login":"register"}`,"POST",isLogin?formValues:formData,{},!isLogin).subscribe(
            (res:any)=>{
                if(res){
                    setUserState(res)
                    localStorage.setItem("token",res.token)
                    setTimeout(async()=>{
                        resetForm()
                        navigate("/main/hero")
                    },100)
                }
            }
        )
    }

    const handleImageChange = (event:any) => {
        const imageFile = event.target.files[0];
        setImage(imageFile)

    };

    // Function to trigger file input dialog
    const handleSelectImageClick = () => {
        {/*//@ts-ignore*/}
        imageUploadInput.current.click();
    };

    return(
        <>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.formWrapper}>
                    <form className={styles.form} >
                        <div className={styles.headingLeft}>
                            <h5>Създайте в своя профил</h5>
                            {/*<p >Отключете всички възможности!</p>*/}
                        </div>
                        {!isLogin&&
                            <>
                                <div className={styles.inputC}>
                                    <i className="fa-solid fa-user"></i>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        required
                                        name="firstName"
                                        placeholder="Собствено име"
                                        value={formValues.firstName}
                                        onChange={onFormChange}
                                    />
                                </div>
                                <div className={styles.inputC}>
                                    <i className="fa-solid fa-user"></i>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        required
                                        name="lastName"
                                        placeholder="Фамилно име"
                                        value={formValues.lastName}
                                        onChange={onFormChange}
                                    />
                                </div>
                            </>
                        }


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
                        {!isLogin&&
                            <>
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

                                    {!image&&<><i className="fa-solid fa-camera"></i>Качи снимка</>}
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
                            </>

                        }



                        {/*TODO to be visible and active*/}
                        {/*<div className={styles.rememberMeC}>*/}
                        {/*    <input*/}
                        {/*        type="checkbox"*/}
                        {/*        name="rememberMe"*/}
                        {/*    />*/}
                        {/*    <div>Приемам <span className={styles.accept}>условията за ползване</span></div>*/}
                        {/*</div>*/}



                        {!isLogin&&
                            <>
                                <button className={styles.submitBtn} onClick={onSubmit}  type="button">Регистриране</button>
                                <p>
                                    Имате съществуващ профил?
                                    <Link to={"/user/login"} className={styles.loginLink}>Влезте</Link>
                                </p>
                            </>

                        }
                        {isLogin&&
                            <>
                                <button className={styles.submitBtn}  onClick={onSubmit} type="button">Влез</button>
                                <p>
                                    Нямаш профил?
                                    <Link to={"/user/register"} className={styles.loginLink}>Регистрирай се</Link>
                                </p>
                            </>

                        }

                    </form>
                </div>


            </div>
            <div className={styles.right}>
                <img src={registerImage} alt="register" />
            </div>
</div>
        </>
    )


}