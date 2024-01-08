import React, { useEffect, useState } from "react";
import { fetchData } from "./ApiCallEmployee";
import { toast } from "react-toastify";
import axios from "axios";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function EmployeeAdd() {
  const [formData, setFormData] = useState({
    _id: "",
    password: "",
    personal: {
      name: "",
      email: "",
      dateOfBirth: "",
      salary: "",
      jobRole: "",
      image: "",
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
  const [dataGot, setDataGot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedfile, setSelectedFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    fetchData(setDataGot);
  }, []);

  const handleChange = (category, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleChangeIdPaddword = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedFile(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.password.trim() ||
      !formData.personal.name.trim() ||
      !formData.personal.email.trim() ||
      !formData.personal.dateOfBirth.trim() ||
      !formData.personal.salary.trim() ||
      !formData.personal.jobRole.trim() ||
      !formData.address.address.trim() ||
      !formData.address.city.trim() ||
      !formData.address.phone.trim() ||
      !formData.address.currentAddress.trim() ||
      !formData.address.pin.trim() ||
      !formData.address.address.trim() ||
      !formData.bank.bankAccount.trim() ||
      !formData.bank.accountHolderName.trim() ||
      !formData.bank.ifcCode.trim() ||
      !formData.bank.branch.trim() ||
      !selectedfile
    ) {
      return alert("all fields are required.");
    }
    setLoading(true);

    getImageLink();
  };

  const getImageLink = async () => {
    const fileRef = ref(storage, `Drdoc/${Date.now() + selectedfile.name}`);
    uploadBytes(fileRef, selectedfile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleChange("personal","image",url)
      });
    });
  };
  // Use useEffect to log the correct value after the state is updated
  useEffect(() => {
    if (formData.personal.image) {
      console.log("useEffect data:", formData.personal.image);
      // handelUploadData();
    }
  }, [formData.personal.image]);

  const handelUploadData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MY_KEY}/add/admin/employee`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Personal details */}
        <h5>Personal details</h5>
        <table className="table table-borderless">
          <thead>
            <tr className="w-100">
              <th>Name</th>
              {formData._id ? <th>Id</th> : <th>Password</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
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

              <td>
                {formData._id ? (
                  <input
                    name="_id"
                    placeholder="_id"
                    type="text"
                    className="form-control"
                    value={formData._id}
                    onChange={(e) =>
                      handleChangeIdPaddword("_id", e.target.value)
                    }
                  />
                ) : (
                  <input
                    name="password"
                    placeholder="Password"
                    type="text"
                    className="form-control"
                    value={formData.password}
                    onChange={(e) =>
                      handleChangeIdPaddword("password", e.target.value)
                    }
                  />
                )}
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
                <select
                  name="jobRole"
                  placeholder="Job Role"
                  type="text"
                  className="form-control"
                  value={formData.personal.jobRole}
                  onChange={(e) =>
                    handleChange("personal", "jobRole", e.target.value)
                  }
                >
                  <option value="">Select a Job Role</option>
                  {dataGot.map((data) => (
                    <option key={data._id} value={data.post}>
                      {data.post}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Image</th>
              <th>Image Preview</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="image"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </td>
              <td>
                {previewImg && (
                  <img
                    src={previewImg}
                    alt="Preview"
                    height="200"
                    width="200"
                    className=" object-fit-cover"
                  />
                )}
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
          {loading ? "Please Wait.." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeAdd;
