import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AboutUs from "@/pages/AboutUs";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import Verify from "@/pages/Authentication/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Tours from "@/pages/User/Tours";
import HomePage from "@/pages/User/HomePage";
import TourDetails from "@/pages/User/TourDetails";
import Bookings from "@/pages/User/Bookings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "about",
        Component: withAuth(AboutUs),
      },
      {
        path: "tours",
        Component: withAuth(Tours),
      },
      {
        path: "tours/:slug",
        Component: withAuth(TourDetails),
      },
      {
        path: "booking/:slug",
        Component: withAuth(Bookings),
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
