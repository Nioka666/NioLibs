import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import Sidebar from "./Sidebars";
import NavNotif from "../components/NavNotif";
import { useEffect, useState } from "react";
import LineProgress from "../components/LineProgress";

function MainLayout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {loading && <LineProgress />}
      <Nav />
      <NavNotif />
      <main>
        <div className="niolibs-main bg-white" key={"niolibs-main"}>
          {isHomePage && (
            <section className="niolibs-sidebar">
              <Sidebar />
            </section>
          )}
          <section className="content">
            <Outlet />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
