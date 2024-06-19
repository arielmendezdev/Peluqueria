import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/General";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const { auth, signInWithEmailAndPassword } = useAppContext();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const login = handleSubmit(async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        alert("El correo o la contraseña son incorrectos");
      }
    }
    reset();
  });

  return (
    <Box width={350} sx={{ mx: "auto", my: 10 }}>
      <Typography className="text-center" variant="h3" m={4}>
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={login}
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          autoFocus
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
              Si no tenes usuario{" "}
              <Link to="/register" className="text-green">
                Registrate
              </Link>
            </span>
          </Typography>
        </Box>
        <Box className="flex justify-center mt-2">
          <Button type="submit" variant="outlined">
            Ingresar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
