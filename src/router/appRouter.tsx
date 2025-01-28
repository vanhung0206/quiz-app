import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import MainLayout from "../layouts/MainLayout";
import CreateQuiz from "../pages/CreateQuiz";
import Result from "../pages/Result";

const appRouter = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      id: "main",
      path: "/",
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <CreateQuiz />,
        },
        {
          path: "result",
          element: <Result />,
        },
      ],
    },
  ],
  {
    basename: "/quiz-app",
  }
);

export default appRouter;
