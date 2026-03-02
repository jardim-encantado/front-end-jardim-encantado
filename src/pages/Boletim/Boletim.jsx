import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Sidebar/Sidebar";
import BoletimComponent from "../../components/BoletimComponent/BoletimComponent";
import DropdownBoletim from "../../components/DropdownBoletim/DropdownBoletim";
import styles from "./Boletim.module.css";

function Boletim() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box className={styles.mainContent}>
  <h1>Boletim</h1>
  <div style={{ marginBottom: "16px", width: "100%" }}>
    <DropdownBoletim />
  </div>
  <BoletimComponent />
</Box>
    </Box>
  );
}

export default Boletim;