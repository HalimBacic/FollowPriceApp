import React, { useState } from "react";
import style from "./Navigation.module.css";
import { Button, IconButton, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import service from "../../service/ProductService";
import SearchResult from "../searchelems/SearchResult";

const Navigation = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Logika za pretragu
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Ako je input prazan → sve sakrij
    if (String(query).trim() === "") {
      setResults([]);
      setShowOverlay(false);
      return;
    }

    // Manje od 5 slova → ne zovi API, ali overlay još ne prikazuj
    if (query.length < 5) {
      setResults([]);
      setShowOverlay(false);
      return;
    }

    setShowOverlay(true);

    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchResults = async () => {
    setIsLoading(true);

    try {
      const pattern = "\\d+";
      var response = "";
      if (pattern.test(query)) {
        response = await service.getPricesByBarcode(query);
      } else response = await service.getPricesByName(query);
      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error("Greška pri pozivu API-ja", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.navigationContainer}>
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
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>

        <Input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            fontSize: { xs: "14px", md: "18px" },
            width: { xs: "120px", sm: "200px", md: "300px" },
            color: "#FFFFFF",
          }}
        />

        {showOverlay && (
          <SearchResult results={results} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default Navigation;
