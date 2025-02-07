import { Outlet } from "react-router-dom";
import DashboardBar from "./DashboardBar";
import { DashboardLayoutContainer } from "./DashboardLayout.styles";
import DashboardSideBar from "./DashboardSideBar";

const DashboardLayout = () => {
  return (
    <DashboardLayoutContainer>
      <DashboardSideBar />
      <DashboardBar />
      <Outlet />
    </DashboardLayoutContainer>
  );
};

export default DashboardLayout;
