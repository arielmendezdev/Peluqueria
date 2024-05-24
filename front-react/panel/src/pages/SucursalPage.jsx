import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  ModalContent,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/Principal";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function SucursalPage() {
  const {
    emailCompany,
    company,
    setBackground,
    createLocal,
    createAddress,
    fetchCompanyEmail,
    deleteLocal,
  } = useAppContext();
  
  const [showLocal, setShowLocal] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [idLocal, setIdLocal] = useState()

  const openModalLocal = () => setShowLocal(true);
  const closeModalLocal = () => setShowLocal(false);
  const openModalAddress = async (data) => {
    if (data.name != null) {
      data.company_id = company.id
      const response = await createLocal(data)
      setIdLocal(response.id)
      closeModalLocal();
      setShowAddress(true);
    }
  };
  const closeModalAddress = async (data) => {
    if (data.streetName != null || data.number != null || data.city != null ) {
      data.local_id = idLocal
      await createAddress(data)
      setShowAddress(false);
      resetLocal();
      resetAddress();
    }
  };

  const {
    register: registerLocal,
    handleSubmit: handleLocal,
    formState: { errors: errorsLocal },
    reset: resetLocal,
  } = useForm();
  const {
    register: registerAddress,
    handleSubmit: handleAddress,
    formState: { errors: errorsAddress },
    reset: resetAddress,
  } = useForm();
  
  useEffect(() => {
    setBackground(true);
    fetchCompanyEmail(emailCompany)
  }, []);

  const close = () => {
    setShowAddress(false);
    setShowLocal(false);
  };

  return (
    <>
      <Button onPress={openModalLocal} className="flex mx-auto">Agregar Sucursal</Button>

      <Modal isOpen={showLocal} onClose={close}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Datos de la Sucursal
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleLocal(openModalAddress)}
              className="flex flex-col gap-4"
            >
              <Input
                size="sm"
                defaultValue=""
                {...registerLocal("name", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
                label="Nombre de la sucursal"
              ></Input>
              {errorsLocal.name && <span>{errorsLocal.name.message}</span>}
              <Input
                size="sm"
                defaultValue=""
                {...registerLocal("phone")}
                label="Teléfono"
              ></Input>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  color="secondary"
                  variant="light"
                  className="w-20"
                  onPress={openModalAddress}
                >
                  Siguiente
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal isOpen={showAddress} onClose={close}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Dirección</ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleAddress(closeModalAddress)}
              className="flex flex-col gap-4"
            >
              <Input
                defaultValue=""
                {...registerAddress("streetName", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
                label="Calle"
              ></Input>
              {errorsAddress.streetName && (
                <span>{errorsAddress.streetName.message}</span>
              )}
              <Input
                defaultValue=""
                {...registerAddress("number", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
                label="Numero"
              ></Input>
              {errorsAddress.number && (
                <span>{errorsAddress.number.message}</span>
              )}
              <Input
                defaultValue=""
                {...registerAddress("city", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
                label="Ciudad"
              ></Input>
              {errorsAddress.city && (
                <span>{errorsAddress.city.message}</span>
              )}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  color="secondary"
                  variant="light"
                  className="w-20"
                >
                  Guardar
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="mt-10 flex justify-center flex-wrap">
        {company &&
          company.locals.map((local) => {
            return (
              <Card key={local.id} className="w-72 flex m-2">
                <CardHeader className="flex justify-between">
                  <h1>{local.name.toUpperCase()}</h1>
                  <Button isIconOnly color="danger" size="sm" variant="light" onClick={() => deleteLocal(local.id)}>
                    <DeleteIcon />
                  </Button>
                  <Button isIconOnly color="danger" size="sm" variant="light" onClick={() => deleteLocal(local.id)}>
                    <EditIcon />
                  </Button>
                </CardHeader>
                <CardBody>
                  Dirección: {local.address?.streetName} {local?.address?.number}
                </CardBody>
              </Card>
            );
          })}
      </div>
    </>
  );
}
