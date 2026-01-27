import React from "react";
import { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./SortComponentStyle.css";

const SortComponent = ({ options = [], onChange, defaultSort }) => {
  const [field, setField] = useState(defaultSort?.field ?? "");
  const [direction, setDirection] = useState(defaultSort?.direction ?? "ASC");

  useEffect(() => {
    if (!field) {
      onChange(null);
    } else {
      onChange({ field, direction });
    }
  }, [field, direction, onChange]);

  return (
    <div style={{width: "fit-content", display: "flex", alignItems: "center", gap: "8px"}}>
      <select className="sort-select" value={field} onChange={(e) => setField(e.target.value)}>
        <option value="">Sort by</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <button
        className="sort-icon-btn"
        onClick={() => setDirection((d) => (d === "ASC" ? "DESC" : "ASC"))}
      >
        {direction === "ASC" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </button>
    </div>
  );
};

export default SortComponent;
