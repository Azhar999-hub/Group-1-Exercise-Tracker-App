import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Avatar } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Swal from "sweetalert2";

import React, { useState, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import PageNotFound from "../config/Pagenotfound";

import CreateExercise from "./Createexercise";
import CreateUser from "./Createusers";
import EditExercise from "./Editexercise";
import ExerciseLogs from "./Exerciselogs";
import ExerciseWithCard from "./Exercisewithcard";

const drawerWidth = 200;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userData, setUserData] = useState("");
  const [showFullName, setShowFullName] = useState("");
  const navigation = useNavigate();

  const [menuList, setMenuList] = React.useState([
    {
      name: "Exercise Logs",
      route: "Exerciselogs",
      icon: <FitnessCenterIcon color="primary" />,
    },
    {
      name: "Create Exercises",
      route: "Createexercise",

      icon: <AddBoxIcon color="primary" />,
    },
    {
      name: "Create Users",
      route: "Createusers",
      icon: <PersonAddIcon color="primary" />,
    },
  ]);

  const logOut = () => {
    localStorage.clear();
    navigation("/");
  };

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        setUserData(data.data);

        if (data.data === "token expired") {
          Swal.fire({
            icon: "error",
            title: "First you have to login",
            text: "If you are not Register Please Signup",
          });
          localStorage.clear();
          navigation("/");
        }
      });
  }, []);

  const firstLetter = userData.name ? userData.name.charAt(0) : "";

  const fullName = () => {
    setShowFullName(!showFullName);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let moveScreen = (route) => {
    navigation(route);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map((x, index) => (
          <ListItem className="visit" key={index} disablePadding>
            <ListItemButton onClick={() => moveScreen(x.route)}>
              <ListItemIcon>{x.icon}</ListItemIcon>
              <ListItemText
                className="text-primary d-button"
                primary={x.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem className="text-danger link">
          <ListItemIcon onClick={logOut}>
            <LogoutIcon className="text-danger" />
          </ListItemIcon>
          <ListItemText onClick={logOut}>Sign Out</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex",
    backgroundImage: `url('https://png.pngtree.com/background/20211217/original/pngtree-background-simple-blue-with-dark-side-picture-image_1576339.jpg')`,
    backgroundSize: "cover",
    minHeight: "100vh", }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            srtyle={{ fontSize: "9vw" }}
            variant="h6"
            noWrap
            component="div">
            Exercise Tracker
          </Typography>
          <Typography className="ms-auto" variant="h6" noWrap component="div">
            <div>
              {showFullName ? (
                <div
                  className="f-Ava bg-success"
                  aria-label="userName"
                  onClick={fullName}>
                  {userData.name}
                </div>
              ) : (
                <Avatar
                  className="my-1"
                  sx={{ bgcolor: "green" }}
                  aria-label="userName"
                  onClick={fullName}>
                  {firstLetter}
                </Avatar>
              )}
            </div>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />

        <Routes>
          <Route path="/" element={<ExerciseWithCard />} />
          <Route path="/Exerciselogs" element={<ExerciseLogs />} />
          <Route path="/Exercisewithcard" element={<ExerciseWithCard />} />
          <Route path="/Createexercise" element={<CreateExercise />} />
          <Route path="/Createusers" element={<CreateUser />} />
          <Route path="/Editexercise/:id" element={<EditExercise />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
