import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
