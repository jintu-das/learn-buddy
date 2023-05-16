import { useState, SyntheticEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courses } from "../data/courses.json";
import {
  Container,
  Button,
  IconButton,
  Stack,
  Typography,
  Snackbar,
} from "@mui/material";
import LessonQuestion from "../components/question";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { Lesson } from "../data/interface";

export default function Learn() {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const [showQuestions, setShowQuestions] = useState(false);
  const [open, setOpen] = useState(false);
  const [correctCount, setCorrectCount] = useState(new Map());

  const lesson = courses
    .find((course) => course.id === state?.courseId)
    ?.lessons.find((lesson) => lesson.id === state.lessonId);
  const lastLessonId = courses
    .find((course) => course.id === state?.courseId)
    ?.lessons.at(-1)?.id;

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function nextPageHandler() {
    const path = pathname.split("/")[2];
    const lessons = courses.find(
      (course) => course.id === state?.courseId
    )?.lessons;

    const nextLesson = getNextElement(state.lessonId, lessons as any);

    if (!nextLesson) return;

    setCorrectCount(new Map());
    navigate(`/courses/${path}/learn`, {
      state: {
        courseId: state.courseId,
        lessonId: nextLesson?.id,
      },
    });
    window.scrollTo(0, 0);
    setShowQuestions(false);
  }

  function getNextElement(id: number, lessons: Lesson[]) {
    const currentIndex = lessons?.findIndex((lesson) => lesson.id === id);
    if (currentIndex + 1 === lessons.length) {
      return null;
    }
    return lessons?.at(currentIndex! + 1);
  }

  function endHandler() {
    setOpen(true);
    setShowQuestions(true);
  }

  function finishHandler() {
    const courses = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_ID)!
    );

    if (!courses) {
      return navigate("/courses");
    }

    const newCourses = courses.filter(
      (course: any) => course.courseId !== state.courseId
    );

    localStorage.setItem(
      import.meta.env.VITE_LOCALSTORAGE_ID,
      JSON.stringify(newCourses)
    );
    navigate("/courses");
  }

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_ID)!
    );

    if (data === null) {
      const courses = [];
      courses.push(state);
      localStorage.setItem(
        import.meta.env.VITE_LOCALSTORAGE_ID,
        JSON.stringify(courses)
      );
      return;
    }

    const newData = data.filter((d: any) => d.courseId !== state.courseId);
    newData.push(state);

    localStorage.setItem(
      import.meta.env.VITE_LOCALSTORAGE_ID,
      JSON.stringify(newData)
    );
  }, [state.courseId, state.lessonId]);

  if (!lesson) {
    return (
      <div>
        <Typography variant="h5">No lesson found!</Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h5" fontWeight={700} align="center" mb={2}>
        {lesson.title}
      </Typography>
      <Typography paragraph color="text.secondary" align="center" mb={4}>
        {lesson.description}
      </Typography>

      <video
        controls
        autoPlay
        width="100%"
        src={lesson.video_url}
        onEnded={endHandler}
      ></video>

      {showQuestions &&
        lesson.questions?.map((question) => (
          <LessonQuestion
            key={question.id}
            setCount={setCorrectCount}
            question={question}
          />
        ))}

      {showQuestions && (
        <Stack justifyContent="center" alignItems="flex-end" my={4}>
          {lesson.id === lastLessonId ? (
            <Button
              endIcon={<ArrowForwardIcon />}
              disabled={lesson.questions?.length !== correctCount.size}
              onClick={finishHandler}
            >
              Finish
            </Button>
          ) : (
            <Button
              endIcon={<ArrowForwardIcon />}
              disabled={lesson.questions?.length !== correctCount.size}
              onClick={nextPageHandler}
            >
              Next Page
            </Button>
          )}
        </Stack>
      )}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        message="Scroll Down for questions"
      />
    </Container>
  );
}
