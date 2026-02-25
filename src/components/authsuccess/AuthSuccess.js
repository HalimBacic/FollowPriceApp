import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../authsuccess/AuthContext";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      setUser(jwtDecode(token));
    }

    navigate("/", { replace: true });
  }, []);

  return <div></div>;
};

export default AuthSuccess;