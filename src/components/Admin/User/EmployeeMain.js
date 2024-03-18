import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllUserByType } from "../../../apiCall";
import UserTable from "../Common/UserTable";
import Application from "./Application";
import { Loading } from "component-craftsman";

function EmployeeMain() {
  const { userType, type } = useParams();
  const navigate = useNavigate();
  const [DoctorData, setDoctorData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (type !== "all" && type !== "application") {
      navigate("./page=notfound");
    }
  }, [type, navigate]);

  useEffect(() => {
    if (type === "all" || type === "application") {
      setDoctorData([]);
      fetchAllUserByType(setDoctorData, userType, setIsLoading);
    }
  }, [userType]);

  const renderingComponent = () => {
    switch (type) {
      case "all":
        return <UserTable DoctorData={DoctorData} />;
      case "application":
        return <Application userType={userType} setIsLoading={setIsLoading} />;
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
        {isLoading ? (
          <div className=" d-flex justify-content-center">
            <Loading loading={6} />
          </div>
        ) : (
          <>{renderingComponent()}</>
        )}
      </div>
    </>
  );
}

export default EmployeeMain;
