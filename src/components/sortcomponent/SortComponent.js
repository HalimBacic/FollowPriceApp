import React from "react";
import { useState, useEffect } from "react";

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

  return (    <div>
      <select value={field} onChange={e => setField(e.target.value)}>
        <option value="">Sort by</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <button onClick={() =>
        setDirection(d => (d === "ASC" ? "DESC" : "ASC"))
      }>
        {direction}
      </button>
    </div>)
};

export default SortComponent;
