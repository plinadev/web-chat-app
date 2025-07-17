import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

type LoginInputs = {
  username: string;
  password: string;
};
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (inputs: LoginInputs) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAuthUser(data);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;
