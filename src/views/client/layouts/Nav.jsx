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

  const handleGoCollection = () => {
    navigate(`/profile/user/${userSession?._id}/collections`);
  };

  const handleSignOut = async () => {
    const callHandleSignOut = async () => {
      try {
        const response = await AuthService.doUserSignOut();
        if (response) {
          return response;
        } else {
          throw new Error("Sign Out Failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    toast
      .promise(
        new Promise((resolve) =>
          setTimeout(() => resolve(callHandleSignOut()), 1500)
        ),
        {
          loading: "Loading...",
          success: "Sign In Successfully",
          error: "An error occurred during sign in",
        }
      )
      .then((result) => {
        if (result) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="" width={140} />
          </a>
          <form className="d-flex gap-3">
            <button
              className="btn btn-transparent rounded-5 fw-semibold"
              type="submit"
              onClick={handleGoCollection}
            >
              My Collections
            </button>
            <button
              className="btn btn-transparent rounded-5 fw-semibold"
              type="submit"
            >
              About
            </button>
            <NavDropdown
              title={
                <i className="fa-solid fa-circle-user fs-33 mt-1 ms-2 text-gray"></i>
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
