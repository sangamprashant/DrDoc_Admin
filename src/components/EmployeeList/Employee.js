import React from "react";
import { DevicesIcon, VisibilityIcon } from "../Icons/Icons";
import { User } from "../../assets/images";
import { Link } from "react-router-dom";

function Employee({ EmployeeData }) {
  return (
    <div class="col-12">
      <div class="card">
        <div class="table-responsive">
          {EmployeeData.length > 0 ? (
            <table class="table">
              <thead class="table-light">
                <tr>
                  <th class="text-truncate">User</th>
                  <th class="text-truncate">Email</th>
                  <th class="text-truncate">Role</th>
                  <th class="text-truncate">Age</th>
                  <th class="text-truncate">Salary</th>
                  <th class="text-truncate">View</th>
                </tr>
              </thead>
              <tbody>
                {EmployeeData.map((data) => (
                  <tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-sm me-3">
                          <img
                            src={
                              data.personal.image ? data.personal.image : User
                            }
                            alt="Avatar"
                            height="50"
                            width="50"
                            class="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 class="mb-0 text-truncate">
                            {data.personal.name}
                          </h6>
                          <small class="text-truncate">@{data._id}</small>
                        </div>
                      </div>
                    </td>
                    <td class="text-truncate">{data.personal.email}</td>
                    <td class="text-truncate">
                      {<DevicesIcon style={{ color: "purple" }} />}{" "}
                      {data.personal.jobRole}
                    </td>
                    <td class="text-truncate">{data.personal.dateOfBirth}</td>
                    <td class="text-truncate">{data.personal.salary}</td>
                    <td class="text-truncate">
                      {" "}
                      <Link
                        className="btn btn-primary"
                        to={`/employee/view/${data._id}`}
                      >
                        <VisibilityIcon />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="text-center text-capitalize mt-5">Loading..</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employee;
