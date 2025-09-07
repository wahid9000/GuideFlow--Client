import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const Tours = lazy(() => import("@/pages/Admin/Tours"));
const TourTypes = lazy(() => import("@/pages/Admin/TourTypes"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Tour Types",
        url: "/admin/tour-types",
        component: TourTypes,
      },
      {
        title: "Tours",
        url: "/admin/tours",
        component: Tours,
      },
    ],
  },
];
