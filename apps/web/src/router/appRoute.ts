import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";
import { Builder } from "../pages/Builder";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/builder",
    Component: Builder,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
