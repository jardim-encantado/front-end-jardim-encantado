import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  }

  return (
  <div className={styles.searchContainer}>
    <FiSearch className={styles.icon} />
    <input
      type="text"
      placeholder="Pesquisar estudante..."
      value={search}
      onChange={handleChange}
      className={styles.input}
    />
  </div>
);
}