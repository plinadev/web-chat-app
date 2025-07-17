import { useEffect, useState } from "react";
import type { ConversationType } from "../state/useConversation";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("api/messages/conversations");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setConversations(data);
      } catch (err: any) {
        console.error(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
};

export default useGetConversations;
