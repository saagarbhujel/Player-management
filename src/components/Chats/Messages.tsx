import { Message } from "../../types"

type MessagesProps = {
    messages: Message[]
}

const Messages = ({messages}: MessagesProps) => {
  return (
    <div className="max-h-[85vh] overflow-y-auto">
        {
            messages.length ? (
                messages.map((message)=>(
                    <div key={message.id}
                    className="flex items-center mx-4 "
                    >
                        {/* profile-badge */}
                   <div className="w-12 h-12  rounded-full" >
                    <img src="/assets/icons/profile-placeholder.svg" alt="image" />
                   </div>

                   <div className="flex justify-between py-3 bg-gray-300 rounded-md mx-4 my-4 px-4 group relative max-w-xs md:max-w-md">
                       <p>{message.message}</p>
                   </div>
                    </div>
                ))
            ): null
        }
    </div>
  )
}

export default Messages