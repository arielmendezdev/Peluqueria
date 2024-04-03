import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { appContext } from "../contexts/appContext";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
  CardBody, CardHeader, CardFooter, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";

export default function PanelPage() {
  const { saveInfo } = useContext(appContext);

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [streetName, setStreetName] = useState("")
  const [number, setNumber] = useState("")
  const [city, setCity] = useState("")
  const [code_post, setCode_post] = useState("")
  const [province, setProvince] = useState("")

  const [dialogAddress, setDialogAddress] = useState(false)
  
  const company_id = "73733cb3-773c-4517-9c18-b9c2e6f0db39";

  const infoLocal = {name, phone, company_id}
  const infoAddress = { streetName, number, city, code_post, province };

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

  return (
    <>
      <div className="flex flex-wrap justify-evenly gap-4">
        <Card className="shadow-lg shadow-slate-500 w-96">
          <CardHeader>
            <h1>Agregar Local</h1>
          </CardHeader>
          <CardBody>
            <div className="flex gap-2 flex-row">
              <Input
                className="w-96"
                value={name}
                label="Nombre del local"
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Input
                className="w-96"
                value={phone}
                label="Teléfono"
                onChange={(e) => setPhone(e.target.value)}
              ></Input>
            </div>
          </CardBody>

          <Modal isOpen={dialogAddress} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="gap-1">
                    Ingrese la dirección
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-2 mb-24">
                      <Input
                        value={streetName}
                        label="Calle"
                        onChange={(e) => setStreetName(e.target.value)}
                      ></Input>
                      <Input
                        value={number}
                        label="Numero"
                        type="number"
                        onChange={(e) => setNumber(e.target.value)}
                      ></Input>
                      <Input
                        value={city}
                        label="Ciudad"
                        onChange={(e) => setCity(e.target.value)}
                      ></Input>
                      <Input
                        value={code_post}
                        label="Codigo Postal"
                        onChange={(e) => setCode_post(e.target.value)}
                      ></Input>
                      <Input
                        value={province}
                        label="Provincia"
                        onChange={(e) => setProvince(e.target.value)}
                      ></Input>
                    </div>
                  </ModalBody>
                  <ModalFooter className="flex justify-center">
                    {/* <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button> */}
                    <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                      Aceptar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <CardFooter>
            <Button onClick={saveLocal}>Aceptar</Button>
          </CardFooter>
        </Card>
      </div>

      {/* {locals && (
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
                  {local.employees.map((employee) => (
                    <li key={employee.id}>
                      {employee.name} {employee.lastname}
                    </li>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )} */}
    </>
  );
}
