import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: '10px'}}>
      <img width={200} height={200} src="/mavs_logo.png" alt="Mavs logo" />
      <Typography variant="h5">2025 Draft Hub</Typography>
    </Box>
  );
};

export default Header;
