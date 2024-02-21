import useSWR from "swr";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../utils/functions";
import signUpCharacter from "../../assets/signup_character.png";

function BackSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const { data: userSession } = useSWR(
    "fetchUserSession",
    () => AuthService.checkAdminSession(),
    { revalidateOnFocus: true }
  );

  useEffect(() => {
    if (userSession) {
      setIsSignedIn(true);
      navigate("/admin/");
    } else {
      setIsSignedIn(false);
    }
  }, [userSession, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.doAdminSignIn(email, password);
      if (response?.status === 200) {
        setIsSignedIn(true);
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
      } else if (response?.status !== 200) {
        toast.error("Invalid email or password. Please try again.");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error("An error occurred during sign in");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <>
      <section className="sign-in-form">
        <h2 className="fw-bold text-ijo">Sign In, Please</h2>
        <h5
          className="text-gray"
          style={{ marginTop: "-35px", fontSize: "17px" }}
        >
          Please sign in be an Administrators
        </h5>
        <form
          onSubmit={handleSignIn}
          method="POST"
          encType="multipart/form-data"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
              style={{
                backgroundColor: "white",
                border: "2px solid gray",
                cursor: "pointer",
              }}
            />
            <label
              className="form-check-label text-gray"
              htmlFor="flexCheckDefault"
              style={{ fontSize: "15px" }}
            >
              I agree the Terms and Conditions
            </label>
          </div>
          <button type="submit" className="bg-ijo rounded-4">
            Sign Up
          </button>
          <center>
            <h6 className="mt-4 text-gray">
              Didn't have an account?
              <a className="text-ijo" href="/auth/sign-up">
                <b> Sign Up</b>
              </a>
            </h6>
          </center>
        </form>
      </section>
      <section>
        <figure>
          <img src={signUpCharacter} alt="" width={550} />
        </figure>
      </section>
    </>
  );
}

export default BackSignIn;
