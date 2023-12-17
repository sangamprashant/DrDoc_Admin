import React from "react";
import TopNav from "../TopNav";
import { Protection } from "../../assets/images";
import "./Sidenav.css";

function SideNav() {

  const menuItems = [
    {
      title: "",
      items: [
        { id: 1, text: "Dashboard", link: "#" },
        { id: 2, text: "State", link: "#" },
        { id: 3, text: "Graph", link: "#" },
      ],
    },
    {
      title: "Email",
      items: [
        { id: 10, text: "All Response", link: "#" },
        { id: 3, text: "Pending", link: "#" },
        { id: 2, text: "Responded", link: "#" },
      ],
    },
    {
      title: "Message",
      items: [
        { id: 10, text: "All Response", link: "#" },
        { id: 3, text: "Pending", link: "#" },
        { id: 2, text: "Responded", link: "#" },
      ],
    },
    {
      title: "Payment",
      items: [
        { id: 17, text: "Received", link: "#" },
        { id: 2, text: "Failed", link: "#" },
        { id: 3, text: "Confirmed", link: "#" },
        { id: 3, text: "Refund", link: "#" },
      ],
    },
  ];

  return (
    <aside
      className="text-dark"
      style={{
        width: "250px",
        height: "100vh",
        overflowY: "auto",
        position: "fixed",
        display:"flex"
        
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
                  <a href={link.link}>{link.text}</a>
                </li>
              ))}
            </>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideNav;
