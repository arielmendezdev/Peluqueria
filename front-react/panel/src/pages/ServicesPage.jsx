import {
  Button,
  Modal,
  Box,
  Card,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import Link from "../components/specials/Link";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Services() {
  const [modal, setModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const saveService = handleSubmit( async (data) => {
    console.log(data)
  })

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
    <div>
      <Button onClick={handleModal}>Agregar Servicio</Button>

      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} component="form" onSubmit={saveService}>
          <Typography sx={{ mb: 2 }} variant="h6">
            Nuevo Servicio
          </Typography>
          <TextField
            type="text"
            fullWidth
            variant="outlined"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre del servicio es requerido",
              },
              minLength: {
                value: 5,
                message: "El nombre del servicio es muy corto",
              },
            })}
          ></TextField>
          <Button onClick={closeModal}>Close</Button>
          <Button type="submit">Guardar</Button>
        </Card>
      </Modal>

      <Typography>
        Servicios
      </Typography>
    </div>
  );
}
