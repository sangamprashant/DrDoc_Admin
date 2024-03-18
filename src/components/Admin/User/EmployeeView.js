import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../../../assets/images";
import EmployeeAdd from "./EmployeeAdd";
import { Image } from "antd";
import { BASE_API } from "../../../config";

const ProfileHeader = ({ personal }) => {
  return (
    <div className="d-flex">
      <img
        src={personal?.image ? personal?.image : User}
        alt="Profile"
        height="100"
        width="100"
        className="object-fit-cover"
      />
      <div>
        <h5>{personal?.name}</h5>
        <p>
          <strong>Email:</strong> {personal?.email}
        </p>
        {personal?.personal?.dateOfBirth&&<p>
          <strong>Date of Birth:</strong> {personal?.personal?.dateOfBirth}
        </p>}
      </div>
    </div>
  );
};

const AddressDetails = ({ address, city, country, phone }) => (
  <div>
    <h4>Address Details</h4>
    <table className="table">
      <tbody>
        <tr>
          <td>
            <strong>Address:</strong>
          </td>
          <td>{address}</td>
        </tr>
        <tr>
          <td>
            <strong>City:</strong>
          </td>
          <td>{city}</td>
        </tr>
        <tr>
          <td>
            <strong>Country:</strong>
          </td>
          <td>{country}</td>
        </tr>
        <tr>
          <td>
            <strong>Phone:</strong>
          </td>
          <td>{phone}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const BankDetails = ({ bankAccount, accountHolderName, ifcCode, branch }) => (
  <div>
    <h4>Bank Details</h4>
    <table className="table">
      <tbody>
        <tr>
          <td>
            <strong>Bank Account:</strong>
          </td>
          <td>{bankAccount}</td>
        </tr>
        <tr>
          <td>
            <strong>Account Holder Name:</strong>
          </td>
          <td>{accountHolderName}</td>
        </tr>
        <tr>
          <td>
            <strong>IFC Code:</strong>
          </td>
          <td>{ifcCode}</td>
        </tr>
        <tr>
          <td>
            <strong>Branch:</strong>
          </td>
          <td>{branch}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const HospitalDetails = ({
  hospitalName,
  specialization,
  experienceYears,
  location,
  department,
  bedsAvailable,
  website,
  doctorDegree,
  doctorDegreeFile,
  perConsultantCharge,
  images,
}) => (
  <div>
    <h4>Hospital Details</h4>
    <table className="table">
      <tbody>
        <tr>
          <td>
            <strong>Hospital Name:</strong>
          </td>
          <td>{hospitalName}</td>
        </tr>
        <tr>
          <td>
            <strong>Specialization:</strong>
          </td>
          <td>{specialization}</td>
        </tr>
        <tr>
          <td>
            <strong>Experience Years:</strong>
          </td>
          <td>{experienceYears}</td>
        </tr>
        <tr>
          <td>
            <strong>Location:</strong>
          </td>
          <td>{location}</td>
        </tr>
        <tr>
          <td>
            <strong>Department:</strong>
          </td>
          <td>{department}</td>
        </tr>
        <tr>
          <td>
            <strong>Beds Available:</strong>
          </td>
          <td>{bedsAvailable}</td>
        </tr>
        <tr>
          <td>
            <strong>Website:</strong>
          </td>
          <td>{website}</td>
        </tr>
        <tr>
          <td>
            <strong>Doctor Degree:</strong>
          </td>
          <td>{doctorDegree}</td>
        </tr>
        <tr>
          <td>
            <strong>Doctor Degree File:</strong>
          </td>
          <td>
            <Image width={200} src={doctorDegreeFile} />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Per Consultant Charge:</strong>
          </td>
          <td>{perConsultantCharge}</td>
        </tr>
        <tr>
          <td>
            <strong>Images:</strong>
          </td>
          <td>
            {images && images.length > 0 ? (
              <div className="d-flex flex-row flex-wrap gap-2">
                {images.map((data, index) => (
                  <div key={index}>
                    <Image width={200} src={data} />
                  </div>
                ))}
              </div>
            ) : (
              "No images available"
            )}
          </td>
        </tr>
      </tbody>
    </table>
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
        `${process.env.REACT_APP_MY_KEY}/common/profile/${id}`
      );
      if (response.status === 200) {
        setUserData(response.data.user);
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
      `Do you want to delete the employee ${userData.name} with ID ${userData._id}?`
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

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `${BASE_API}/admin/user/approve`,
        { id },
        {
          headers: {
            Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log("failed to approve:", error);
      toast.error(error.response.data.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h2>Employee Profile</h2>
          <div className="d-flex gap-2">
            {userData?.roleApplied && (
              <button
                className="btn btn-primary"
                onClick={() => handleApprove(userData._id)}
              >
                Approve
              </button>
            )}
            <button className="btn btn-danger" onClick={handelDelete}>
              Delete
            </button>
          </div>
        </div>
        {userData && (
          <div>
            <ProfileHeader personal={userData} />
            <hr />
            <AddressDetails {...userData.address} />

            <>
              <hr />
              {(userData?.roleApplied === "doctor" || userData?.isDoctor) && (
                <HospitalDetails {...userData.hospital} />
              )}
            </>
          </div>
        )}
      </div>
    </>
  );
}

export default EmployeeView;
