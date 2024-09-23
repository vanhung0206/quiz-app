import { Outlet } from "react-router-dom";

const mainStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
};

const MainLayout = () => {
  return (
    <main style={mainStyle}>
      <Outlet />
    </main>
  );
};

export default MainLayout;
