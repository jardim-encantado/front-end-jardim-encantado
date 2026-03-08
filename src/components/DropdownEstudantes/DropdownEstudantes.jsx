import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "1 ano A", label: "1 ano A" },
  { value: "1 ano B", label: "1 ano B" },
  { value: "1 ano C", label: "1 ano C" },
  { value: "2 ano A", label: "2 ano A" },
  { value: "2 ano B", label: "2 ano B" },
  { value: "2 ano C", label: "2 ano C" },
  { value: "3 ano A", label: "3 ano A" },
  { value: "3 ano B", label: "3 ano B" },
  { value: "3 ano C", label: "3 ano C" },
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


    menu: (provided) => ({
      ...provided,
      borderRadius: 4,
      overflow: "hidden",
    }),

    menuList: (provided) => ({
      ...provided,
      maxHeight: 120,
      overflowY: "auto",
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