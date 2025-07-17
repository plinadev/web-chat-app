import { useState } from "react";
import toast from "react-hot-toast";
import useConversetion from "../state/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversetion();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const res = await fetch(`api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
