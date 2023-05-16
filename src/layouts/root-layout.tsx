import { Outlet } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Navbar from "../components/navbar";

export default function RootLayout() {
  return (
    <>
      <CssBaseline />

      <Navbar />
      <Container maxWidth="lg" component="main">
        <Outlet />
      </Container>
    </>
  );
}
