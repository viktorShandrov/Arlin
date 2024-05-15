
import styles from "./CreateWordContainer.module.css"
import useForm from "../../hooks/useForm";
import {toast} from "react-toastify";
import {request} from "../../functions";
import Popup from "../Popup/Popup";
{/*//@ts-ignore*/}
export default function CreateWordContainer({setIsCreateGroupPopUpVisible,setUserWordContainers}){

    const [createWordContainerForm,onChange,resetForm] = useForm({containerName:"",colorCode:"#de2bff"})

    const hidePopup = () =>{
        setIsCreateGroupPopUpVisible(false)
        resetForm()
    }
    const cancelWordContainerClickHandler = () =>{
        hidePopup()
    }
    const createWordContainerClickHandler = () =>{

        request("unknownWords/createWordContainer","POST",{colorCode:createWordContainerForm.colorCode,name:createWordContainerForm.containerName}).subscribe(
            ()=>{
                toast.success("Успешно създадена група")
                if(setUserWordContainers){
                    setUserWordContainers((old:any)=>{
                        return [
                                ...old,
                                {
                                    colorCode:createWordContainerForm.colorCode,
                                    name:createWordContainerForm.containerName,
                                    words:[],
                                }
                            ]
                    })
                }
                hidePopup()
            }
        )
    }

    return(
        <Popup isWithDisplayNone={!setIsCreateGroupPopUpVisible} hidePopup={hidePopup} styleSelector={styles.popupWrapper}>
            <div className={styles.createWordGroupWrapper}>
                <div className={styles.createWordGroupC}>
                    <h5>създаване на нова група за думи</h5>
                    <div className={styles.colorPickAndNameInput}>
                        <div className={styles.colorPicker}>
                            <input value={createWordContainerForm.colorCode} onChange={onChange} name={"colorCode"} type="color"/>
                        </div>
                        <input value={createWordContainerForm.containerName} onChange={onChange} name={"containerName"} className={styles.nameInput} type="text" placeholder={"Име на нова група"}/>

                    </div>
                    <div className={styles.createBtns}>
                        <button disabled={!createWordContainerForm.containerName} onClick={createWordContainerClickHandler} className={styles.createBtn}>създай</button>
                        <button onClick={cancelWordContainerClickHandler} className={styles.cancelBtn}>отказ</button>
                    </div>

                </div>

            </div>
        </Popup>
    )
}