import React from "react";
import { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./SortComponentStyle.css";

const SortComponent = ({ options = [], onChange, defaultSort }) => {
  const [field, setField] = useState(defaultSort?.field ?? options[0]?.value ?? "");
  const [direction, setDirection] = useState(defaultSort?.direction ?? "ASC");

  useEffect(() => {
    if (!field) {
      onChange(null);
    } else {
      onChange({ field, direction });
    }
  }, [field, direction, onChange]);

  useEffect(() => {
    if (!field && options.length > 0) {
      setField(options[0].value);
    }
  }, [field, options]);

  return (
    <div className="sort-wrap">
      <div className="sort-select-wrap">
        <select className="sort-select" value={field} onChange={(e) => setField(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        className="sort-icon-btn"
        onClick={() => setDirection((d) => (d === "ASC" ? "DESC" : "ASC"))}
        title={direction === "ASC" ? "Ascending" : "Descending"}
        aria-label="Toggle sort direction"
      >
        {direction === "ASC" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </button>
    </div>
  );
};

export default SortComponent;
