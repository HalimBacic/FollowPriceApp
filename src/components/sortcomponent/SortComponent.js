import React, { useState, useEffect, useRef } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./SortComponentStyle.css";

const SortComponent = ({ options = [], onChange, defaultSort }) => {
  const [field, setField] = useState(defaultSort?.field ?? options[0]?.value ?? "");
  const [direction, setDirection] = useState(defaultSort?.direction ?? "ASC");
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === field)?.label ?? options[0]?.label ?? "Sort";

  const selectOption = (value) => {
    setField(value);
    setIsOpen(false);
  };

  return (
    <div className="sort-wrap" ref={wrapRef}>
      <div className="sort-select-wrap">
        <button
          type="button"
          className="sort-trigger"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span>{selectedLabel}</span>
          <span className="sort-chevron" aria-hidden="true">
            ▾
          </span>
        </button>

        {isOpen && (
          <div className="sort-menu" role="listbox">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === field}
                className={`sort-option${opt.value === field ? " active" : ""}`}
                onClick={() => selectOption(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
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
