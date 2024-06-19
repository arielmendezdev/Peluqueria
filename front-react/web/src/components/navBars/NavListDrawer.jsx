import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function NavListDrawer({ listDrawer, client, setOpen }) {
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <Box sx={{ p: 2, textAlign: "center" }}>{client.name}</Box>
        <Divider />
        <List>
          {listDrawer.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton component={Link} to={item.path} onClick={() => setOpen(false)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
