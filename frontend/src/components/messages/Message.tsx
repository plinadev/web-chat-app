import { useAuthContext } from "../../context/AuthContext";
import useConversetion, { type MessageType } from "../../state/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversetion();
  const fromMe = message?.senderId === authUser?.id;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;

  const bubbleBg = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img} />
        </div>
      </div>
      <p
        className={`chat-bubble text-white ${bubbleBg}  ${shakeClass} text-sm md:text-md`}
      >
        {message.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
};
export default Message;
