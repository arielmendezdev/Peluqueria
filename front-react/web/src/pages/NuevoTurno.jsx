import fondo from '../assets/images/fondo22.jpg'
import "../assets/css/NuevoTurno.css";
import { useAppContext } from '../context/General';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Link } from "react-router-dom";

export default function NuevoTurno() {

  const { user } = useAppContext();

  return (
    <Box>
      <div className="boxGeneral">
        <div className="boxName">
          <p>Hola {user.email}</p>
          <p>¿Qué te gustaria hacerte ?</p>
        </div>
        <img src={fondo} alt="" className="img" />
      </div>

      <Box
        sx={{
          mt: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Próximos turnos</h2>
          <Button>
            <Link to="/turnos/sucursal">Nuevo turno</Link>
          </Button>
        </Box>
        <Table
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>No hay turnos reservados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </Box>

      <Box
        sx={{
          mt: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Historial</h2>
          <Button>Ver todo</Button>
        </Box>
        <Table
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>No hay turnos reservados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </Box>
    </Box>
  );
}