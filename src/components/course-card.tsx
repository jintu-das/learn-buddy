import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import { Course } from "../data/interface";
import { useNavigate } from "react-router-dom";

export default function CourseCard(course: Course) {
  const navigate = useNavigate();

  function navigateToCourse(id: number, name: string) {
    const route = name.split(" ").join("-");
    navigate(`/courses/${route}`, {
      state: {
        id,
      },
    });
  }

  return (
    <Tooltip title={course.name} arrow>
      <Card elevation={0}>
        <CardActionArea
          onClick={() => navigateToCourse(course.id, course.name)}
        >
          <CardMedia sx={{ height: 140 }} image={course.image} />
          <CardContent>
            <Typography fontWeight={500} noWrap>
              {course.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.author}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              mb={1}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Typography variant="body1" fontWeight={500} color={yellow[800]}>
                {course.rating}
              </Typography>
              <Rating
                name="read-only"
                size="small"
                value={course.rating}
                readOnly
              />
            </Stack>
            {course.bestseller && (
              <Chip size="small" label="Bestseller" color="info" />
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  );
}
