import React, { useState } from "react";

function EmployeeAdd() {
  const [formData, setFormData] = useState({
    personal: {
      id: "",
      name: "",
      email: "",
      dateOfBirth: "",
      salary: "",
      jobRole: "",
      image: "",
      preview: "",
    },
    address: {
      address: "",
      city: "",
      phone: "",
      currentAddress: "",
      pin: "",
      country: "",
    },
    bank: {
      bankAccount: "",
      accountHolderName: "",
      ifcCode: "",
      branch: "",
    },
  });

  const handleChange = (category, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Personal details */}
        <h5>Personal details</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              {/* ... other fields ... */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personal.id}
                  onChange={(e) => handleChange("personal", "id", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personal.name}
                  onChange={(e) => handleChange("personal", "name", e.target.value)}
                />
              </td>
              {/* ... other input fields ... */}
            </tr>
          </tbody>
        </table>

        {/* Address details */}
        <h5>Address details</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
              {/* ... other fields ... */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={formData.address.address}
                  onChange={(e) => handleChange("address", "address", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={formData.address.city}
                  onChange={(e) => handleChange("address", "city", e.target.value)}
                />
              </td>
              {/* ... other input fields ... */}
            </tr>
          </tbody>
        </table>

        {/* Bank details */}
        <h5>Bank details</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Bank Account</th>
              <th>Account Holder Name</th>
              {/* ... other fields ... */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={formData.bank.bankAccount}
                  onChange={(e) => handleChange("bank", "bankAccount", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={formData.bank.accountHolderName}
                  onChange={(e) => handleChange("bank", "accountHolderName", e.target.value)}
                />
              </td>
              {/* ... other input fields ... */}
            </tr>
          </tbody>
        </table>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeAdd;
