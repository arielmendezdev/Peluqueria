import { Card, CardHeader, CardBody, Button, Input, Image } from '@nextui-org/react'
import { Link } from 'react-router-dom';
import '../assets/css/Login.css'
import logo from '../assets/images/black.png';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAppContext } from '../contexts/Principal';

export default function LoginPage() {

  const { auth, signInWithEmailAndPassword } = useAppContext()

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const login = handleSubmit( async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setEmail('')
      setPassword('')
      setError(null)
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        alert("El correo o la contraseña son incorrectos");
      }
    }
    reset()
  })

  return (
    <div className="login flex flex-col justify-center">
      <div className="flex justify-center sm:mb-28">
        <Image src={logo} width={250} />
      </div>

      <div className="flex flex-col sm:flex-row justify-center sm:gap-20">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center text-white text-center py-10 w-72">
            <p className="text-lg">Llevá tu negocio a otro nivel</p>
            <b>
              <h1 className="text-xl">
                Controlá todos tus locales desde tú celular con esta app
              </h1>
            </b>
          </div>
        </div>
        <Card className="shadow-gray-700 shadow-md bg-transparent border p-6 backdrop-blur-sm">
          <CardHeader className="text-lg flex justify-center">
            <h1 className="text-amber-600">
              <b>¡Comenza con tu negocio!</b>
            </h1>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-6" onSubmit={login}>
              <Input
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                defaultValue=""
                className="text-white"
                variant="bordered"
                autoFocus
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
                startContent={<EmailIcon />}
              />
              {errors.email && <span>{errors.email.message}</span>}
              <Input
                // onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                defaultValue=""
                className="text-white"
                variant="bordered"
                autoComplete="new-password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
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
                startContent={<LockIcon />}
              />
              {errors.password && (
                <span>Debe introducir una contraseña valida</span>
              )}
              <Button
                type="submit"
                className="text-gray-100 mx-auto text-xl bg-green-600"
              >
                INGRESAR
              </Button>
            </form>
            <div className="text-center my-3">
              <b>
                <a className="text-white">¿Olvidaste tú contraseña?</a>
              </b>
            </div>
            <div className="text-center text-white my-3">
              <p>
                Si no tenes cuenta{" "}
                <b>
                  <Link to="/register" className="text-green-700">
                    ¡Registrate!
                  </Link>
                </b>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}