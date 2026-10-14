import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authsuccess/AuthContext";
import { jwtDecode } from "jwt-decode";
import UtilService from "../../util/UtilService";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser, setLocation } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("Primljeni token:", token);
    if (token) {
      localStorage.setItem("jwt", token);
      setUser(jwtDecode(token));
      UtilService.requestAndStoreUserLocation().then((saved) => {
        if (saved) setLocation(saved);
      });
    }

    navigate("/", { replace: true });
  }, []);

  return <div></div>;
};

export default AuthSuccess;
