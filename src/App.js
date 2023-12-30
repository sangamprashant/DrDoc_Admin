import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import { EmailResponse, Home, SideNav } from "./components";

function App() {
  return (
    <BrowserRouter>
      <SideNav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mail/:type" element={<EmailResponse/>} />
        </Routes>
      </SideNav>
    </BrowserRouter>
  );
}

export default App;
