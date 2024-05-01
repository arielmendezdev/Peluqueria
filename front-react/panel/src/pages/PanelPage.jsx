import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Switch,
  Card,
  CardBody, CardHeader, CardFooter, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";
import { useAppContext } from "../contexts/Principal";

export default function PanelPage() {
  const { saveInfo, locals } = useAppContext()

  const navigate = useNavigate()

  const [dialogAddress, setDialogAddress] = useState(false)
  
  const saveLocal = () => {
    setDialogAddress(true)
    console.log(infoLocal);
  }

  const onClose = () => {
    setDialogAddress(false)
  }

  const handleSubmit = () => {
    saveInfo(infoLocal, infoAddress)
    navigate('/')
  }

  const columns = [
    {
      key: "name",
      label: "Nombre"
    },
    {
      key: "phone",
      label: "Teléfono"
    },
    {
      key: "address",
      label: "Dirección"
    },
    {
      key: "employees",
      label: "Empleados"
    },
    
  ]

  console.log(locals)

  return (
    <>

      {locals && (
        <Table isStriped aria-label="Tabla de Locales">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {locals.map((local) => (
              <TableRow key={local.id}>
                <TableCell>{local.name}</TableCell>
                <TableCell>
                  {local.address?.streetName} {local.address?.number}
                </TableCell>
                <TableCell>{local.phone}</TableCell>
                <TableCell>
                  {/* {local.employees.map((employee) => (
                    <li key={employee.id}>
                      {employee.name} {employee.lastname}
                    </li>
                  ))} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
