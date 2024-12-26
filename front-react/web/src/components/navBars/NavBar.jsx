import NavListDrawer from "./NavListDrawer";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAppContext } from "../../context/General";
import Home from "@mui/icons-material/Home";

export default function NavBar({ listDrawer }) {
  const { logout } = useAppContext();

  const [open, setOpen] = useState(false);

  const client = {
    name: "Ariel",
  };

  return (
    <>
      <AppBar position="fixed" sx={{background: "#202020"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/">Hola {client.name}</Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {listDrawer.map((item) => (
              <Button
                component={Link}
                to={item.path}
                color="inherit"
                key={item.title}
              >
                {item.title}
              </Button>
            ))}
          </Box>
          <Tooltip title="Salir">
            <Link onClick={logout} color="error" to="/">
              <ExitToAppIcon />
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClick={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer
          client={client}
          listDrawer={listDrawer}
          setOpen={setOpen}
        />
      </Drawer>
    </>
  );
}
