import { Outlet, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import LineProgress from "../components/LineProgress";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AuthService } from "../../../utils/functions";

function AuthLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          style: {
            background: "#fffff",
            color: "black",
          },

          success: {
            duration: 2500,
          },
          error: {
            duration: 2500,
          },
        }}
      />
      {loading && <LineProgress />}
      {!loading && (
        <>
          <div className="container auth-container">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default AuthLayout;
