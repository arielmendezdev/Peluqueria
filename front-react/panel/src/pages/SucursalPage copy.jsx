import { Card, Button, TextField, Modal, Typography, Box} from "@mui/material"
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

  const openModalLocal = () => setShowLocal(true)
  const closeModalLocal = () => setShowLocal(false)
  const openModalAddress = handleLocal ( async (data) => {
    if (data.name != null) {
      data.company_id = company.id
      const response = await createLocal(data)
      setIdLocal(response.id)
      closeModalLocal();
      setShowAddress(true);
    }
  });
  const closeModalAddress = handleAddress ( async (data) => {
    if (data.streetName != null || data.number != null || data.city != null ) {
      data.local_id = idLocal
      await createAddress(data)
      setShowAddress(false);
      resetLocal();
      resetAddress();
    }
  });

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button onClick={() => openModalLocal} className="flex mx-auto">
        Agregar Sucursal
      </Button>

      <Modal open={showLocal}>
        <Card sx={style}>
          <Box>
            <Typography className="flex flex-col gap-1">
              Datos de la Sucursal
            </Typography>
          </Box>
          <form
            onSubmit={openModalAddress}
            className="flex flex-col gap-4"
          >
            <TextField
              label="Nombre de la sucursal"
              size="small"
              fullWidth
              variant="outlined"
              helperText={errors.name?.message}
              error={!!errors.name}
              {...registerLocal("name", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            ></TextField>
            <TextField
              label="Teléfono"
              size="small"
              fullWidth
              variant="outlined"
              helperText={errors.phone?.message}
              error={!!errors.phone}
              {...registerLocal("phone")}
            ></TextField>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="outlined"
                className="w-20"
                onClick={() => openModalAddress}
              >
                Siguiente
              </Button>
            </div>
          </form>
        </Card>
      </Modal>

      <Modal open={showAddress}>
        <Box>
          <Typography className="flex flex-col gap-1">Dirección</Typography>
        </Box>
        <Box
          component="form"
          onSubmit={closeModalAddress}
          className="flex flex-col gap-4"
        >
          <TextField
            label="Calle"
            fullWidth
            variant="outlined"
            helperText={errors.streetName?.message}
            error={!!errors.streetName}
            {...registerAddress("streetName", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
            })}
          ></TextField>
          <TextField
            label="Numero"
            fullWidth
            variant="outlined"
            helperText={errors.number?.message}
            error={!!errors.number}
            {...registerAddress("number", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
            })}
          ></TextField>
          <TextField
            label="Ciudad"
            fullWidth
            variant="outlined"
            helperText={errors.city?.message}
            error={!!errors.city}
            {...registerAddress("city", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
            })}
          ></TextField>
          <div className="flex justify-end">
            <Button type="submit" variant="outlined" className="w-20">
              Guardar
            </Button>
          </div>
        </Box>
      </Modal>

      <div className="mt-10 flex justify-center flex-wrap">
        {company &&
          company.locals.map((local) => {
            return (
              <Card key={local.id} className="w-72 flex m-2">
                <Box className="flex justify-between">
                  <h1>{local.name.toUpperCase()}</h1>
                  <Button
                    color="danger"
                    size="small"
                    variant="outlined"
                    onClick={() => deleteLocal(local.id)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    color="danger"
                    size="small"
                    variant="outlined"
                    onClick={() => editLocal(local.id)}
                  >
                    <EditIcon />
                  </Button>
                </Box>
                <Box>
                  Dirección: {local.address?.streetName}{" "}
                  {local?.address?.number}
                </Box>
              </Card>
            );
          })}
      </div>
    </>
  );
}
