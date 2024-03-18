import React from "react";
import { Protection } from "../../assets/images";
import "./Sidenav.css";
import { menuItemsAdmin, menuItemsDoctor } from "./Content";
import { Link, useLocation } from "react-router-dom";
import { LogoutIcon } from "../Icons/Icons";
import { AppContext } from "../../AppContext";
import Modal from "../Modal";

function SideNav({ children }) {
  const { token, setToken, isLogged, setIsLogged, user, setUser } =
    React.useContext(AppContext);
  const location = useLocation();
  const [type, setType] = React.useState("doctor");
  const [menuItems, setMenuItems] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handelLogout = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
  };

  React.useEffect(() => {
    setType(user?.isAdmin ? "admin" : "doctor");
    setMenuItems(user?.isAdmin ? menuItemsAdmin : menuItemsDoctor);
  }, [user]);

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
            <h1 className="fw-bolder">{type}</h1>
          </figure>
          <ul className="side-menu-option mt-1">
            {menuItems?.map((item) => (
              <React.Fragment key={item.title}>
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
            <Link className={`p-2 text-danger`} onClick={() => setModalOpen(true)} to={"/"}>
              <LogoutIcon /> Logout
            </Link>
          </ul>
        </div>
      </aside>
      <div className="p-5" style={{ marginLeft: "300px", flexGrow: 1 }}>
        {children}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Are you sure to logout?</h2>
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-success" onClick={handelLogout}>LOGOUT</button>
          <button className="btn btn-primary" onClick={() => setModalOpen(false)}>CANCEL</button>
        </div>
      </Modal>
    </div>
  );
}

export default SideNav;
