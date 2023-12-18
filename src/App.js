import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import { Home, SideNav, TopNav } from "./components";

function App() {
  return (
    <BrowserRouter>
      <SideNav>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </SideNav>
    </BrowserRouter>
  );
}

export default App;
