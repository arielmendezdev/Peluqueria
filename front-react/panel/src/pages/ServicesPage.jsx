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
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/Principal";
import EditIcon from "@mui/icons-material/Edit";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Services() {
  const { company, saveService, uploadFile, editService, fetchCompanyEmail } =
    useAppContext();
  
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false)
  const [serviceSelected, setServiceSelected] = useState()
  const [serviceEdit, setServiceEdit] = useState()
  const [file, setFile] = useState(false)
  
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
  
  const save = handleSubmit(async (data) => {
    handleChange();
    if (modalEdit) {
        if (file) {
          const response = await uploadFile(data.image[0]);
          data.image = `https://firebasestorage.googleapis.com/v0/b/peluqueria-d742a.appspot.com/o/${response.metadata.name}?alt=media&token=`;
        } else {
          data.image = serviceEdit.image
        }
        await editService(serviceSelected, data)
        await fetchCompanyEmail();
    } else {
        const response = await uploadFile(data.image[0]);
        data.image = `https://firebasestorage.googleapis.com/v0/b/peluqueria-d742a.appspot.com/o/${response.metadata.name}?alt=media&token=`;
        data.company_id = company.id;
        await saveService(data);
        await fetchCompanyEmail();
    }
    setFile(false);
    closeModal();
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

  const handleEdit = async (service) => {
    setModal(true);
    setModalEdit(true)
    reset(service)
    setServiceEdit(service)
    setServiceSelected(service.id)
  }

  const handleChange = (e) => {
    if (e) {
      setFile(true);
    }
  }

  useEffect(() => {
    fetchCompanyEmail();
  }, []);

  return (
    <div className="w-full">
      <Button
        sx={{
          mb: 4,
        }}
        onClick={handleModal}
      >
        Agregar Servicio
      </Button>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 4,
      }}
      >
        {company &&
          company.services.map((service) => (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: 200,
                boxShadow: 10,
                position: "relative",
              }}
              >
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                }}
                onClick={() => handleEdit(service)}
                >
                <EditIcon />
              </IconButton>
              <Box sx={{
                height: 250,
              }}>
                <img src={service.image} alt="" width="100%"/>
              </Box>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 4,
                  mb: 4 
                }}
              >
                {service.type}
              </Typography>
            </Card>
          ))}
      </Box>

      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} component="form" onSubmit={save}>
          <Typography sx={{ mb: 2 }} variant="h6">
            {modalEdit ? "Editar Servicio" : "Nuevo Servicio"}
          </Typography>
          <TextField
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            {...register("type", {
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
          <TextField
            type="file"
            fullWidth
            variant="outlined"
            {...register("image", {})}
            onChange={handleChange}
            ></TextField>
          <Button onClick={closeModal}>Close</Button>
          <Button type="submit">Guardar</Button>
        </Card>
      </Modal>
    </div>
  );
}
