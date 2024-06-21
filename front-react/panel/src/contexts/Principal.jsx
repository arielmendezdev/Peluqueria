import { createContext, useEffect } from "react";
import { useContext, useState } from "react";
import axios from "axios";
import appFirebase from "../structures/creadentials";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const storage = getStorage(appFirebase);

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext)
}

const url = "http://127.0.0.1:3000/api";

export default function StatePrincipalContext({ children }) {

  localStorage.getItem('company')

  const [company, setCompany] = useState();
  const [emailCompany, setEmailCompany] = useState();
  const [idCompany, setIdCompany] = useState();
  const [background, setBackground] = useState(false)
  const [user, setUser] = useState(null);
  const auth = getAuth(appFirebase);
  
  //  COMPAÑIA

  const fetchCompanyEmail = async () => {
    try {
        const response = await axios.get(`${url}/company/email/${emailCompany}`);
        setIdCompany(response.data.id)
        await fetchCompanyById(response.data.id)
    } catch (error) {
        console.log("No company found");
    }
  };

  const fetchCompanyById = async (companyId) => {
    try {
        const response = await axios.get(`${url}/company/${companyId}`);
        setCompany(response.data)
        localStorage.setItem("company", JSON.stringify(response.data));
    } catch (error) {
        console.log("No company found");
    }
  };

  const createCompany = async (data) => {
    try {
      delete data.password
      const response = await axios.post(`${url}/company/`, data);
      setCompany(response.data)
    } catch (error) {
      console.log("No company found");
    }
  };

  
  //  DIRECCIONES
  
  const createAddress = async (data) => {
    try {
      const response = await axios.post(`${url}/address`, data);
      fetchCompanyById(idCompany);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const editAddress = async (addressId, data) => {
    try {
      await axios.put(`${url}/address/${addressId}`, data);
      fetchCompanyEmail();
    } catch (error) {
      console.log(error)
    }
  }
  
  // LOCALES
  
  const createLocal = async (data) => {
    try {
      const response = await axios.post(`${url}/local/`, data);
      fetchCompanyEmail();
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  
  const editLocal = async (localId, data) => {
    try {
      await axios.put(`${url}/local/${localId}`, data);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLocal = async (localId) => {
    try {
      await axios.delete(`${url}/local/${localId}`);
      fetchCompanyEmail();
    } catch (error) {
      console.log(error);
    }
    fetchCompanyById(idCompany);
  };

  // EMPLEADOS

  const createEmployee = async (newEmployee) => {
    try {
      await axios.post(`${url}/employee`, newEmployee);
      fetchCompanyEmail();
    } catch (error) {
      console.log(error)
    }
  }
  
  const deleteEmployee = async (newEmployee) => {
    try {
      await axios.delete(`${url}/employee/${newEmployee}`);
      fetchCompanyEmail();
    } catch (error) {
      console.log(error)
    }
  }

  // SERVICIOS

  const saveService = async (service) => {
    try {
      await axios.post(`${url}/service`, service)
      fetchServices()
    } catch (error) {
      console.log(error)
    }
  }
  
  const editService = async (serviceId, service) => {
    try {
      await axios.put(`${url}/service/${serviceId}`, service)
      fetchServices()
    } catch (error) {
      console.log(error)
    }
  }

  // CARGA DE IMAGENES

  const uploadFile = async (file) => {
    const storageRef = ref(storage, v4());
    const response = await uploadBytes(storageRef, file)
    return response
  };

  // LOGIN

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase)
      setEmailCompany(userFirebase.email);
    } else {
      setUser(null);
    }
  });
  
  const logout = async () => {
    await signOut(auth)
    setBackground(false)
    localStorage.removeItem("company")
  }

  return (
    <>
      <AppContext.Provider
        value={{
          company,
          user,
          signInWithEmailAndPassword,
          createUserWithEmailAndPassword,
          auth,
          logout,
          background,
          fetchCompanyEmail,
          setBackground,
          createCompany,
          createLocal,
          editLocal,
          deleteLocal,
          createAddress,
          editAddress,
          createEmployee,
          deleteEmployee,
          saveService,
          uploadFile,
          editService,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}
