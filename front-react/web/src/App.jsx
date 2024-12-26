import { Container } from "@mui/material";
import NavBar from "./components/navBars/NavBar";
import { Route, Routes } from "react-router-dom";
import NuevoTurno from "./pages/NuevoTurno";
import Turnos from "./pages/Turnos";
import Historial from "./pages/Historial";
import HomeIcon from "@mui/icons-material/Home";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import { useAppContext } from "./context/General";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "../../panel/src/components/ProtectedRoute";
import Sucursal from "./pages/Sucursal";
import Empleado from "./pages/Empleado";

const listDrawer = [
  {
    title: "Nuevo Turno",
    path: "/turnos/sucursal",
    icon: <AccessAlarmIcon />,
  },
  // {
  //   title: "Empleado",
  //   path: "/turnos/empleado",
  //   icon: <AccessAlarmIcon />,
  // },
  {
    title: "Turnos",
    path: "/turnos",
    icon: <AccessAlarmIcon />,
  },
  {
    title: "Historial",
    path: "/historial",
    icon: <ContactMailIcon />,
  },
];

function App() {
  const { user } = useAppContext();

  return (
    <>
      {user && <NavBar listDrawer={listDrawer} />}
      <div>
        <Routes>
          <Route index path="/" element={user ? <NuevoTurno /> : <Login />} />
          {/* <Route path="/login" element={user ? <Home /> : <Login />} /> */}
          <Route
            path="/register"
            element={user ? <NuevoTurno /> : <Register />}
          />
          <Route
            element={
              user ? <ProtectedRoute isAuthenticate={user} /> : <PageNotFound />
            }
          >
            <Route path="/home" element={<NuevoTurno />} />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/turnos/sucursal" element={<Sucursal />} />
            <Route path="/turnos/empleado" element={<Empleado />} />
            <Route path="/historial" element={<Historial />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
