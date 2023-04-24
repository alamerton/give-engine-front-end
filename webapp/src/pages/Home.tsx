import { Box, Typography } from "@mui/material";
import CharityList from "../components/CharityList";

export default function Home() {
  return (
    <Box sx={{ background: "whitesmoke" }}>
      <Box sx={{ padding: "2rem", margin: "auto", width: "80%" }}>
        <Typography variant="h3">Welcome</Typography>
      </Box>
      <CharityList />
    </Box>
  );
}
