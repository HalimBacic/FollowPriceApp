import React, { useState } from "react";
import { useAuth } from "../authsuccess/AuthContext";
import style from "./Navigation.module.css";
import { Button, IconButton, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import service from "../../service/ProductService";
import SearchResult from "../searchelems/SearchResult";
import { FcGoogle } from "react-icons/fc";
import { BsCart3 } from "react-icons/bs";
import { Badge } from "@mui/material";

const Navigation = () => {
  const { user, logout, hasCartItems } = useAuth()
  const navigate = useNavigate();

  // Logika za pretragu
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef();

  const [cart, setCart] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const status = await service.isProductInUserCart(user.email);
        setCart(status ? 1 : 0);
      }
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);

      var response = "";
      try {
        response = await service.getPricesBySearch(query);
        setResults(response);
      } catch (error) {
        console.error("Greška pri pozivu API-ja", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (String(query).trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    if (query.length < 5) {
      setResults([]);
      return;
    }
    setShowResults(true);

    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const gotoresults = () => {
    navigate("/search/" + query);
  };

  return (
    <div
      ref={searchRef}
      className={`${style.searchContainerInput} ${style.navigationContainer}`}
    >
      <Button
        onClick={() => {
          navigate("/");
        }}
        sx={{
          fontSize: { xs: "14px", md: "18px" },
          padding: { xs: "6px 12px", md: "10px 20px" },
          backgroundColor: "transparent",
          color: "#FFC145",
          fontFamily: "Figtree, sans-serif",
          fontWeight: "600",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        Home
      </Button>

      <div className={style.rightside}>
        <div className={style.searchContainer}>
          <IconButton
            sx={{
              color: "#FFC145",
              fontSize: { xs: "20px", md: "28px" },
            }}
            onClick={gotoresults}
          >
            <SearchIcon fontSize="inherit" />
          </IconButton>

          <div>
            <Input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (query.length >= 5) {
                  setShowResults(true);
                }
              }}
              sx={{
                fontSize: { xs: "14px", md: "18px" },
                width: { xs: "120px", sm: "200px", md: "300px" },
                color: "#FFFFFF",
              }}
            />
          </div>

          {showResults && (
            <SearchResult results={results} isLoading={isLoading} />
          )}
        </div>
        {!user && (
          <Button
            onClick={() => {
              window.location.href = "http://localhost:8001/login"; // ← direktno na Python backend
            }}
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              padding: { xs: "6px 12px", md: "10px 20px" },
              backgroundColor: "transparent",
              color: "#FFC145",
              fontFamily: "Figtree, sans-serif",
              fontWeight: "600",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            Signin&nbsp;
            <FcGoogle size={20} />
          </Button>
        )}
        {user && (
          <Button
            onClick={() => navigate("/favorites", { state: { user } })}
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              padding: { xs: "6px 12px", md: "10px 20px" },
              backgroundColor: "transparent",
              color: "#FFC145",
              fontFamily: "Figtree, sans-serif",
              fontWeight: "600",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <Badge
              variant="dot"
              color="error"
              invisible={!cart && !hasCartItems}
            >
              <BsCart3 size={20} />
            </Badge>
          </Button>
        )}
        {user && (
          <Button
            onClick={() => {
              logout();
              navigate("/");
            }}
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              padding: { xs: "6px 12px", md: "10px 20px" },
              backgroundColor: "transparent",
              color: "#FFC145",
              fontFamily: "Figtree, sans-serif",
              fontWeight: "600",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
