import { createBrowserRouter, RouteObject } from "react-router-dom";
import { withProtectedPage } from "../components/withProtectedPage";
import { ChatBuilder, FlowBuilder } from "../pages/Builder";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";
import { Signup } from "../pages/Signup";
import { BuilderLayout } from "../components/Builder/Layout";
import { AuthLayout } from "../components/Auth/Layout";
import { AppLayout } from "../components/AppLayout";
import { DashboardLayout } from "../pages/Dashboard/Layout.tsx";
import { EndUserChat } from "../pages/EnduUerChat/EndUserChat.tsx";

type AppRouteObject = RouteObject & {
  children?: AppRouteObject[];
  element?: React.ReactElement;
};

const routes: AppRouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
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
    children: [
      { path: "/builder/flow/:id", element: <FlowBuilder /> },
      { path: "/builder/chat/:id", element: <ChatBuilder /> },
    ],
  },
  {
    path: "/chat/:chatbotId",
    element: <EndUserChat />,
  },
];

const createProtectedRoutes = (routes: AppRouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    if (!route.element) return route;

    const elementType = route.element.type;
    if (typeof elementType === "function" || typeof elementType === "object") {
      const WrappedComponent = withProtectedPage(elementType);
      const { children, ...routeWithoutChildren } = route;
      return {
        ...routeWithoutChildren,
        element: <WrappedComponent />,
        children: children ? createProtectedRoutes(children) : undefined,
        index: route.index || undefined,
      } as RouteObject;
    }
    return route;
  });
};

export const router = createBrowserRouter(createProtectedRoutes(routes));
