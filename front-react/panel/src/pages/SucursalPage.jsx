import {
  Button,
  TextField,
  Modal,
  Typography,
  Box,
  Card,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/Principal";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function SucursalPage() {
  
  const {
    register: registerLocal,
    handleSubmit: handleLocal,
    formState: { errors: errorsLocal },
    reset: resetLocal,
    getValues: getValuesLocal
  } = useForm();
  const {
    register: registerAddress,
    handleSubmit: handleAddress,
    formState: { errors: errorsAddress },
    reset: resetAddress,
    getValues: getValuesAddress
  } = useForm();

  const {
    company,
    setBackground,
    createLocal,
    createAddress,
    fetchCompanyEmail,
    deleteLocal,
    editLocal,
    editAddress,
  } = useAppContext();
  
  const [showLocal, setShowLocal] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [idLocal, setIdLocal] = useState()
  const [modalEdit, setModalEdit] = useState(false)

  const openModalLocal = () => {
    resetLocal({
      getValuesLocal
    })
    resetAddress({
      getValuesAddress
    });
    setShowLocal(true)
    setModalEdit(false)
  };
  const closeModalLocal = () => setShowLocal(false);
  const openModalAddress = async (data) => {
    if (data.name != null) {
      if (modalEdit) {
        const info = {
          name: data.name,
          phone: data.phone
        }
        await editLocal(data.id, info)
      } else {
        data.company_id = company.id;
        const response = await createLocal(data)
        setIdLocal(response.id)
      }
    }
    closeModalLocal();
    setShowAddress(true);
  };
  const closeModalAddress = async (data) => {
    if (data.streetName != null || data.number != null || data.city != null ) {
      if (modalEdit) {
        const info = {
          streetName: data.streetName,
          number: data.number,
          city: data.city
        }
        await editAddress(data.id, info)
        setShowAddress(false);
      } else {
        data.local_id = idLocal
        await createAddress(data)
        setShowAddress(false);
      }
    }
    close()
  };
  
  useEffect(() => {
    setBackground(true);
    fetchCompanyEmail();
  }, []);

  const close = () => {
    resetLocal({
      getValuesLocal,
    });
    resetAddress({
      getValuesAddress,
    });
    setShowAddress(false);
    setShowLocal(false);
  };

  const handleEditLocal = (data) => {
    setModalEdit(true)
    setShowLocal(true);
    resetLocal(data)
    resetAddress(data.address)
  }

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
      <Button onClick={openModalLocal} className="flex mx-auto">
        Agregar Sucursal
      </Button>

      <Modal open={showLocal}>
        <Card sx={style}>
          <Box className="mb-6 flex justify-center">
            <Typography sx={{ fontSize: 20 }}>
              {modalEdit ? "Editar" : "Agregar"}
            </Typography>
          </Box>
          <form
            onSubmit={handleLocal(openModalAddress)}
            className="flex flex-col gap-4"
          >
            <TextField
              label="Nombre de la sucursal"
              size="small"
              defaultValue=""
              fullWidth
              autoFocus
              variant="outlined"
              helperText={errorsLocal.name?.message}
              error={!!errorsLocal.name}
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
              defaultValue=""
              fullWidth
              variant="outlined"
              helperText={errorsLocal.phone?.message}
              error={!!errorsLocal.phone}
              {...registerLocal("phone")}
            ></TextField>
            <div className="flex justify-between mt-4">
              <Button
                color="secondary"
                variant="light"
                className="w-20"
                onClick={close}
              >
                Cerrar
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="light"
                className="w-20"
              >
                Siguiente
              </Button>
            </div>
          </form>
        </Card>
      </Modal>

      <Modal open={showAddress}>
        <Card sx={style}>
          <Box className="mb-6 flex justify-center">
            <Typography sx={{ fontSize: 20 }}>Dirección</Typography>
          </Box>
          <form
            onSubmit={handleAddress(closeModalAddress)}
            className="flex flex-col gap-4"
          >
            <TextField
              label="Calle"
              defaultValue=""
              fullWidth
              autoFocus
              variant="outlined"
              helperText={errorsAddress.streetName?.message}
              error={!!errorsAddress.streetName}
              {...registerAddress("streetName", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            ></TextField>
            <TextField
              label="Numero"
              defaultValue=""
              fullWidth
              variant="outlined"
              helperText={errorsAddress.number?.message}
              error={!!errorsAddress.number}
              {...registerAddress("number", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            ></TextField>
            <TextField
              label="Ciudad"
              defaultValue=""
              fullWidth
              variant="outlined"
              helperText={errorsAddress.city?.message}
              error={!!errorsAddress.city}
              {...registerAddress("city", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
            ></TextField>
            <div className="flex justify-between mt-4">
              <Button
                disabled={showAddress}
                color="secondary"
                variant="light"
                className="w-20"
                onClick={close}
              >
                Cerrar
              </Button>
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
        </Card>
      </Modal>

      <div className="mt-10 flex justify-center flex-wrap">
        {company &&
          company.locals?.map((local) => {
            return (
              <Card
                key={local.id}
                className="w-72 flex m-2 p-6 flex-col gap-10"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography>
                      Sucursal: <b>{local.name.toUpperCase()}</b>
                    </Typography>
                  </Box>
                  <Box className="flex">
                    <IconButton
                      color="primary"
                      size="small"
                      variant="light"
                      onClick={() => handleEditLocal(local)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      variant="light"
                      onClick={() => deleteLocal(local.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box>
                  <Typography>
                    Dirección: {local.address?.streetName}{" "}
                    {local?.address?.number}
                  </Typography>
                </Box>
              </Card>
            );
          })}
      </div>
    </>
  );
}
