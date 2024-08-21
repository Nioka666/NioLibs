/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from "swr";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../utils/functions";
import signUpCharacter from "../../assets/signup_character.png";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  
  const { data: userSession } = useSWR(
    "checkUserSession",
    () => AuthService.checkUserSessionStatus(),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (userSession !== undefined) {
      navigate("/");
    }
  });

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
          throw new Error("Invalid email or password");
        }
      } catch (error) {
        setIsSignedIn(false);
        throw error;
      }
    };

    toast
      .promise(
        new Promise((resolve) => setTimeout(() => resolve(callSignIn()), 1500)),
        {
          loading: "Loading...",
          success: "Sign In Successfully",
          error: "An error occurred during sign in",
        }
      )
      .then((result) => {
        if (result) {
          navigate("/");
          window.location.reload();
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      <section className="sign-in-form">
        <h2 className="fw-bold text-ijo">Sign In, Please</h2>
        <h5
          className="text-gray"
          style={{ marginTop: "-35px", fontSize: "17px" }}
        >
          Please sign in for get many privilleges
        </h5>
        <form onSubmit={handleSignIn}>
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
            Sign In
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

export default SignIn;
