import { createContext } from "react";
import { useContext, useEffect, useState } from "react";
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

export default function StatePrincipalContext({ children }) {
  const [company, setCompany] = useState();
  const [locals, setLocals] = useState();
  const [background, setBackground] = useState(false)
  const [user, setUser] = useState(null);
  const [emailCompany, setEmailCompany] = useState(localStorage.setItem("user", JSON.stringify(user)));
  const auth = getAuth(appFirebase);

  const fetchCompanyEmail = async (email) => {
    try {
        const response = await axios.get(`http://127.0.0.1:3000/api/company/email/${email}`);
        setCompany(response.data)
        console.log(response.data)
        
    } catch (error) {
        console.log("No company found");
    }
  };

  const fetchLocals = async (companyId) => {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/local/company/${companyId}`
    );
    setLocals(response.data.locals);
  };

  const createCompany = async (data) => {
    try {
      delete data.password
      const response = await axios.post("http://127.0.0.1:3000/api/company/", data);
      setCompany(response.data)
    } catch (error) {
      console.log("No company found");
    }
  };

  const createLocal = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/api/local/", data);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  const createAddress = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/api/address", data);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLocal = async (localId) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/local/${localId}`);
    } catch (error) {
      console.log(error);
    }
    fetchLocals(company.id);
  };

  const saveInfo = async (infoLocal, infoAddress) => {
    const response = await axios.post("http://127.0.0.1:3000/api/local", infoLocal);
    if (response) {
      infoAddress.local_id = response.data.id;
      await axios.post("http://127.0.0.1:3000/api/address", infoAddress);
    }
    fetchLocals(company.id);
  };

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
    setStorage(localStorage.removeItem('user'))
  }
  
  useEffect(()=> {
    fetchLocals();
  }, [])

  return (
    <>
      <AppContext.Provider
        value={{
          company,
          locals,
          saveInfo,
          fetchLocals,
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
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}
