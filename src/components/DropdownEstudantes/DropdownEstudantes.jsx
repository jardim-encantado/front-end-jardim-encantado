import React, { useState } from "react";
import Select from "react-select";

export default function DropdownEstudantes({ options, onChangeSerie }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleChange = (option) => {
    setSelectedYear(option);

    if (onChangeSerie) {
      onChangeSerie(option?.value || null);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#10898B",
      border: "none",
      borderRadius: 4,
      boxShadow: "none",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#10898B" : "white",
      color: state.isFocused ? "white" : "black",
    }),
  };

  return (
    <div style={{ width: "130px", fontFamily: "Arial", fontSize: "18px" }}>
      <Select
        options={options}
        value={selectedYear}
        onChange={handleChange}
        placeholder="Série"
        styles={customStyles}
        isClearable
      />
    </div>
  );
}