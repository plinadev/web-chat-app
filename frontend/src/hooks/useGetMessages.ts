import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversetion from "../state/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversetion();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;
      setLoading(true);
      setMessages([]);
      try {
        const res = await fetch(`api/messages/${selectedConversation.id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (err: any) {
        console.error(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);
  return { loading, messages };
};

export default useGetMessages;
