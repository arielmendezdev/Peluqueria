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
} from "@nextui-org/react";
import { useContext, useState } from "react";
import Link from "./specials/Link";
import img from "../assets/images/user.jpg";
import logo from "../assets/images/tijera_peine.png";
import '../assets/css/Navbar.css'
import { Link as LinkDom} from 'react-router-dom'
import { useAppContext } from "../contexts/Principal";

export default function NavbarComp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout } = useAppContext()

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
        <img src={logo} alt="" width={100} />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      <NavbarContent
        className="hidden text-white sm:flex gap-4"
        justify="center"
      >
        <NavbarItem className="hover:text-red-200">
          <Link to="/sucursales">Sucursales</Link>
        </NavbarItem>
        <NavbarItem className="hover:text-red-200">
          <Link to="/employee">Empleados</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" className="">
              <img src={img} alt="" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem textValue="Perfil">
              <Link to="/perfil" className="block">
                <h1>Perfil</h1>
              </Link>
            </DropdownItem>
            <DropdownItem textValue="Login">
              <LinkDom to="/login" className="block" onClick={logout}>
                <h1>Salir</h1>
              </LinkDom>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="opacity-70 bg-black text-white">
        <NavbarMenuItem className="hover:text-red-400">
          <Link className="block" to="/sucursales">
            Sucursales
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="hover:text-red-400">
          <Link className="block" to="/employee">
            Empleados
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="hover:text-red-400">
          <Link className="block" to="/perfil">
            Perfil
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="hover:text-red-400">
          <LinkDom to="/login" className="block" onClick={logout}>
            Salir
          </LinkDom>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
