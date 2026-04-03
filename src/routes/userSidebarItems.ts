import { lazy } from "react";
const MyBookings = lazy(() => import("@/pages/User/MyBookings"));
const Profile = lazy(() => import("@/pages/User/Profile"));
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Account",
    items: [
      {
        title: "My Profile",
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
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
