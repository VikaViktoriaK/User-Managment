import React from 'react';
import './Filter.css';

const Filter = ({ options, label, onChange, value }) => {
  return (
    <div className="filter-container">
      <p className="filter-label">{label}:</p>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
