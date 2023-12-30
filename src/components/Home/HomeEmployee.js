import React, { useEffect, useState } from "react";
import Employee from "../EmployeeList/Employee";
import { HardData } from "../EmployeeList/EmployeeData";

function HomeEmployee() {
  // fetch /employee/all
  const [EmployeeData, setEmployeeData] = useState([]);

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = () =>{
    setEmployeeData(HardData)
  }

  return <Employee EmployeeData={EmployeeData} />;
}

export default HomeEmployee;
