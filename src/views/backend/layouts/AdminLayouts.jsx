import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNav from "./Nav";
import useSWR from "swr";
import { AuthService } from "../../../utils/functions";
import { useEffect, useState } from "react";
import LineProgress from "../../client/components/LineProgress";

function AdminLayouts() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { data: adminDetails } = useSWR(
    "fetchAdminDetails",
    () => AuthService.checkAdminSession(),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      <style>
        {`
        body {
          background-color: #f0f0f0;
          margin: 0;
        }
        `}
      </style>
      {loading && <LineProgress />}
      <div className="d-flex" style={{ gap: "100px" }}>
        <AdminNav />
        <Sidebar />
        <div className="container main-backend">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayouts;
