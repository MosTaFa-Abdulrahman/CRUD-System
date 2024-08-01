import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../requestMethod";

function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await makeRequest.post("auth/logout");
      localStorage.removeItem("userInfo");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
}

export default useLogout;
