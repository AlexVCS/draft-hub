import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: '10px'}}>
      <img width={96} src="/nba_logo.svg" alt="NBA logo" />
      <Typography variant="h5">2025 Draft Hub</Typography>
    </Box>
  );
};

export default Header;
