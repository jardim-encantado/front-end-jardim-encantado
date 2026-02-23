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
        <h1 className={styles.muralTitle}> Boletim</h1>
      <DropdownBoletim />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <BoletimComponent />
      </Box>
    </Box>
  );
}

export default Boletim;