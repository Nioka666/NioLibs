import { Link } from "react-router-dom";
import "../style/backend_style.css";
import Logo from "/assets/NLibs.png";

function Sidebar() {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      target: "dashboard",
      icon: "fa-solid fa-gauge-high me-2 ",
    },
    {
      id: "officers",
      label: "Officers",
      target: "officers",
      icon: "fa-solid fa-money-bills me-2",
    },
    {
      id: "members-data",
      label: "Members",
      target: "members-data",
      icon: "fa-regular fa-id-badge me-2",
    },
    {
      id: "book-list",
      label: "Books",
      target: "books-list",
      icon: "fa-regular fa-address-book me-2",
    },
    {
      id: "borrowings-data",
      label: "Borrowings",
      target: "borrowings-data",
      icon: "fa-regular fa-address-book me-2",
    },
  ];

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-2 aside"
        style={{
          width: "260px",
          minHeight: "100vh",
          height: "auto",
          position: "fixed",
          borderRadius: "0 20px 20px 0",
        }}
      >
        <div className="sidebar-head text-center d-grid">
          <a className="admin-navbar-brand" href="/admin/dashboard">
            <img src={Logo} height="38px" />
          </a>
          <span
            className="mt-2 text-gray fw-semibold"
            style={{ fontSize: "13px" }}
          >
            ADMIN DESK
          </span>
        </div>
        <ul className="nav nav-pills flex-column mb-auto nav-padding mt-5">
          {menuItems.map((menuItem) => (
            <li key={menuItem.id} className="nav-item">
              <Link
                reloadDocument
                to={menuItem.target}
                className={`nav-link nav-link-admin text-darkgrays fw-semibold`}
              >
                <i className={`${menuItem.icon} fs-5 ms-3`}></i>
                {menuItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
