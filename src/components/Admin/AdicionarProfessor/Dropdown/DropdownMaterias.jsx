import React, { useState } from "react";
import Select from "react-select";

// Fazer uma lista para ver se já existe a matéria na lista porque se tiver não aparece essa opção no option
const options = [
  { value: "Artes", label: "Artes" },
  { value: "História", label: "História" },
  { value: "Geografia", label: "Geografia" },
  { value: "Matemática", label: "Matemática" },
];

export default function DropdownMaterias() {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleChange = (option) => {
    setSelectedYear(option);
    console.log("Ano selecionado:", option.value);
  };

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff",
    border: "none",
    borderRadius: 4,
    boxShadow: "none",
    cursor: "pointer",
    minHeight: "28px",
    height: "28px"
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: "32px",
    padding: "0 8px"
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    height: "32px"
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "4px",
    color: "#FFC2C1",
    width: "30px",
  }),

  indicatorSeparator: () => ({ display: "none" }),

  menu: (provided) => ({
    ...provided,
    borderRadius: 4,
  }),

  menuList: (provided) => ({
    ...provided,
    maxHeight: "100px",   // altura máxima
    overflowY: "auto"     // ativa scroll
  }),

  option: (provided) => ({
    ...provided,
    color: "#000",
    cursor: "pointer",
  }),
};

  return (
  <div style={{ width: "300px", fontFamily: "Arial, sans-serif", fontSize: "10px"}}>
      <Select
        options={options}
        value={selectedYear}
        onChange={handleChange}
        placeholder="Selecione a matéria"
        styles={customStyles}
      />
    </div>
  );
}