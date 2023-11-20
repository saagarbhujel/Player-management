import { useEffect, useRef } from "react"
import { cn } from "../utils"

type ModalProps = {
    children: React.ReactNode,
    isOpened: boolean,
    onCancel: () => void,
    className?: string
}
const Modal = ({children, isOpened, onCancel, className}: ModalProps) => {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(()=>{
        if(isOpened){
            ref.current?.showModal()
        }else{
            ref.current?.close()
        }
    },[isOpened])

    const isClickInsideModal = (e: React.MouseEvent, element: HTMLElement) => {
        const rect = element.getBoundingClientRect()
        return(
            e.clientX > rect.left &&
            e.clientX < rect.right &&
            e.clientY > rect.top &&
            e.clientY < rect.bottom
        )
    }
  return (
   <dialog
   ref={ref}
   onCancel={onCancel}
   className={cn('p-4 text-center rounded-lg shadow-lg w-72 bg-green-300/20', 
   className)}
   onClick={(e)=> {
    ref.current && !isClickInsideModal(e, ref.current) && onCancel()
   }}
   >
    {children}
   </dialog>
  )
}

export default Modal