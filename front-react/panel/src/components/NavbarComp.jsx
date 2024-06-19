import {
  AppBar,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  Divider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Link from "./specials/Link";
import logo from "../assets/images/tijera_peine.png";
import { useAppContext } from "../contexts/Principal";
import "../assets/css/NavBar.css"
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function NavbarComp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingOpen, setSettingOpen] = useState(false);

  const { logout } = useAppContext();

  const handleOpenSetting = (event) => {
    setAnchorEl(event.currentTarget);
    setSettingOpen(true);
  };
  const handleCloseSetting = () => {
    setSettingOpen(false);
    setAnchorEl(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const listLinks = [
    {
      to: "/sucursales",
      name: "Sucursales",
    },
    {
      to: "/employee",
      name: "Empleados",
    },
    {
      to: "/services",
      name: "Servicios",
    },
  ]

  const profile = [
    {
      to: "/perfil",
      name: "Perfil",
      icon: <PersonAdd fontSize="small" />,
    },
    {
      to: "#",
      name: "Seting",
      icon: <Settings fontSize="small" />,
    },
    {
      to: "/",
      name: "Salir",
      icon: <Logout fontSize="small" />,
      action: logout,
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#292929" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <IconButton
                sx={{ display: { md: "none" } }}
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { md: "flex", xs: "none" } }}>
                <img src={logo} alt="" width={100} />
              </Box>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex", gap: 25 } }}>
              {listLinks.map((link) => (
                <Link to={link.to} key={link.name}>
                  {link.name}
                </Link>
              ))}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <img src={logo} alt="" width={100} />
            </Box>

            <Box>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenSetting}
                  sx={{ p: 0, color: "white" }}
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ }}
                anchorEl={anchorEl}
                id="account-menu"
                open={settingOpen}
                onClose={handleCloseSetting}
                onClick={handleCloseSetting}
              >
                {profile.map((link) => (
                  <ListItemButton key={link.name} onClick={link.action}>
                    <IconButton>{link.icon}</IconButton>
                    <Link to={link.to}>{link.name}</Link>
                  </ListItemButton>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box>
              <img src={logo} alt="" width={100} className="mx-auto my-4" />
            </Box>
            <Divider />
            <List>
              {listLinks.map((link) => (
                <ListItem key={link.name} disablePadding>
                  <ListItemButton>
                    <Link className="menu-link" to={link.to}>
                      {link.name}
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
