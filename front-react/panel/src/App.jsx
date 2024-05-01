import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import SucursalPage from "./pages/SucursalPage";
import PanelPage from "./pages/PanelPage";
import PerfilPage from "./pages/PerfilPage";
import LoginPage from "./components/LoginPage";
import FooterComp from "./components/FooterComp";
import HeaderComp from "./components/HeaderComp";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { useAppContext } from "./contexts/Principal.jsx";
import "./assets/css/App.css";

function App() {

  const { user, background } = useAppContext();

  return (
    
      <NextUIProvider>
        <BrowserRouter>
          {user && (
            <>
              <NavbarComp />
              <HeaderComp />
            </>
          )}

          <div className={background ? "" : "background"}>
            <div className="mx-5 sm:ml-32 sm:mr-32">
              <Routes>
                <Route
                  index
                  element={user ? <SucursalPage /> : <LoginPage />}
                />
                <Route
                  path="/login"
                  element={user ? <SucursalPage /> : <LoginPage />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  element={
                    user ? (
                      <ProtectedRoute isAuthenticate={user} />
                    ) : (
                      <PageNotFound />
                    )
                  }
                >
                  <Route path="/sucursales" element={<SucursalPage />} />
                  <Route path="/perfil" element={<PerfilPage />} />
                </Route>
                <Route
                  path="/panel"
                  element={
                    user ? (
                      <ProtectedRoute isAuthenticate={user} redirectTo>
                        <PanelPage />
                      </ProtectedRoute>
                    ) : (
                      <PageNotFound />
                    )
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>

          {user && <FooterComp />}
        </BrowserRouter>
      </NextUIProvider>
    
  );
}

export default App;
