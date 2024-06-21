import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Modal,
  Select,
  MenuItem,
  Typography,
  Box,
  Card,
} from "@mui/material";
import { useAppContext } from "../contexts/Principal";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EmployeePage() {
  const {
    company,
    createEmployee,
    deleteEmployee,
    fetchCompanyEmail,
  } = useAppContext();

  const columns = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "lastname",
      label: "Apellido",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "local",
      label: "Local",
    },
    {
      key: "actions",
      label: "Acciones",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchCompanyEmail();
  }, []);

  const close = () => {
    setShowEmployee(false);
  };

  const openModalEmployee = () => {
    setShowEmployee(true);
  };

  const saveEmployee = handleSubmit(async (data) => {
    data.company_id = company.id;
    await createEmployee(data);
    close();
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
  };

  const [showEmployee, setShowEmployee] = useState(false);

  return (
    <>
      <Button onClick={openModalEmployee} className="flex mx-auto mb-4">
        Agregar Empleado
      </Button>

      <Modal open={showEmployee}>
        <Card sx={style}>
          <Box className="mb-4 flex justify-center">
            <Typography>Cargar Empleado</Typography>
          </Box>

          <form
            onSubmit={handleSubmit(saveEmployee)}
            className="flex flex-col gap-4"
          >
            <Select
              label="Seleccione la sucursal *"
              size="small"
              defaultValue=""
              fullWidth
              variant="outlined"
              {...register("local_id", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            >
              {company &&
                company.locals.map((local) => (
                  <MenuItem key={local.id} value={local.id}>
                    {local.name}
                  </MenuItem>
                ))}
            </Select>
            <TextField
              label="Nombre"
              size="small"
              fullWidth
              variant="outlined"
              helperText={errors.name?.message}
              error={!!errors.name}
              {...register("name", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            ></TextField>
            {errors.name && <span>{errors.name.message}</span>}
            <TextField
              label="Apellido"
              size="small"
              fullWidth
              variant="outlined"
              helperText={errors.lastname?.message}
              error={!!errors.lastname}
              {...register("lastname", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            ></TextField>
            {errors.lastname && <span>{errors.lastname.message}</span>}
            <TextField
              label="Email"
              size="small"
              fullWidth
              variant="outlined"
              helperText={errors.email?.message}
              error={!!errors.email}
              {...register("email", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            ></TextField>
            {errors.lastname && <span>{errors.lastname.message}</span>}
            <div className="flex justify-end gap-4">
              <Button color="error" variant="outlined" onClick={close}>
                Cerrar
              </Button>
              <Button type="submit" variant="text" onClick={saveEmployee}>
                Guardar
              </Button>
            </div>
          </form>
        </Card>
      </Modal>

      {company && (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {company.employees?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.lastname}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.local.name}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => deleteEmployee(employee.id)}>
                      <DeleteIcon />
                    </Button>
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
