import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "1 ano A", label: "1 ano A" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

export default function DropdownBoletim() {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleChange = (option) => {
    setSelectedYear(option);
    console.log("Ano selecionado:", option.value);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#e0eacb",  
      border: "none",
      borderRadius: 4,
      padding: "1px 1px",
      fontSize: "0.8em",
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
  <div style={{ width: "180px", fontFamily: "Arial, sans-serif" }}>
      <Select
        options={options}
        value={selectedYear}
        onChange={handleChange}
        placeholder="Selecione a série"
        styles={customStyles}
      />
    </div>
  );
}