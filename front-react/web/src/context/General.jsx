import { createContext } from "react";
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

const AppContext = createContext();

const url = "http://127.0.0.1:3000/api"

export function useAppContext() {
  return useContext(AppContext);
}

export default function StateGeneralContext({ children }) {
  
  const [background, setBackground] = useState(false);
  const [user, setUser] = useState();
  const [client, setClient] = useState(
    localStorage.setItem("user", JSON.stringify(user))
  );
  const auth = getAuth(appFirebase);
  
  
  const createClient = async (dataClient) => {
    try {
      await axios.post(`${url}/client/`, dataClient);
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
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}
