import { createBrowserRouter, redirect } from "react-router-dom";
import { getCategoryList } from "../apis";
import ErrorBoundary from "../components/ErrorBoundary";
import MainLayout from "../layouts/MainLayout";
import CreateQuiz from "../pages/CreateQuiz";
import { useGlobalStore } from "../store";
import Result from "../pages/Result";

const resultLoader = () => {
  const questionsList = useGlobalStore.getState().questionList;
  if (
    questionsList.length === 0 ||
    questionsList.some((item) => !item.selected_answer)
  ) {
    return redirect("/");
  }
  return null;
};

const appRouter = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      id: "main",
      path: "/",
      errorElement: <ErrorBoundary />,
      loader: getCategoryList,
      children: [
        {
          index: true,
          element: <CreateQuiz />,
        },
        {
          path: "result",
          element: <Result />,
          loader: resultLoader,
        },
      ],
    },
  ],
  {
    basename: "/quiz-app",
  }
);

export default appRouter;
