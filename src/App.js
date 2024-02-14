import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import {
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

function App() {
  const [token, setToken] = React.useState(sessionStorage.getItem("token"));
  const [isLogged, setIsLogged] = React.useState(token ? true : false);
  const [user, setUser] = React.useState(null);

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
        }}
      >
        {isLogged ? (
          <SideNav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mail/:type" element={<EmailResponse />} />
              <Route path="/:userType/:type" element={<EmployeeMain />} />
              <Route path="/employee/view/:id" element={<EmployeeView />} />
            </Routes>
          </SideNav>
        ) : (
          <Login setIsLogged={setIsLogged} />
        )}
        <ToastContainer theme="dark" />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
