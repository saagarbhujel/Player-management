
import Modal from '../../components/Modal'

type ConformModalProps = { 
    className?: string,
    message: string,
    onConfirm: () => void,
    onReject: () => void, 
    isOpened: boolean
 }
const ConformModal = ({className, message, onConfirm, onReject, isOpened}: ConformModalProps) => {
  return (
    <Modal isOpened={isOpened} onCancel={onReject} className={className}>
        <div className='flex flex-col gap-7'>
            <span className='text-md'>{message}</span>
            <div className='flex justify-center gap-2'>

            <button type='button' className='py-2 px-4 rounded-md text-white  bg-blue-500' onClick={onConfirm}>Confirm</button>
            <button type='button' className='py-2 px-4 rounded-md text-white bg-orange-600' onClick={onReject}>Cancel</button>
            </div>
        </div>

    </Modal>
  )
}

export default ConformModal