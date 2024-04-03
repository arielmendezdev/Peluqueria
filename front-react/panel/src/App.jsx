import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/App.css';
import NavbarComp from "./components/NavbarComp";
import HomePage from "./pages/HomePage";
import PanelPage from "./pages/PanelPage";
import SucursalesPage from "./pages/SucursalesPage";
import PerfilPage from "./pages/PerfilPage";
import LoginPage from "./pages/LoginPage";
import FooterComp from "./components/FooterComp";
import HeaderComp from "./components/HeaderComp";

function App() {
  
  return (
    <NextUIProvider>
      <BrowserRouter>
        <NavbarComp />
        <HeaderComp />

        <div className="mt-4 mx-5 sm:ml-32 sm:mr-32">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/sucursales" element={<SucursalesPage />} />
          </Routes>
        </div>

        <FooterComp />
          
      </BrowserRouter>
    </NextUIProvider>
  )
}

export default App
