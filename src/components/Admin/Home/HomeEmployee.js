import React, { useEffect, useState } from "react";
import UserTable from "../Common/UserTable";
// import { fetchAllEmployees } from "../EmployeeList/ApiCallEmployee";

function HomeEmployee() {
  const [EmployeeData, setEmployeeData] = useState([]);

  // useEffect(()=>{
  //   fetchAllEmployees(setEmployeeData)
  // },[])

  return <UserTable EmployeeData={EmployeeData} />;
}

export default HomeEmployee;
