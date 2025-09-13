import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="grow-1 px-4 container mx-auto">{children}</div>
      <Footer></Footer>
    </div>
  );
}
