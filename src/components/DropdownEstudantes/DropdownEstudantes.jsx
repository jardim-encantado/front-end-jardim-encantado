import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "1 ano A", label: "1 ano A" },
  { value: "1 ano B", label: "1 ano B" },
  { value: "1 ano C", label: "1 ano C" },
];

export default function DropdownEstudantes() {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleChange = (option) => {
    setSelectedYear(option);
    console.log("Ano selecionado:", option.value);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#DAE7C1",  
      border: "none",
      borderRadius: 4,
      boxShadow: "none",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#10898B", 
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
  <div style={{ width: "130px", fontFamily: "Arial, sans-serif", fontSize: "18px" }}>
      <Select
        options={options}
        value={selectedYear}
        onChange={handleChange}
        placeholder="Série"
        styles={customStyles}
      />
    </div>
  );
}