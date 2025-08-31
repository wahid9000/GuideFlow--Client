import App from "@/App";
import AAbout from "@/pages/AAbout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: AAbout,
      },
    ],
  },
]);
