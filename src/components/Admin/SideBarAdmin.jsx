import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box"; 
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DashBoardIcon from "@mui/icons-material/Dashboard";
import imgLogo from "../../assets/images/imgLogoJardim.png";
import imgArvore from "../../assets/images/imgArvore.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
          backgroundColor: "#10898B",
        },
      }}
    >
      <Box
        sx={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={imgLogo}
          alt="Logo"
          style={{ maxHeight: "60px", maxWidth: "100%", marginTop: "70px" }}
        />
      </Box>
      <List sx={{ marginTop: "40px" }}>
       <Link to="professor/estudante">
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}><PersonIcon /></ListItemIcon>
          <ListItemText primary="Teachers" sx={{ color: "white" }} />
        </ListItem>
        </Link>
        <Link to="/notas">
         <ListItem button>
          <ListItemIcon sx={{ color: "white" }}><DashBoardIcon/></ListItemIcon>
          <ListItemText primary="Students" sx={{ color: "white" }} />
        </ListItem>
        </Link>  
        <Link to="/notas">
         <ListItem button>
          <ListItemIcon sx={{ color: "white" }}><DashBoardIcon/></ListItemIcon>
          <ListItemText primary="Classes" sx={{ color: "white" }} />
        </ListItem>
        </Link>         
        <Link to="/notas">
         <ListItem button>
          <ListItemIcon sx={{ color: "white" }}><DashBoardIcon/></ListItemIcon>
          <ListItemText primary="Notes" sx={{ color: "white" }} />
        </ListItem>
        </Link>          
      </List>

    <Box
        sx={{
          height: 400,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center"
        }}
      >
        <img
          src={imgArvore}
          alt="ArvoreDecoracao"
          style={{ maxHeight: "230px", maxWidth: "100%" }}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;