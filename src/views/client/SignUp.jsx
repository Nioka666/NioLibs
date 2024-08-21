import useSWR from "swr";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../utils/functions";
import signUpCharacter from "../../assets/signup_character.png";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setRegistered] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.preventDefault();

    const callRegists = async () => {
      try {
        setLoadingBtn(true);
        const response = await AuthService.doUserRegister(
          username,
          email,
          password
        );

        if (response?.status === 200) {
          setRegistered(true);
          return response;
        } else {
          setRegistered(false);
          throw new Error("Register Failed");
        }
      } catch (error) {
        setRegistered(false);
        throw error;
      }
    };

    toast
      .promise(
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(callRegists());
          }, 1500)
        ),
        {
          loading: "Loading...",
          success: "Sign In Successfully",
          error: "An error occurred during sign in",
        }
      )
      .then((result) => {
        if (result) {
          navigate("/auth/sign-in");
          // window.location.reload();
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
      <section className="sign-in-form">
        <h2 className="fw-bold text-ijo">Sign Up, Please</h2>
        <h5
          className="text-gray"
          style={{ marginTop: "-10px", fontSize: "17px" }}
        >
          Please sign up for get many privilleges
        </h5>
        <form
          onSubmit={handleRegister}
          method="POST"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
              Have an account?
              <a className="text-ijo" href="/auth/sign-in">
                <b> Sign in</b>
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

export default SignUp;
