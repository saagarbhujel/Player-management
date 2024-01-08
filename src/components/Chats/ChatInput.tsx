import { useEffect, useRef, useState } from "react";

type ChatInputProps = {
  onSubmit: ( receiver: string,message: string) => void;
  receiver: string;
};

const ChatInput = ({ onSubmit, receiver }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaHeight = () => {
    const textarea = textareaRef.current;
    if(!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  useEffect(() => {
    handleTextAreaHeight();
  }, [message]);

  return (
    <form  
    onSubmit={(e) => {
        e.preventDefault();
        onSubmit( receiver,message);
        setMessage('')
    }}
    className=" flex items-center justify-center">
      <textarea
      ref={textareaRef}
      className="w-[90%] mx-1 my-2 p-2 mt-1 pe-10 rounded-md bg-transparent ring-1 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none  max-h-28 border "
        name="message"
        placeholder="Type your message here..."
        id="message"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
            if(!('ontouchstart' in document) && e.key === "Enter" && !e.shiftKey){
                e.preventDefault()
                onSubmit( receiver,message)
                setMessage('')
            }
        }}
        required
      />
      <button  className={`text-xl  rounded-md  text-white py-[10px] px-4 mb-1 cursor-pointer ${!message ? "bg-gray-500" :"bg-blue-500" }`} type="submit" disabled={!message} >Send</button>
    </form>
  );
};

export default ChatInput;
