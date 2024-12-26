import { createContext, useEffect } from "react";
import { useContext, useState } from "react";
import appFirebase from "../structures/creadentials";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from 'axios'
import Empleado from "../pages/Empleado";

const AppContext = createContext();

const url = "http://127.0.0.1:3000/api"

export function useAppContext() {
  return useContext(AppContext);
}

export default function StateGeneralContext({ children }) {
  
  const [background, setBackground] = useState(false);
  const [user, setUser] = useState();
  const [employees, setEmployees] = useState();
  const [sucursals, setSucursals] = useState();
  const [sucursalSelected, setSucursalSelected] = useState();
  const [client, setClient] = useState(
    localStorage.setItem("user", JSON.stringify(user))
  );
  const auth = getAuth(appFirebase);

  // CLIENTES
  
  const createClient = async (dataClient) => {
    try {
      await axios.post(`${url}/client/`, dataClient);
    } catch (error) {
      console.log(error)
    }
  }

  // EMPLEADOS

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${url}/employee`)
      
    } catch (error) {
        console.log(error)
    }
  }

  // SUCURSALES

  const fetchSucursals = async () => {
    try {
      const response = await axios.get(`${url}/local`)
      setSucursals(response.data)
    } catch (error) {
        console.log(error)
    }
  }

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
      setClient(userFirebase.email)
    } else {
      setUser(null);
    }
  });

  const logout = async () => {
    try {
        await signOut(auth);
        setBackground(false);
        setClient(localStorage.removeItem("user"));
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          signInWithEmailAndPassword,
          createUserWithEmailAndPassword,
          auth,
          logout,
          user,
          client,
          createClient,
          sucursals,
          fetchSucursals,
          sucursalSelected,
          setSucursalSelected,
          employees,
          fetchEmployees,
          setEmployees
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}
