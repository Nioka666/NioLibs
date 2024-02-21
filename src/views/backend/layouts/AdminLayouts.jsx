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
      <AdminNav />
      <Sidebar />
      {loading && <LineProgress />}
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayouts;
