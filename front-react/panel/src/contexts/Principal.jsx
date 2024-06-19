import { createContext } from "react";
import { useContext, useState } from "react";
import axios from "axios";
import appFirebase from "../creadentials";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext)
}

const url = "http://127.0.0.1:3000/api";

export default function StatePrincipalContext({ children }) {
  const [company, setCompany] = useState();
  const [locals, setLocals] = useState([]);
  const [idCompany, setIdCompany] = useState();
  const [background, setBackground] = useState(false)
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState()
  const [emailCompany, setEmailCompany] = useState(localStorage.setItem("user", JSON.stringify(user)));
  const auth = getAuth(appFirebase);

  const fetchCompanyEmail = async (email) => {
    try {
        const response = await axios.get(`${url}/company/email/${email}`);
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

  const fetchLocalsByCompany = async () => {
    try {
      const response = await axios.get(`${url}/local`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createLocal = async (data) => {
    try {
      const response = await axios.post(`${url}/local/`, data);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const createAddress = async (data) => {
    try {
      const response = await axios.post(`${url}/address`, data);
      fetchCompanyById(idCompany);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const editLocal = async (localId) => {
    try {
      console.log(localId)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLocal = async (localId) => {
    try {
      await axios.delete(`${url}/local/${localId}`);
    } catch (error) {
      console.log(error);
    }
    fetchCompanyById(idCompany);
  };

  const fetchEmployees = async () => {
    try {
        const response = await axios.get(`${url}/employee`)
        setEmployees(response.data)
    } catch (error) {
        console.log(error)
    }
  }
  
  const createEmployee = async (newEmployee) => {
    try {
      await axios.post(`${url}/employee`, newEmployee);
      fetchEmployees();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEmployee = async (newEmployee) => {
    try {
      await axios.delete(`${url}/employee/${newEmployee}`);
      fetchEmployees()
    } catch (error) {
      console.log(error)
    }
  }

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase)
      setEmailCompany(userFirebase.email)
    } else {
      setUser(null);
    }
  });
  
  const logout = async () => {
    await signOut(auth)
    setBackground(false)
    setEmailCompany(localStorage.removeItem("user"));
  }

  return (
    <>
      <AppContext.Provider
        value={{
          company,
          deleteLocal,
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
          createAddress,
          emailCompany,
          createEmployee,
          fetchLocalsByCompany,
          fetchEmployees,
          employees,
          deleteEmployee,
          editLocal,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}
