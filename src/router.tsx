import { createHashRouter } from "react-router-dom";
import HomePage from "./pages/home";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
