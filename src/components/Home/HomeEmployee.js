import React, { useEffect, useState } from "react";
import Employee from "../EmployeeList/Employee";
import { fetchAllEmployees } from "../EmployeeList/ApiCallEmployee";

function HomeEmployee() {
  const [EmployeeData, setEmployeeData] = useState([]);

  useEffect(()=>{
    fetchAllEmployees(setEmployeeData)
  },[])

  return <Employee EmployeeData={EmployeeData} />;
}

export default HomeEmployee;
