import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import "../assets/css/Login.css";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../contexts/appContext";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { auth, createUserWithEmailAndPassword } = useContext(appContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const country = [
    { label: "Argentina", value: "Argentina" },
    { label: "España", value: "España" },
    { label: "Brasil", value: "Brasil" },
    { label: "Francia", value: "Francia" },
    { label: "Grecia", value: "Grecia" },
  ];

  const onSubmit = handleSubmit((data) => {
    reset();
  });

  return (
    <div className="login flex flex-col justify-center sm:w-96 mx-auto">
      <Card className="shadow-black shadow-lg">
        <CardHeader className="text-lg flex justify-center">
          <h1 className="text-amber-600">Registrate</h1>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-2 px-4">
            <form onSubmit={onSubmit}>
              <Input
                label="Nombre"
                labelPlacement="outside"
                {...register("firstname", {
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
                variant="underlined"
                defaultValue=""
              />
              {errors.firstname && <span>{errors.firstname.message}</span>}
              <Input
                label="Apellido"
                labelPlacement="outside"
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "El apellido es requerido",
                  },
                  minLength: {
                    value: 3,
                    message:
                      "El apellido tiene que tener al menos 3 caracteres",
                  },
                })}
                size="sm"
                variant="underlined"
                defaultValue=""
              />
              {errors.lastname && <span>{errors.lastname.message}</span>}
              <Input
                label="Email"
                labelPlacement="outside"
                type="email"
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
                variant="underlined"
                defaultValue=""
              />
              {errors.email && <span>{errors.email.message}</span>}
              <Input
                label="Nombre de la empresa"
                labelPlacement="outside"
                {...register("social_razon", { required: true })}
                size="sm"
                variant="underlined"
                defaultValue=""
              />
              {errors.social_razon && (
                <span>Debe introducir el nombre de la empresa</span>
              )}
              <Input
                label="Password"
                labelPlacement="outside"
                type="password"
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
                variant="underlined"
                defaultValue=""
              />
              {errors.password && (
                <span>Debe introducir una contraseña valida</span>
              )}
              <Input
                label="Confirm Password"
                labelPlacement="outside"
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Tienes que confirmar el password",
                  },
                  validate: (value) => {
                    return (
                      watch("password") == value ||
                      "No coindide con el password"
                    );
                  },
                })}
                size="sm"
                variant="underlined"
                defaultValue=""
              />
              {errors.confirmPassword && <span>El password no coincide</span>}
              <Select
                label="Pais"
                labelPlacement="outside"
                {...register("country")}
                size="sm"
                variant="underlined"
              >
                {country.map((count) => (
                  <SelectItem key={count.value} value={count.value}>
                    {count.value}
                  </SelectItem>
                ))}
              </Select>
              <Input
                {...register("photo")}
                variant="underlined"
                type="file"
                size="lg"
                defaultValue=""
              />
              <div className="mt-4 flex gap-2">
                <input
                  type="checkbox"
                  className=""
                  {...register("isActive", { required: true })}
                />
                <p>Acepta los terminos y condiciones</p>
              </div>
              {errors.isActive && (
                <span>Debe aceptar los terminos y codiciones</span>
              )}
              {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
              <Button
                type="submit"
                className="text-gray-100 text-xl bg-green-600 block mt-4"
              >
                REGISTRATE
              </Button>
            </form>
          </div>
          <div className="text-center my-3">
            <b>
              <a className="text-sky-600" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </b>
          </div>
          <div className="text-center my-3">
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
