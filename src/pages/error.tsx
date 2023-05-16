import { useRouteError } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Stack
      mt={12}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Typography variant="h2">Oops!</Typography>
      <Typography color="text.secondary" variant="h5">
        Sorry, an unexpected error has occurred.
      </Typography>

      <Typography color="text.secondary">
        <i>
          {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
        </i>
      </Typography>
    </Stack>
  );
}
