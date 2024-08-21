import { useState } from "react";
import { AuthService } from "../../../utils/functions";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginHero() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const callSignIn = async () => {
      try {
        const response = await AuthService.doUserSignIn(email, password);
        if (response?.status === 200) {
          setIsSignedIn(true);
          return response;
        } else if (response?.status !== 200) {
          setIsSignedIn(false);
          throw new Error("Sign In failed");
        }
      } catch (error) {
        setIsSignedIn(false);
        throw new error();
      }
    };

    toast
      .promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(callSignIn());
          }, 1500);
        }),
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
      <div className="container-login-dash">
        <div className="row align-items-center g-lg-5 py-5 d-flex">
          <div className="col-md-10 mx-auto col-lg-5">
            <form
              className="p-4 p-md-5 border-0 rounded-4 bg-light"
              method="POST"
              onSubmit={handleSignIn}
              encType="multipart/form-data"
            >
              <div className="form-floating mb-3 mt-2">
                <input
                  type="email"
                  className="form-control rounded-4"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-4"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="checkbox mb-3">
                {/* <input type="checkbox" value="remember-me" /> */}
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
              <button
                className="w-100 btn btn-lg btn-success fw-semibold mb-4"
                type="submit"
              >
                Sign in
              </button>
              <center>
                <small className="text-body-secondary text-center">
                  By clicking Sign up, you agree to the terms of use.
                  <br />
                  Have not account?{" "}
                  <Link to={"/auth/sign-up"}>
                    <b>Sign Up</b>{" "}
                  </Link>
                </small>
              </center>
            </form>
          </div>
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              Hero sign-in form
            </h1>
            <p className="col-lg-10 fs-5">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginHero;
