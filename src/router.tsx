import RootLayout from "./layouts/root-layout";
import { createBrowserRouter } from "react-router-dom";

// routes
import Home from "./pages/home";
import Courses from "./pages/courses";
import Course from "./pages/course";
import Learn from "./pages/learn";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "courses/:id",
        element: <Course />,
      },
      {
        path: "courses/:id/learn",
        element: <Learn />,
      },
    ],
  },
]);

export default router;
