
import styles from "./MachFourTest.module.css"
import {useEffect, useRef, useState} from "react";
export default function MachFourTest(){
    const dragOverElRef= useRef(null)





    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 200 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event:any) => {
        setIsDragging(true);
        const offsetX = event.clientX - position.x;
        const offsetY = event.clientY - position.y;
        setOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (event:any) => {
        if (!isDragging) return;
        setPosition({
            x: event.clientX - offset.x,
            y: event.clientY - offset.y
        });

        if (dragOverElRef.current) {
            // @ts-ignore
            const rect = dragOverElRef.current.getBoundingClientRect();
            if (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            ) {
                // Perform your action here when the draggable element is over the specific element
                console.log('Draggable element is over the specific element');
                setPosition({x:0,y:0})
                setIsDragging(false);
                // dragOverElRef.current.style.scale = 1
            }else{
                // dragOverElRef.current.style.scale = 1.2
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };








    useEffect(()=>{

    },[])


    return(
    <>
        <div className={styles.testWrapper}>
            <div className={styles.questionsWrapper}>
                <div className={styles.questionC}>
                    <h6>work</h6>
                    <div ref={dragOverElRef} className={styles.questionFreeSpace}>
                        <div
                            style={{
                                position: 'relative',
                                left: position.x,
                                top: position.y,
                                cursor: isDragging ? 'grabbing' : 'grab',
                                userSelect: 'none',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'lightblue',
                                zIndex: 9999

                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            className={styles.answerC}
                        >
                            работя1
                        </div>
                    </div>
                </div>
                <div className={styles.questionC}>
                    <h6>work</h6>
                    <div className={styles.questionFreeSpace}></div>
                </div>
                <div className={styles.questionC}>
                    <h6>work</h6>
                    <div className={styles.questionFreeSpace}></div>
                </div>
                <div className={styles.questionC}>
                    <h6>work</h6>
                    <div className={styles.questionFreeSpace}></div>
                </div>
            </div>
            <div className={styles.answersWrapper}>
                <div className={styles.answersC}>
                    {/*<div*/}
                    {/*    style={{*/}
                    {/*        position: 'relative',*/}
                    {/*        left: position.x,*/}
                    {/*        top: position.y,*/}
                    {/*        cursor: isDragging ? 'grabbing' : 'grab',*/}
                    {/*        userSelect: 'none',*/}
                    {/*        width: '100px',*/}
                    {/*        height: '100px',*/}
                    {/*        backgroundColor: 'lightblue',*/}
                    {/*        zIndex: 9999*/}

                    {/*    }}*/}
                    {/*    onMouseDown={handleMouseDown}*/}
                    {/*    onMouseMove={handleMouseMove}*/}
                    {/*    onMouseUp={handleMouseUp}*/}
                    {/*    className={styles.answerC}*/}
                    {/*>*/}
                    {/*    работя1*/}
                    {/*</div>*/}
                    <div className={styles.answerC}>
                        работя
                    </div>
                    <div className={styles.answerC}>
                        работя
                    </div>
                    <div className={styles.answerC}>
                        работя
                    </div>
                </div>

            </div>
        </div>
    </>
    )
}