import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
} from "@nextui-org/react";
import { useAppContext } from "../contexts/Principal";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const { company, emailCompany, fetchCompanyEmail } = useAppContext();
  const [infoCompany, setInfoCompany] = useState({
    email: company.email,
    nameComplete: company.nameComplete,
    phone: company.phone,
    social_razon: company.social_razon,
  });

  const handleChange = (e) => {
    setInfoCompany({
      ...infoCompany,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    fetchCompanyEmail(emailCompany);
  },[])
  
  const saveCompany = async () => {
    await axios.put(`http://127.0.0.1:3000/api/company/${company.id}`, infoCompany);
    fetchCompanyEmail(emailCompany);
  }

  return (
    <div>
      {company &&
      <Card>
        <CardHeader className="flex justify-evenly">
          <h1>{company.social_razon}</h1>
          <h1>Locales: {company.locals.length}</h1>
        </CardHeader>
        <CardBody className="flex gap-4">
          <Input name="social_razon" onChange={handleChange} value={infoCompany.social_razon} label="Nombre de la empresa"/>
          <Input name="nameComplete" onChange={handleChange} value={infoCompany.nameComplete} label="Nombre personal"/>
          <Input name="email" onChange={handleChange} value={infoCompany.email} label="Email"/>
          <Input name="phone" onChange={handleChange} value={infoCompany.phone} label="Teléfono"/>
          <Button onClick={saveCompany}>Guardar</Button>
        </CardBody>
      </Card>}
    </div>
  );
}
