import { useEffect, useState } from "react";

function NavNotif() {
  const [isClose, setIsClose] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sidebar = document.getElementById("nav-notif");
      if (scrollPosition > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navNotifStyle = {
    position: isScrolled ? "fixed" : "absolute",
    top: isScrolled ? "0" : "",
    zIndex: isScrolled ? "3" : "3",
  };

  const handleClose = () => {
    setIsClose(true);
  };

  if (isClose === false) {
    return (
      <>
        <nav className="nav-notif" id="nav-notif" style={navNotifStyle}>
          <h6 className="text-lights fw-bold mt-2">Alerts mssg here . . .</h6>
          <button
            className="bg-transparent border-0 fw-bold p-0"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </nav>
      </>
    );
  } else if (isClose === true) {
    return <></>;
  }
}

export default NavNotif;
