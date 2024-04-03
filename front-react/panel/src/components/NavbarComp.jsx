import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  Avatar
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/Ariel.png";

export default function NavbarComp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={handleMenuOpen}
      className="shadow-lg bg-neutral-800"
      maxWidth="full"
    >
      <NavbarContent className="sm:flex text-white">
        MY PELUQUERIA
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      <NavbarContent
        className="hidden text-white sm:flex gap-4"
        justify="center"
      >
        <NavbarItem className="hover:text-red-200">
          <Link to="/">Home</Link>
        </NavbarItem>
        <NavbarItem className="hover:text-red-200">
          <Link to="/panel">Panel</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <Avatar src={img} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem textValue="Perfil">
              <Link to="/perfil" className="block">
                Perfil
              </Link>
            </DropdownItem>
            <DropdownItem textValue="Login">
              <Link to="/login" className="block">
                Cerrar Sesión
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="opacity-70 bg-black text-white">
        <NavbarMenuItem className="hover:text-red-400">
          <Link className="block" to="/">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="hover:text-red-400">
          <Link className="block" to="/panel">
            Panel
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="hover:text-red-400">
          <Link className="block" to="/perfil">
            Perfil
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="hover:text-red-400">
          <Link className="block" to="/login">
            Salir
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
