import React from "react";
import Welcome from "./Welcome";
import Transictions from "./Transictions/Transictions";
import "./Home.css";
import CashFlow from "./CashFlow";
import HomeEmployee from "./HomeEmployee";
function Home() {
  return (
    <div className="row">
      <Welcome />
      <Transictions />
      <CashFlow />
      <HomeEmployee />
    </div>
  );
}

export default Home;
