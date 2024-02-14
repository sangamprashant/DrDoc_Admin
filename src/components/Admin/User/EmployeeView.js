import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../assets/images";
import { toast } from "react-toastify";
import EmployeeAdd from "./EmployeeAdd";

// ProfileHeader component to display basic details
const ProfileHeader = ({ name, email, dateOfBirth, image }) => (
  <div className="d-flex">
    <img
      src={image ? image : User}
      alt="Profile"
      height="100"
      width="100"
      className=" object-fit-cover"
    />
    <div>
      <h5>{name}</h5>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Date of Birth:</strong> {dateOfBirth}
      </p>
    </div>
  </div>
);

// PersonalDetails component to display personal information
const PersonalDetails = ({ salary, jobRole }) => (
  <div>
    <p>
      <strong>Salary:</strong> {salary}
    </p>
    <p>
      <strong>Job Role:</strong> {jobRole}
    </p>
  </div>
);

// AddressDetails component to display address information
const AddressDetails = ({ address, city, country, phone }) => (
  <div>
    <p>
      <strong>Address:</strong> {address}, {city}, {country}
    </p>
    <p>
      <strong>Phone:</strong> {phone}
    </p>
  </div>
);

// BankDetails component to display bank information
const BankDetails = ({ bankAccount, accountHolderName, ifcCode, branch }) => (
  <div>
    <p>
      <strong>Bank Account:</strong> {bankAccount}
    </p>
    <p>
      <strong>Account Holder Name:</strong> {accountHolderName}
    </p>
    <p>
      <strong>IFC Code:</strong> {ifcCode}
    </p>
    <p>
      <strong>Branch:</strong> {branch}
    </p>
  </div>
);

function EmployeeView() {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const navigation = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MY_KEY}/get/by/id/${id}`
      );

      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handelDelete = async () => {
    if (!userData) {
      toast.error("User data not available");
      return;
    }
    const isDelete = window.confirm(
      `Do you want to delete the employee ${userData.personal.name} with ID ${userData._id}?`
    );
    if (isDelete) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_MY_KEY}/delete/admin/employee/${id}`,
          {
            headers: {
              Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("User deleted successfully");
          navigation("/employee/all");
        } else {
          toast.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("An error occurred while deleting the user");
      }
    }
  };

  return (
    <>
      {!isEdit ? (
        <div className="container">
          <div className="d-flex justify-content-between">
            <h2>Employee Profile</h2>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button className="btn btn-danger" onClick={handelDelete}>
                Delete
              </button>
            </div>
          </div>
          {userData && (
            <div>
              <ProfileHeader {...userData.personal} />
              <hr />
              <h4>Personal Details</h4>
              <PersonalDetails {...userData.personal} />
              <hr />
              <h4>Address Details</h4>
              <AddressDetails {...userData.address} />
              <hr />
              <h4>Bank Details</h4>
              <BankDetails {...userData.bank} />
            </div>
          )}
        </div>
      ) : (
        <EmployeeAdd
          isEdit={isEdit}
          userData={userData}
          setUserData={setUserData}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
}

export default EmployeeView;
