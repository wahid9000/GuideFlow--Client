import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: AboutUs,
      },
    ],
  },
]);
