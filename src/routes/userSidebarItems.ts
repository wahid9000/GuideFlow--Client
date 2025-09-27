import { lazy } from "react";
const MyBookings = lazy(() => import("@/pages/User/MyBookings"));
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Booking History",
    items: [
      {
        title: "My Bookings",
        url: "/user/my-bookings",
        component: MyBookings,
      },
    ],
  },
];
