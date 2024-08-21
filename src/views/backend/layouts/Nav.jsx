import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertConfirmDialog } from "../../reusable/Modals";
import useSWR from "swr";
import { AuthService } from "../../../utils/functions";
import axios from "axios";
import { BACKEND_HOST } from "../../../utils/client_env";

function AdminNav() {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data: adminDetails } = useSWR(
    "fetchAdminDetails",
    () => AuthService.checkAdminSession(),
    { revalidateOnFocus: false }
  );

  const handleLogout = async () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmLogout = async (isConfirmed) => {
    if (isConfirmed) {
      console.log("OK clicked");
      try {
        const response = await axios.post(
          `${BACKEND_HOST}/api/admin-sign-out`,
          null,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        // navigate("/auth/admin-portals");
        // window.location.reload();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        handleCloseDialog();
      }
    } else {
      console.log("no");
      handleCloseDialog();
    }
  };

  return (
    <>
      <nav
        id="nav"
        className="navbar navbar-expand-lg text-white"
        style={{
          width: "75%",
          borderRadius: "19px",
          padding: "0 15px 0 70px",
          position: "absolute",
          height: "75px",
          margin: "17px 0 0 295px",
        }}
      >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex"
            id="navbarTogglerDemo02"
          >
            <AlertConfirmDialog
              openDialog={isDialogOpen}
              handleCloseDialog={handleCloseDialog}
              handleConfirm={handleConfirmLogout}
              headerMessageConfirmDialog={"Confirm for Sign Out ?"}
              messageConfirmDialog={
                "By Sign Out as Admin, you have been to sign in agian"
              }
            />
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold mt-1"
              style={{ marginLeft: "80px" }}
            >
              <li className="nav-item">
                <form
                  className="d-flex mt-3 mt-lg-0"
                  role="search"
                  style={{ marginLeft: "-140px" }}
                >
                  <div
                    className="input-group search-input-wrapper"
                    style={{ marginTop: "3.5px" }}
                  >
                    <input
                      className="form-control admin-nav-search"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      style={{
                        borderRadius: "14px 0 0 14px",
                        border: "none",
                      }}
                      disabled
                    />
                    <button
                      className="btn"
                      type="button"
                      style={{
                        borderRadius: "0 14px 14px 0",
                        color: "black",
                        border: "none",
                      }}
                    >
                      <i
                        className="fa-solid fa-magnifying-glass font-nav-icon text-black"
                        style={{ fontSize: "14px" }}
                      ></i>
                    </button>
                  </div>
                </form>
              </li>
              <div
                className="ligroup d-flex gap-3"
                style={{ marginLeft: "600px" }}
              >
                <li
                  className="nav-item dropstart"
                  style={{ marginTop: "-8px" }}
                >
                  <a
                    className="nav-link dropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginTop: "1px" }}
                  >
                    <i className="fa-solid fa-bell fs-4 mt-2"></i>
                  </a>
                </li>
                <li
                  className="nav-item dropstart"
                  style={{ marginTop: "-8px" }}
                >
                  <a
                    className="nav-link dropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginTop: "1px" }}
                  >
                    <img
                      src={"/assets/mario_avatar.png"}
                      alt=""
                      width="40"
                      height="40"
                      className="rounded-circle"
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark text-lights"
                    style={{
                      position: "absolute",
                      top: "50px",
                      right: "-10px",
                    }}
                  >
                    <li style={{ height: "70px", padding: "10px 0 0 0" }}>
                      <span className="p-4">{adminDetails?.nama_lengkap}</span>
                      <br />
                      <span
                        className="p-4 text-gray"
                        style={{ fontSize: "13px" }}
                      >
                        {adminDetails?.email}
                      </span>
                    </li>
                    <li className="ps-1">
                      <a
                        className="dropdown-item text-lights"
                        href="#"
                        onClick={handleLogout}
                      >
                        <i
                          className="fa-solid fa-arrow-right-to-bracket"
                          style={{
                            transform: "rotate(180deg)",
                            color: "#cf0000",
                          }}
                        ></i>
                        <span
                          className="ms-2 fw-semibold"
                          style={{ color: "#cf0000", fontSize: "15px" }}
                        >
                          Sign out
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNav;
