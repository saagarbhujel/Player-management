import  { FC, useState } from 'react';
import { cn } from '../utils';
import { useNavigate } from 'react-router-dom';

type AddRoomProps = {
  className?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  inputStyles?: string;
  buttonStyles?: string;
};

const AddRoom: FC<AddRoomProps> = ({
  className,
  inputPlaceholder ,
  buttonText ,
  inputStyles,
  buttonStyles,

}: AddRoomProps) => {

    const navigate = useNavigate();

    const [roomName, setRoomName] = useState('');

  return (
    <form className={cn(className)}
    onSubmit={(e) => {
        e.preventDefault();
        setRoomName((_)=> '');
        navigate(`/chats/room/${roomName}`)
    }}
    >
      <input
        type="text"
        className={inputStyles}
        placeholder={inputPlaceholder}
        value={roomName}
        name='roomName'
        onChange={(e) => setRoomName(e.target.value)}
        required
      />
      <button type='submit' className={buttonStyles}>
        {buttonText}
      </button>
    </form>
  );
};

export default AddRoom;
