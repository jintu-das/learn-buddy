import { useState } from "react";
import { Chip, Grid, Stack, Typography } from "@mui/material";
import { courses } from "../data/courses.json";
import CourseCard from "../components/course-card";

export default function Courses() {
  const [type, setType] = useState("");
  const courseTypes = getCourseTypes();

  const filterCourses = courses.filter((course) => {
    if (type === "") {
      return true;
    }
    return course.type === type;
  });

  function getCourseTypes() {
    const uniqueTypes = [] as string[];
    courses.forEach((course) => {
      if (!uniqueTypes.includes(course.type)) {
        uniqueTypes.push(course.type);
      }
    });
    return uniqueTypes;
  }

  return (
    <div>
      <Typography variant="h6" fontWeight={500} gutterBottom>
        All Courses Listing
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" mt={3}>
        {courseTypes.map((courseType) => (
          <Chip
            key={courseType}
            variant={type === courseType ? "filled" : "outlined"}
            color={type === courseType ? "info" : "default"}
            label={courseType.toUpperCase()}
            clickable
            onClick={() => setType(courseType)}
          />
        ))}
        <Chip
          variant="outlined"
          color="default"
          label="RESET FILTER"
          clickable
          onClick={() => setType("")}
        />
      </Stack>

      <Grid container my={4} spacing={2}>
        {filterCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
