import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import useSWR from "swr";
import LoginHero from "./components/LoginHero";
import CategoriesRow from "./components/CategoriesRow";
import Catalogue from "./components/Catalogue";
import toast, { Toaster } from "react-hot-toast";
import { AuthService } from "../../utils/functions";
import MidCarousel from "./components/MidCarousel";

function Dashboard() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { data: userSession } = useSWR(
    "fetchUserSession",
    () => AuthService.checkUserSession(),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (userSession) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [userSession]);

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
      <div className="container niolibs-dash" id="niolibs-hero">
        <Hero />
        <div className="container niolibs-category">
          <CategoriesRow />
        </div>
      </div>
      <Catalogue />
      <MidCarousel />
      <Catalogue />
      {isSignedIn === false && <LoginHero />}
    </>
  );
}

export default Dashboard;
