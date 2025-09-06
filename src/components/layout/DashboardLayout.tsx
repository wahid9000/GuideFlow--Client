import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <p>This is Dashboard Layout</p>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
