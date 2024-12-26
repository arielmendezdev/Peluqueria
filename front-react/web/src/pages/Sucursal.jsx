import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useAppContext } from "../context/General";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sucursal() {

    const { sucursals, fetchSucursals, setSucursalSelected } = useAppContext();

    useEffect(() => {
      fetchSucursals();
    }, []);

    const sucursalSelected = (local) => {
        setSucursalSelected(local);
    }

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        gap: 2
      }}
    >
      <Typography>NUEVO TURNO</Typography>
      <Typography>¿En qué sucursal?</Typography>
      <Box sx={{
        mt: 4,
        mx: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        { sucursals && sucursals.map((local) => {
            return (
              <Card key={local.id}>
                <CardContent>{local.name}</CardContent>
                <Typography>{local.address.streetName} {local.address.number}</Typography>
                <Button onClick={sucursalSelected(local)}>
                    <Link to="/turnos/empleado">
                        Seleccionar
                    </Link>
                </Button>
              </Card>
            );
        })}
      </Box>

    </Box>
  );
}