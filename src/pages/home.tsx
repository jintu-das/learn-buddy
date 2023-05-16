import { Link } from "react-router-dom";
import { courses } from "../data/courses.json";
import CourseCard from "../components/course-card";
import { Button, Grid, Stack, Typography } from "@mui/material";

export default function Home() {
  const popularCourses = courses
    .filter((course) => course.students >= 60000)
    .slice(0, 4);

  const recommendedCourses = courses
    .filter((course) => course.rating >= 4.5)
    .slice(0, 4);

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={1}
      >
        <Typography variant="h6" fontWeight={500}>
          Recommended for you
        </Typography>

        <Button variant="text" component={Link} to="/courses">
          View All
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {recommendedCourses.map((course) => (
          <Grid item xs={12} sm={6} md={3} key={course.id}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={6}
        mb={1}
      >
        <Typography variant="h6" fontWeight={500}>
          Popular Now
        </Typography>

        <Button variant="text" component={Link} to="/courses">
          View All
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {popularCourses.map((course) => (
          <Grid item xs={12} sm={6} md={3} key={course.id}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
