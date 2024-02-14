import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllUserByType } from "../../../apiCall";
import UserTable from "../Common/UserTable";

function EmployeeMain() {
  const { userType, type } = useParams();
  const navigate = useNavigate();
  const [DoctorData, setDoctorData] = useState([]);

  useEffect(() => {
    if (type !== "all" && type !== "application") {
      navigate("./page=notfound");
    }
  }, [type, navigate]);

  useEffect(() => {
    if (type === "all" || type === "application") {
      setDoctorData([]);
      fetchAllUserByType(setDoctorData, userType);
    }
  }, [userType]);

  const renderingComponent = () => {
    switch (type) {
      case "all":
        return <UserTable DoctorData={DoctorData} />;
      // case "application":
      //   return <EmployeeAdd />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-5">
        <h1 className="text-center text-capitalize">
          {type} {userType}
        </h1>
        {renderingComponent()}
      </div>
    </>
  );
}

export default EmployeeMain;
