import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courses } from "../data/courses.json";
import {
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { formatNumber } from "../data/utils";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SchoolIcon from "@mui/icons-material/School";

export default function Course() {
  const location = useLocation();
  const navigate = useNavigate();
  const [localStorageState, setLocalStorageState] = useState<{
    courseId: number;
    lessonId: number;
  }>();

  // functions
  const course = courses.find((course) => course.id === location?.state?.id);
  const navigateToLesson = (courseId: number, lessonId: number) =>
    navigate("learn", {
      state: {
        courseId,
        lessonId,
      },
    });

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_ID)!
    );

    if (data === null) return;

    const courseData = data.find(
      (course: any) => course.courseId === location.state.id
    );

    setLocalStorageState(courseData);
  }, [location.state.id]);

  if (!course)
    return (
      <div>
        <Typography variant="h2">No Course found with this id</Typography>
      </div>
    );

  return (
    <>
      <Stack alignItems="flex-start">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {course.name}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={500}
          color="text.secondary"
          gutterBottom
        >
          {course.description}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-start"
          alignItems="center"
          mb={1}
        >
          <Typography fontWeight={400}>{course.rating}</Typography>
          <Rating readOnly value={course.rating} size="small" />
          <Typography>{formatNumber(course.students)} students</Typography>
        </Stack>
        <Typography color="text.secondary" gutterBottom>
          Created By{" "}
          <Typography component="span" fontWeight={500}>
            {course.author}
          </Typography>
        </Typography>

        {course.bestseller && <Chip label="Bestseller" color="primary" />}
      </Stack>

      <Typography variant="h5" fontWeight={700} mt={6}>
        Course Contents
      </Typography>

      <List>
        {course.lessons.map((lesson) => (
          <ListItem key={lesson.id}>
            <ListItemAvatar>
              <Avatar>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              key={lesson.id}
              primary={lesson.title}
              secondary={`${lesson.questions?.length} questions`}
            />
          </ListItem>
        ))}

        <Stack
          my={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Button
            endIcon={<KeyboardArrowRightIcon />}
            size="medium"
            variant="outlined"
            onClick={() => navigateToLesson(course.id, course.lessons[0].id)}
          >
            Get Started
          </Button>
          {localStorageState && (
            <Button
              variant="contained"
              onClick={() =>
                navigateToLesson(
                  localStorageState.courseId,
                  localStorageState.lessonId
                )
              }
            >
              Resume from where you left{" "}
            </Button>
          )}
        </Stack>
      </List>
    </>
  );
}
