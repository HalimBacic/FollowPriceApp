import React, { useState } from "react";
import style from "./Navigation.module.css";
import { Button, IconButton, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import service from "../../service/ProductService";
import SearchResult from "../searchelems/SearchResult";

const Navigation = () => {
  const navigate = useNavigate();

  // Logika za pretragu
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef();

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
    if (String(query).trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    // Manje od 5 slova → ne zovi API, ali overlay još ne prikazuj
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

  const fetchResults = async () => {
    setIsLoading(true);

    try {
      var pattern = /\\d+/;
      var response = "";
      if (pattern.test(query)) {
        response = await service.getPricesByBarcode(query);
      } else response = await service.getPricesByName(query);
      setResults(response);
    } catch (error) {
      console.error("Greška pri pozivu API-ja", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          fontSize: { xs: "14px", md: "18px" }, // manji font na mobilnom, veći na desktopu
          padding: { xs: "6px 12px", md: "10px 20px" },
          backgroundColor: "transparent",
          color: "#FFC145",
          fontFamily: "Figtree, sans-serif",
          fontWeight: "600",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "transparent", // skida hover pozadinu
            boxShadow: "none",
          },
        }}
      >
        Home
      </Button>

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
          <div className={style.searchResultWrapper}>
            <button
              className={style.searchResultClose}
              onClick={() => {
                setShowResults(false);
              }}
              aria-label="Close search results"
            >
              ✕
            </button>

            <SearchResult results={results} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
