
import styles from "./AnswerC.module.css"
import { useState} from "react";
// @ts-ignore
export default function AnswerC({dragOverElRefs,text,setPairs,reference}){
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
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
            for (const dragOverElRef of dragOverElRefs) {
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
                    const questionText = dragOverElRef.current.parentElement.textContent
                    setPairs((old:any)=> {
                        return{
                            ...old,[questionText]:text
                        }

                    })
                    // @ts-ignore
                    reference.current.style.opacity=0
                    setIsDragging(false);
                }
            }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };











    const handleTouchStart = (event:any) => {
        const touch = event.touches[0];
        setIsDragging(true);
        const offsetX = touch.clientX - position.x;
        const offsetY = touch.clientY - position.y;
        setOffset({ x: offsetX, y: offsetY });
    };

    const handleTouchMove = (event:any) => {
        if (!isDragging) return;
        const touch = event.touches[0];
        setPosition({
            x: touch.clientX - offset.x,
            y: touch.clientY - offset.y
        });


            // @ts-ignore
            const rect = dragOverElRef.current.getBoundingClientRect();
            if (
                touch.clientX >= rect.left &&
                touch.clientX <= rect.right &&
                touch.clientY >= rect.top &&
                touch.clientY <= rect.bottom
            ) {
                // Perform your action here when the draggable element is over the specific element
                console.log('Draggable element is over the specific element');
                setPosition({x:0,y:0})

                const questionText = reference.current.parentElement.textContent
                setPairs((old:any)=> {
                    return{
                        ...old,[questionText]:text
                    }

                })
                // @ts-ignore
                reference.current.style.opacity=0
                setIsDragging(false);
            }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };
    return(
        <div
            style={{
                position: 'relative',
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                width: '100px',
                height: '100px',
                backgroundColor: 'lightblue',
                zIndex: 9999

            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={styles.answerC}
            ref={reference}
        >
            {text}
        </div>
    )
}