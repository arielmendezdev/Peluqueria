import { Box, Typography } from "@mui/material";
import { useAppContext } from "../context/General";
import { useEffect } from "react";

export default function Empleado() {

    const { sucursalSelected, employees, fetchEmployees } = useAppContext();

    useEffect(() => {
        fetchEmployees()
    }, [])

  return (
    
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    }}>

        <Box sx={{
            mt: 10
        }}>
            <Typography>
                Sucursal: { sucursalSelected && sucursalSelected.name }
            </Typography>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            gap: 2
          }}
        >
          <Typography>NUEVO TURNO</Typography>
          <Typography>¿Con quién?</Typography>
          <Box sx={{
            mt: 4,
            mx: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            
          </Box>
        </Box>
    </Box>
  )
}