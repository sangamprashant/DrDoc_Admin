import React from "react";
import { Protection } from "../../assets/images";
import "./Sidenav.css";
import { menuItems } from "./Content";

function SideNav({ children }) {
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
              <>
                <p>{item.title}</p>
                {item.items.map((link) => (
                  <li
                    key={link.id}
                    className={`p-2 ${link.id === 1 ? "active" : ""}`}
                  >
                    <a href={link.link}>
                      {link.icon} {link.text}
                    </a>
                  </li>
                ))}
              </>
            ))}
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
