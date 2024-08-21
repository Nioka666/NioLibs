import { Outlet } from "react-router-dom";

function Histories() {
  return (
    <>
      <div className="container">
        <div className="row history-row d-flex">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Histories;
