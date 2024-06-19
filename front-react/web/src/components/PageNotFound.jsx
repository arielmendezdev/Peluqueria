import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Typography } from "@mui/material";

export default function PageNotFound() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: '20px', textAlign: 'center', width: "100%", alignContent: "center", height: "70vh", justifyContent: 'center' }}>
        <SentimentVeryDissatisfiedIcon color="error" className="opacity-50 mx-auto" fontSize="large"/>
        <Typography component="h1" variant="h1">
            404
        </Typography>
        <Typography component="h3" variant="h3">
            Page not found
        </Typography>
        <Typography className="flex flex-col gap-2">
            <span>The Page you are looking for doesn't exist or an other error occurred.</span>
            <a className="text-blue" href="/">Go back to menu</a>
        </Typography>
    </Box>
  )
}
