import { appContext } from "./appContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StatePrincipalContext({ children }) {

  const [company, setCompany] = useState();
  const [locals, setLocals] = useState()
  
  const fetchCompany = async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/company/73733cb3-773c-4517-9c18-b9c2e6f0db39"
    );
    setCompany(response.data)
  }

  const fetchLocals = async () => {
    const response = await axios.get("http://127.0.0.1:3000/api/local");
    setLocals(response.data)
  }

  const saveInfo = async (infoLocal, infoAddress) => {
    const response = await axios.post("http://127.0.0.1:3000/api/local", infoLocal)
    if (response) {
      infoAddress.local_id = response.data.id
      await axios.post("http://127.0.0.1:3000/api/address", infoAddress)
    }
    fetchLocals()
  }

  useEffect(() => {
    fetchCompany()
  }, [])

  return (
    <>
      <appContext.Provider
        value={{
          company,
          locals,
          saveInfo,
          fetchLocals,
        }}
      >
        {children}
      </appContext.Provider>
    </>
  )
}