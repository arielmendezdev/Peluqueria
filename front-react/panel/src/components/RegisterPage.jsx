import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useAppContext } from "../contexts/Principal";

export default function RegisterPage() {

  const { auth, createUserWithEmailAndPassword, createCompany } = useAppContext()
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate()

  const { 
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = handleSubmit( async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      await createCompany(data)
      navigate('/sucursales')
      reset();
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        alert("El correo ya existe en la base de datos");
      }
    }
  })

  return (
    <div className="login flex flex-col justify-center sm:w-96 mx-auto">
      <Card className="shadow-black shadow-lg bg-transparent border p-6 backdrop-blur-sm mx-6">
        <CardHeader className="text-lg flex justify-center">
          <h1 className="text-amber-600">
            <b>REGISTRO</b>
          </h1>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-2 px-4">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <Input
                placeholder="Nombre de la empresa"
                labelPlacement="outside"
                autoFocus
                {...register("social_razon", { required: true })}
                size="sm"
                variant="bordered"
                defaultValue=""
                className="text-white"
                startContent={<ApartmentIcon />}
              />
              {errors.social_razon && (
                <span>Debe introducir el nombre de la empresa</span>
              )}
              <Input
                placeholder="Nombre y Apellido"
                labelPlacement="outside"
                {...register("nameComplete", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre tiene que tener al menos 3 caracteres",
                  },
                })}
                size="sm"
                variant="bordered"
                defaultValue=""
                startContent={<PersonIcon />}
                className="text-white"
              />
              {errors.firstname && <span>{errors.firstname.message}</span>}
              <Input
                placeholder="Teléfono"
                labelPlacement="outside"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "El telefono es requerido",
                  },
                  minLength: {
                    value: 10,
                    message:
                      "El telefono tiene que tener al menos 10 caracteres",
                  },
                })}
                size="sm"
                variant="bordered"
                defaultValue=""
                startContent={<LocalPhoneIcon />}
                className="text-white"
              />
              {errors.lastname && <span>{errors.lastname.message}</span>}
              <Input
                placeholder="Email"
                labelPlacement="outside"
                type="email"
                className="text-white"
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
                    value:
                      /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,4})$/,
                    message: "El email no tiene un formato valido",
                  },
                })}
                size="sm"
                variant="bordered"
                defaultValue=""
                startContent={<EmailIcon />}
              />
              {errors.email && <span>{errors.email.message}</span>}
              <Input
                placeholder="Password"
                labelPlacement="outside"
                autoComplete="new-password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "El password es requerido",
                  },
                  minLength: {
                    value: 8,
                    message:
                      "El password tiene que tener al menos 8 caracteres",
                  },
                })}
                size="sm"
                variant="bordered"
                className="text-white"
                defaultValue=""
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                startContent={<LockIcon />}
              />
              {errors.password && (
                <span>Debe introducir una contraseña valida</span>
              )}

              <Button
                type="submit"
                className="text-gray-100 text-xl bg-green-600 block mt-4 mx-auto"
              >
                REGISTRATE
              </Button>
            </form>
          </div>
          <div className="text-center my-3">
            <b>
              <a className="text-white" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </b>
          </div>
          <div className="text-center my-3 text-white">
            <p>
              Si ya tenes una cuenta{" "}
              <b>
                <Link to="/login" className="text-green-700">
                  Ingresa aquí
                </Link>
              </b>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
