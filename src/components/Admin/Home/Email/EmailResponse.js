import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmailResponse() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState([
    {
      email: "srivastavp891@gmail.com",
      name: "Prashant",
    },
    {
      email: "srivastavp891@gmail.com",
      name: "Prashant",
    },
    {
      email: "srivastavp891@gmail.com",
      name: "Prashant",
    },
    {
      email: "srivastavp891@gmail.com",
      name: "Prashant",
    },
  ]);

  useEffect(() => {
    if (type === "all" || type === "responded" || type === "pending") {
      fetchEmail(type);
    } else {
      navigate("./page=notfound");
    }
  }, [type]);

  const fetchEmail = async (type) => {
    // // Simulate fetching data from an API
    // const response = await fetch(`https://api.example.com/emails?type=${type}`);
    // const data = await response.json();
    // setEmailData(data); // Update the state with the fetched data
  };

  return (
    <div className="container">
      <div className="mb-5">
        <h1 className="text-center text-capitalize">{type} Email</h1>
      </div>
      <div className="table-responsive"></div>
      <table className="table">
        <thead className="table-head">
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {emailData.map((email, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{email.name}</td>
              <td>{email.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailResponse;
