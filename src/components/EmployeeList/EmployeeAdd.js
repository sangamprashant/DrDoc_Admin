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
    if (
      !formData.personal.id.trim() ||
      !formData.personal.name.trim() ||
      !formData.personal.email.trim() ||
      !formData.personal.dateOfBirth.trim() ||
      !formData.personal.salary.trim() ||
      !formData.personal.jobRole.trim() ||
      !formData.personal.image.trim() ||
      !formData.address.address.trim() ||
      !formData.address.city.trim() ||
      !formData.address.phone.trim() ||
      !formData.address.currentAddress.trim() ||
      !formData.address.pin.trim() ||
      !formData.address.address.trim() ||
      !formData.bank.bankAccount.trim() ||
      !formData.bank.accountHolderName.trim() ||
      !formData.bank.ifcCode.trim() ||
      !formData.bank.branch.trim()
    ) {
      alert("all fields are required.");
    }
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Personal details */}
        <h5>Personal details</h5>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="id"
                  placeholder="Id"
                  disabled
                  type="text"
                  className="form-control"
                  value={formData.personal.id}
                  onChange={(e) =>
                    handleChange("personal", "id", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  name="name"
                  placeholder="Name"
                  type="text"
                  className="form-control"
                  value={formData.personal.name}
                  onChange={(e) =>
                    handleChange("personal", "name", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Email</th>
              <th>Date Of Birth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="form-control"
                  value={formData.personal.email}
                  onChange={(e) =>
                    handleChange("personal", "email", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  name="dateOfBirth"
                  placeholder="Date Of Birth"
                  type="date"
                  className="form-control"
                  value={formData.personal.dateOfBirth}
                  onChange={(e) =>
                    handleChange("personal", "dateOfBirth", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Salary</th>
              <th>Job Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="salary"
                  placeholder="Salary"
                  type="number"
                  className="form-control"
                  value={formData.personal.salary}
                  onChange={(e) =>
                    handleChange("personal", "salary", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  name="jobRole"
                  placeholder="Job Role"
                  type="text"
                  className="form-control"
                  value={formData.personal.jobRole}
                  onChange={(e) =>
                    handleChange("personal", "jobRole", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Image</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="image"
                  type="file"
                  className="form-control"
                  value={formData.personal.image}
                  onChange={(e) =>
                    handleChange("personal", "image", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personal.preview}
                  onChange={(e) =>
                    handleChange("personal", "preview", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Address details */}
        <h5>Address details</h5>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="address"
                  placeholder="Address"
                  type="text"
                  className="form-control"
                  value={formData.address.address}
                  onChange={(e) =>
                    handleChange("address", "address", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  name="city"
                  placeholder="City"
                  type="text"
                  className="form-control"
                  value={formData.address.city}
                  onChange={(e) =>
                    handleChange("address", "city", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Phone</th>
              <th>Current Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="phone"
                  placeholder="+91 XXXXXXXXXX"
                  type="number"
                  className="form-control"
                  value={formData.address.phone}
                  onChange={(e) =>
                    handleChange("address", "phone", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  name="currentAddress"
                  placeholder="Current Address"
                  type="text"
                  className="form-control"
                  value={formData.address.currentAddress}
                  onChange={(e) =>
                    handleChange("address", "currentAddress", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Pin</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="pin"
                  type="number"
                  placeholder="XXXXXX"
                  maxLength="6"
                  minLength="6"
                  className="form-control"
                  value={formData.address.pin}
                  onChange={(e) =>
                    handleChange("address", "pin", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  name="country"
                  placeholder="Country"
                  type="text"
                  className="form-control"
                  value={formData.address.country}
                  onChange={(e) =>
                    handleChange("address", "country", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Bank details */}
        <h5>Bank details</h5>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Bank Account Number</th>
              <th>Account Holder Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="bankAccount"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  type="number"
                  className="form-control"
                  value={formData.bank.bankAccount}
                  onChange={(e) =>
                    handleChange("bank", "bankAccount", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  name="accountHolderName"
                  placeholder="Account Holder Name"
                  type="text"
                  className="form-control"
                  value={formData.bank.accountHolderName}
                  onChange={(e) =>
                    handleChange("bank", "accountHolderName", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>ifc Code</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="ifcCode"
                  placeholder="IFC-CODE"
                  type="text"
                  className="form-control"
                  value={formData.bank.ifcCode}
                  onChange={(e) =>
                    handleChange("bank", "ifcCode", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  name="branch"
                  placeholder="Branch"
                  type="text"
                  className="form-control"
                  value={formData.bank.branch}
                  onChange={(e) =>
                    handleChange("bank", "branch", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EmployeeAdd;
