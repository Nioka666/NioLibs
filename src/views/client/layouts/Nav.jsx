import { useEffect, useState } from "react";
import { AuthService } from "../../../utils/functions";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Logo from "/src/assets/NLibs.png";
import toast, { Toaster } from "react-hot-toast";
import { NavDropdown } from "react-bootstrap";
import useSWR from "swr";

function Nav() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { data: userSession } = useSWR(
    "fetchUserSession",
    () => AuthService.checkUserSession(),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (userSession !== undefined) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [userSession, navigate]);

  const handleSignOut = async () => {
    try {
      const response = await AuthService.doUserSignOut();
      if (response) {
        await toast.promise(
          new Promise((resolve) => {
            setTimeout(() => resolve(response), 2000);
          }),
          {
            loading: "Loading...",
            success: "Sign In Successfully",
            error: "An error occurred during sign in",
          }
        );
        window.location.reload();
      } else {
        toast.error("Sign Out Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={Logo} alt="" width={150} />
          </a>
          <form className="d-flex gap-2">
            <button
              className="btn btn-transparent rounded-5 fw-bold"
              type="submit"
            >
              Catalogs
            </button>
            <button
              className="btn btn-transparent rounded-5 fw-bold"
              type="submit"
            >
              About
            </button>
            <NavDropdown
              title={
                <i className="fa-solid fa-circle-user fs-30 mt-1 ms-3 text-gray"></i>
              }
              id="navbar-dropdown"
            >
              {isSignedIn && (
                <>
                  <NavDropdown.Item href={`/profile/user/${userSession?._id}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="text-danger"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </NavDropdown.Item>
                </>
              )}
              {!isSignedIn && (
                <>
                  <NavDropdown.Item href="/auth/sign-in">
                    Sign In
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/auth/sign-up">
                    Sign Up
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Nav;
