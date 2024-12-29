/* eslint-disable */
import { createContext, useEffect, useState } from "react";
import { login } from "../api/login";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
//   const toast = useToast();
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = async (formData) => {
    login(formData)
      .then((data) => {
        localStorage.setItem("authTokens", JSON.stringify(data));
        setUser({
            id: jwtDecode(data?.access).user_id,
        });  
        setAuthToken(data);
        navigate('/');
      })
      .catch((err) => {
        console.log("cant login user -> err", err);
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    setUser(null);
    setAuthToken(null);
  };

  const contextData = {
    user: user,
    token: authToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};