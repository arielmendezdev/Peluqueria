import { Container } from "@mui/material";
import NavBar from "./components/navBars/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sucursales from "./pages/Sucursales";
import Turnos from "./pages/Turnos";
import Contacto from "./pages/Contacto";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import { useAppContext } from "./context/General";
import { useEffect } from "react";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "../../panel/src/components/ProtectedRoute";
import img from "./assets/images/fondo22.jpg";

const listDrawer = [
  {
    title: "Home",
    path: "/home",
    icon: <HomeIcon />,
  },
  {
    title: "Sucursales",
    path: "/sucursales",
    icon: <ApartmentIcon />,
  },
  {
    title: "Turnos",
    path: "/turnos",
    icon: <AccessAlarmIcon />,
  },
  {
    title: "Contacto",
    path: "/contacto",
    icon: <ContactMailIcon />,
  },
];

function App() {
  const { user } = useAppContext();

  return (
    <>
      {user && <NavBar listDrawer={listDrawer} />}
      <Container sx={{ mt: 10 }}>
        <Routes>
          <Route index path="/" element={user ? <Home /> : <Login />} />
          {/* <Route path="/login" element={user ? <Home /> : <Login />} /> */}
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route
            element={
              user ? <ProtectedRoute isAuthenticate={user} /> : <PageNotFound />
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
