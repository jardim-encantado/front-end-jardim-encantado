import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
    }
  }

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar estudante"
        value={search}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </form>
  );
}