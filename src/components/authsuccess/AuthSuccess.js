import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authsuccess/AuthContext";
import { jwtDecode } from "jwt-decode";
import UtilService from "../../util/UtilService";
import productService from "../../service/ProductService";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser, setLocation, syncCart } = useAuth();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        const decoded = jwtDecode(token);
        localStorage.setItem("jwt", token);
        setUser(decoded);
        UtilService.requestAndStoreUserLocation().then((saved) => {
          if (saved) setLocation(saved);
        });
        const cart = await productService.getUserCart(decoded.email);
        syncCart(cart);
      }

      navigate("/", { replace: true });
    };

    handleAuthSuccess();
  }, []);

  return <div></div>;
};

export default AuthSuccess;
