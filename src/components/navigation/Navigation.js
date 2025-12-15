import React, { useState } from "react";
import style from "./Navigation.module.css";
import { Button, IconButton, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className={style.navigationContainer}>
      <Button
        onClick={() => {navigate('/')}}
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            fontSize: { xs: "14px", md: "18px" },
            width: { xs: "120px", sm: "200px", md: "300px" },
            color: "#FFFFFF",
          }}
        />
      </div>
    </div>
  );
};

export default Navigation;
