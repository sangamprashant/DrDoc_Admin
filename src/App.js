import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import {
  EmailResponse,
  EmployeeMain,
  EmployeeView,
  Home,
  Login,
  SideNav,
} from "./components";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLogged, setIsLogged] = useState(sessionStorage.getItem("token")?true:false);
  return (
    <BrowserRouter>
      {isLogged ? (
        <SideNav setIsLogged={setIsLogged}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mail/:type" element={<EmailResponse />} />
            <Route path="/employee/:type" element={<EmployeeMain />} />
            <Route path="/employee/view/:id" element={<EmployeeView />} />
          </Routes>
        </SideNav>
      ) : (
        <Login setIsLogged={setIsLogged} />
      )}
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default App;
