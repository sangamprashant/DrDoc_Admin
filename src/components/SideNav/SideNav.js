import React from "react";
import { Protection } from "../../assets/images";
import "./Sidenav.css";
import { menuItems } from "./Content";
import { Link, useLocation } from "react-router-dom";
import { LogoutIcon } from "../Icons/Icons";

function SideNav({ children, setIsLogged}) {
  const location = useLocation();

  const handelLogout = () => {
    sessionStorage.removeItem("token")
    setIsLogged(false)
  }

  return (
    <div className="d-flex">
      <aside
        className="text-dark"
        style={{
          width: "300px",
          height: "100vh",
          overflowY: "auto",
          position: "fixed",
        }}
      >
        <div className="d-flex flex-column align-items-center p-0">
          <figure className="d-flex align-items-center">
            <img height="70" src={Protection} alt="" className="mr-2" />
            <h1 className="fw-bolder">Admin</h1>
          </figure>
          <ul className="side-menu-option mt-1">
            {menuItems.map((item) => (
              <React.Fragment key={item.id}>
                <p>{item.title}</p>
                {item.items.map((link) => (
                  <Link
                    key={link.id}
                    className={`p-2 ${
                      link.link === "/"
                        ? location.pathname === link.link
                        : location.pathname.includes(link.link)
                        ? "active"
                        : ""
                    }`}
                    to={link.link}
                  >
                    {link.icon} {link.text}
                  </Link>
                ))}
              </React.Fragment>
            ))}
            <p>Account</p>
            <Link
              className={`p-2 text-danger`}
              onClick={handelLogout}
              to={"/"}
            >
              <LogoutIcon/> Logout
            </Link>
          </ul>
        </div>
      </aside>
      <div className="p-5" style={{ marginLeft: "300px", flexGrow: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default SideNav;
