import { AuthService } from "../../../utils/functions";
import toast, { Toaster } from "react-hot-toast";

function Footer() {
  const handleSignOut = async () => {
    try {
      const response = await AuthService.doUserSignOut();
      if (response?.status === 200) {
        await toast.promise(
          new Promise((resolve) => {
            setTimeout(() => resolve(response), 2000);
          }),
          {
            loading: "Logging Out...",
            success: "Sign Out Successfully",
            error: "An error occurred during sign in",
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else if (response?.status !== 200) {
        toast.error("Sign Out Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <footer className="container py-3 mt-5">
        <div className="row">
          <div className="col-6 col-md">
            <h5>Navigation</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  New Updates
                </a>
              </li>
              <li>
                <a
                  className="link-secondary text-decoration-none"
                  href="/search"
                >
                  Browse
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>NioLibs</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Help/FAQ
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  License
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Account</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a
                  className="link-secondary text-decoration-none"
                  href="/account"
                >
                  My Profiles
                </a>
              </li>
              <li>
                <a
                  className="link-secondary text-decoration-none"
                  href="#"
                  onClick={() => handleSignOut()}
                >
                  Log out
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Connect with us</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Contact Developer
                </a>
              </li>
              <li>
                <a className="link-secondary text-decoration-none" href="#">
                  Our Social Media
                </a>
              </li>
            </ul>
          </div>
        </div>
        <br />
        <hr />
        <h6 className="text-lights">&copy; 2023 Nioka666.</h6>
      </footer>
    </>
  );
}

export default Footer;
