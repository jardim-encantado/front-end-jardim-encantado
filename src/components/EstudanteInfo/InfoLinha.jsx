import { useState, useEffect } from "react";

export default function InfoRow({ label, value = "", disabled, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div style={{
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      width: "100%"
    }}>
      <label style={{ 
        width: "120px", 
        fontSize: "14px", 
        fontWeight: "bold",
        color: "#555"
      }}>
        {label}
      </label>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        style={{
          flex: 1, 
          maxWidth: "350px",
          padding: "8px",
          borderRadius: "6px",
          border: disabled ? "1px solid transparent" : "1px solid #e29c9c",
          background: disabled ? "rgba(255,255,255,0.3)" : "white",
          color: "black",
          outline: "none",
          transition: "all 0.3s"
        }}
      />
    </div>
  );
}