import { Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { useAppContext } from "../../context/General";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Register() {
  
  const navigate = useNavigate()

  const { auth, createUserWithEmailAndPassword, createClient } = useAppContext();

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
  
  const {  } = useAppContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const registerClient = handleSubmit( async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await createClient(data);
      navigate("/login");
      reset()
      console.log(data)
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        alert("El correo o la contraseña son incorrectos");
      }
    }
  })

  return (
    <Box width={350} sx={{ mx: "auto", my: 10 }}>
      <Typography className="text-center" variant="h3" m={4}>
        Register
      </Typography>

      <Box
        component="form"
        onSubmit={registerClient}
        className="flex flex-col gap-4"
      >
        <TextField
          label="Nombre"
          type="text"
          variant="outlined"
          autoFocus
          fullWidth
          helperText={errors.name?.message}
          error={!!errors.name}
          {...register("name", {
            required: {
              value: true,
              message: "El nombre es requerido",
            },
            minLength: {
              value: 3,
              message: "El nombre tiene que tener al menos 3 caracteres",
            },
          })}
        />
        <TextField
          label="Apellido"
          type="text"
          variant="outlined"
          fullWidth
          helperText={errors.lastname?.message}
          error={!!errors.lastname}
          {...register("lastname", {
            required: {
              value: true,
              message: "El nombre es requerido",
            },
            minLength: {
              value: 3,
              message: "El nombre tiene que tener al menos 3 caracteres",
            },
          })}
        />
        <TextField
          label="Teléfono"
          type="text"
          variant="outlined"
          fullWidth
          helperText={errors.phone?.message}
          error={!!errors.phone}
          {...register("phone", {
            required: {
              value: true,
              message: "El telefono es requerido",
            },
            minLength: {
              value: 10,
              message: "El telefono tiene que tener al menos 10 caracteres",
            },
          })}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          autoComplete="new-email"
          helperText={errors.email?.message}
          error={!!errors.email}
          {...register("email", {
            required: {
              value: true,
              message: "El email es requerido",
            },
            minLength: {
              value: 10,
              message: "El email tiene que tener al menos 10 caracteres",
            },
            pattern: {
              value: /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,4})$/,
              message: "El email no tiene un formato valido",
            },
          })}
        />
        <TextField
          label="Password"
          type={isVisible ? "text" : "password"}
          variant="outlined"
          fullWidth
          autoComplete="new-password"
          helperText={errors.password?.message}
          error={!!errors.password}
          {...register("password", {
            required: {
              value: true,
              message: "El password es requerido",
            },
            minLength: {
              value: 8,
              message: "El password tiene que tener al menos 8 caracteres",
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleVisibility}>
                  {isVisible ? (
                    <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box className="flex justify-center mt-2">
          <Typography>
            <span>
              Si ya tenes una cuenta{" "}
              <Link to="/login" className="text-green">
                Inicia sessión
              </Link>
            </span>
          </Typography>
        </Box>
        <Box className="flex justify-center mt-2">
          <Button type="submit" variant="outlined">
            Registrate
          </Button>
        </Box>
      </Box>
    </Box>
  );
}