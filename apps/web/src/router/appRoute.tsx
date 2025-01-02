/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { withProtectedPage } from "../components/withProtectedPage";
import { Builder } from "../pages/Builder";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Signup } from "../pages/Signup";
import { BuilderLayout } from "../components/Builder/Layout";
import { AuthLayout } from "../components/Auth/Layout";
import { AppLayout } from "../components/AppLayout";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/signup", element: <Signup /> },
    ],
  },
  {
    path: "/builder",
    element: <BuilderLayout />,
    children: [{ path: "/builder", element: <Builder /> }],
  },
];

const createProtectedRoutes = (routes: any): RouteObject[] => {
  return routes.map((route: any) => {
    if (!route.element) return route;

    const WrappedComponent = withProtectedPage(route.element.type);
    return {
      ...route,
      element: <WrappedComponent />,
    };
  });
};

export const router = createBrowserRouter(createProtectedRoutes(routes));
