import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import {
  Clients,
  DoctorProfile,
  EmailResponse,
  EmployeeMain,
  EmployeeView,
  Home,
  Login,
  SellerMain,
  SideNav,
} from "./components";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_API } from "./config";
import { AppContext } from "./AppContext";
import "component-craftsman/css";
import { Modal } from "antd";

function App() {
  const [token, setToken] = React.useState(sessionStorage.getItem("token"));
  const [isLogged, setIsLogged] = React.useState(token ? true : false);
  const [user, setUser] = React.useState(null);
  // model
  const [modal2Open, setModal2Open] = React.useState(false);
  const [modelType, setModelType] = React.useState("error");
  const [modelMessage, setModelMessgae] = React.useState(null);
  const getModalColor = () => {
    switch (modelType) {
      case "Warning":
        return "orange";
      case "Error":
        return "red";
      case "Success":
        return "green";
      default:
        return "blue";
    }
  };

  React.useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_API}/common/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        if (!response?.data?.user?.isAdmin && !response?.data?.user?.isDoctor) {
          toast.error("only admin and doctor are allowed to login");
          setIsLogged(false);
          sessionStorage.clear();
        }
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("failed to fetch the user data:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          token,
          setToken,
          isLogged,
          setIsLogged,
          user,
          setUser,
          setModal2Open,
          setModelType,
          setModelMessgae,
        }}
      >
        {isLogged ? (
          <SideNav>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* admin */}
              <Route path="/mail/:type" element={<EmailResponse />} />
              <Route path="/:userType/:type" element={<EmployeeMain />} />
              <Route path="/employee/view/:id" element={<EmployeeView />} />
              {/* doctor */}
              <Route path="/doctor/my/profile" element={<DoctorProfile />} />
              <Route path="/doctor/my/clients" element={<Clients />} />
              <Route path="/doctor/my/clients/chats" element={<DoctorProfile />} />
            </Routes>
          </SideNav>
        ) : (
          <Login setIsLogged={setIsLogged} />
        )}
        <ToastContainer theme="dark" />
        <Modal
          title={modelType}
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
          style={{ color: getModalColor() }}
        >
          {modelMessage}
        </Modal>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
