import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeDelete from "./EmployeeDelete";
import EmployeeAdd from "./EmployeeAdd";
import EmployeePost from "./EmployeePost";
import axios from "axios";
import { fetchAllEmployees } from "./ApiCallEmployee";

function EmployeeMain() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [EmployeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    if (type !== "all" && type !== "add" && type !== "delete" && type !=="post") {
      navigate("./page=notfound");
    }
  }, [type, navigate]);

  useEffect(() => {
    if (type === "all" || type === "add" || type === "delete" || type ==="post") {
      fetchAllEmployees(setEmployeeData)
    }
  }, []);




  const renderingComponent = () => {
    switch (type) {
      case "all":
        return <Employee EmployeeData={EmployeeData} />;
      case "add":
        return <EmployeeAdd />;
      case "delete":
        return <EmployeeDelete />;
      case "post":
        return <EmployeePost />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-5">
        <h1 className="text-center text-capitalize">{type} employee</h1>
        {renderingComponent()}
      </div>
    </>
  );
}

export default EmployeeMain;
