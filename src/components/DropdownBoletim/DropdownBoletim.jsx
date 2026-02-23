import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

export default function DropdownBoletim() {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleChange = (option) => {
    setSelectedYear(option);
    console.log("Ano selecionado:", option.value);
  };

  // estilos customizados
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#e0eacb",  // verde claro
      border: "none",
      borderRadius: 4,
      padding: "2px 8px",
      fontSize: "1em",
      boxShadow: "none",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#555", // cor da seta
    }),
    indicatorSeparator: () => ({ display: "none" }), // remove a linha da seta
    menu: (provided) => ({
      ...provided,
      borderRadius: 4,
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#d4e3b5" : "#e0eacb", // hover
      color: "#000",
      cursor: "pointer",
    }),
  };

  return (
    <div style={{ width: 200, margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <label style={{ fontWeight: "bold", marginBottom: 8, display: "block" }}>
        Boletim
      </label>
      <Select
        options={options}
        value={selectedYear}
        onChange={handleChange}
        placeholder="Selecione o ano"
        styles={customStyles}
      />
      {selectedYear && <p style={{ marginTop: 8 }}>Ano escolhido: {selectedYear.label}</p>}
    </div>
  );
}