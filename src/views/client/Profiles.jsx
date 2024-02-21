/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AuthService } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import greenBg from "/assets/green_bg.jpg";
import avatar from "/assets/mario_avatar.png";
import useSWR from "swr";
import LineProgress from "./components/LineProgress";

function Profiles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { data: userSession, isValidating } = useSWR(
    "fetchUserSession",
    () => AuthService.checkUserSession(),
    { revalidateOnFocus: true }
  );

  const checkUserSession = () => {
    return userSession !== undefined && userSession !== null;
  };

  useEffect(() => {
    if (!isValidating && !checkUserSession()) {
      navigate("/");
    }
  }, [navigate, isValidating, userSession, checkUserSession]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {!loading && (
        <div className="container profile-container">
          <div className="bg-profile">
            <img src={greenBg} alt="" />
            <img className="avatar-profile" src={avatar} alt="" />
          </div>

          <div className="user-identity">
            <div className="username">
              <h3 className="fw-bold h-25">{userSession?.username}</h3>
              <h5
                className="fw-bold text-lightgray"
                style={{ marginTop: "-12px" }}
              >
                Rajin membaca
              </h5>
            </div>
          </div>

          <div className="profile-body">
            <section className="side-menu">
              <ul>
                <li>Account Details</li>
                <li>Collecetions</li>
                <li>History</li>
                <li className="text-danger">Sign Out</li>
              </ul>
            </section>
            <section className="contents"></section>
          </div>
        </div>
      )}
    </>
  );
}

export default Profiles;
