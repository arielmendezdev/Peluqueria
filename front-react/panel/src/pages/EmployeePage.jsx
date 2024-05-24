import { useState, useEffect } from "react";
import {
  Select,
  SelectItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
} from "@nextui-org/react";
import { useAppContext } from "../contexts/Principal";
import { useForm } from "react-hook-form";

export default function EmployeePage() {
  const { company, emailCompany, fetchCompanyEmail, createEmployee } = useAppContext();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    fetchCompanyEmail(emailCompany);
  }, []);

  const close = () => {
    setShowEmployee(false);
  };

  const openModalEmployee = () => {
    setShowEmployee(true);
  }

  const saveEmployee = async (data) => {
    await createEmployee(data)
    close()
  }

  const [showEmployee, setShowEmployee] = useState(false)

  return (
    <>
      <Button onClick={openModalEmployee} className="flex mx-auto mb-4">Agregar Empleado</Button>

      <Modal isOpen={showEmployee} onClose={close}>
        <ModalContent>
          <ModalHeader>Agregar Empleado</ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(saveEmployee)}
              className="flex flex-col gap-4"
            >
              <Select
                label="Seleccione la sucursal"
                {...register("local_id", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
              >
                {company &&
                  company.locals.map((local) => (
                    <SelectItem key={local.id} value={local.id}>
                      {local.name}
                    </SelectItem>
                  ))}
              </Select>
              <Input
                size="sm"
                defaultValue=""
                {...register("name", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
                label="Nombre"
              ></Input>
              {errors.name && <span>{errors.name.message}</span>}
              <Input
                size="sm"
                defaultValue=""
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
                label="Apellido"
              ></Input>
              {errors.lastname && <span>{errors.lastname.message}</span>}
              <Input
                size="sm"
                defaultValue=""
                {...register("email", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                })}
                label="Email"
              ></Input>
              {errors.lastname && <span>{errors.lastname.message}</span>}
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

      {company && (
        <div>
          <Table aria-label="Tabla de Locales">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {company.locals.map((local) => (
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
        </div>
      )}
    </>
  );
}
