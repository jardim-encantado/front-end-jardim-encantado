import React from "react";
import Select from "react-select";

const defaultOptions = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

export default function DropdownBoletim({
  options = defaultOptions,
  selectedOption = null,
  onChange,
  placeholder = "Selecione",
}) {

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#e0eacb",  
      border: "none",
      borderRadius: 4,
      padding: "2px 8px",
      fontSize: "1em",
      boxShadow: "none",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#555", 
    }),
    indicatorSeparator: () => ({ display: "none" }), 
    menu: (provided) => ({
      ...provided,
      borderRadius: 4,
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#d4e3b5" : "#e0eacb", 
      color: "#000",
      cursor: "pointer",
    }),
  };

  return (
  <div style={{ width: "200px",  margin: 8, fontFamily: "Arial, sans-serif" }}>
      <Select
        options={options}
        value={selectedOption}
        onChange={onChange}
        placeholder={placeholder}
        styles={customStyles}
      />
    </div>
  );
}