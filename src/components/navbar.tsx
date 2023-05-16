import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Stack,
  Typography,
} from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Toolbar component="nav">
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="h6"
              fontWeight={500}
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Learn{" "}
              <Typography color="red" component="span" variant="inherit">
                Buddy
              </Typography>
            </Typography>

            <Stack
              direction="row"
              flex={1}
              spacing={3}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button component={Link} to="/courses" color="inherit">
                All Courses
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
