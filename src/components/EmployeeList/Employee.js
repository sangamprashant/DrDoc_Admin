import React from "react";
import { DevicesIcon, VisibilityIcon } from "../Icons/Icons";

const EmployeeData = [
  {
    image:
      "https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template-free/demo/assets/img/avatars/1.png",
    name: "Prashant Srivastav",
    id: "sdsdsffsfssfssfsf",
    email: "srivastavp891@gmail.com",
    role: "admin",
    age: "24",
    salary: "500000",
    status: "Active",
  },
  {
    image:
      "https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template-free/demo/assets/img/avatars/1.png",
    name: "Prashant Srivastav",
    id: "sdsdsffsfssfssfsf",
    email: "srivastavp891@gmail.com",
    role: "admin",
    age: "24",
    salary: "500000",
    status: "Active",
  },
  {
    image:
      "https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template-free/demo/assets/img/avatars/1.png",
    name: "Prashant Srivastav",
    id: "sdsdsffsfssfssfsf",
    email: "srivastavp891@gmail.com",
    role: "admin",
    age: "24",
    salary: "500000",
    status: "Active",
  },
  {
    image:
      "https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template-free/demo/assets/img/avatars/1.png",
    name: "Prashant Srivastav",
    id: "sdsdsffsfssfssfsf",
    email: "srivastavp891@gmail.com",
    role: "admin",
    age: "24",
    salary: "500000",
    status: "Active",
  },
  {
    image:
      "https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template-free/demo/assets/img/avatars/1.png",
    name: "Prashant Srivastav",
    id: "sdsdsffsfssfssfsf",
    email: "srivastavp891@gmail.com",
    role: "admin",
    age: "24",
    salary: "500000",
    status: "Active",
  },
  {
    image:
      "https://demos.themeselection.com/materio-bootstrap-html-laravel-admin-template-free/demo/assets/img/avatars/1.png",
    name: "Prashant Srivastav",
    id: "sdsdsffsfssfssfsf",
    email: "srivastavp891@gmail.com",
    role: "admin",
    age: "24",
    salary: "500000",
    status: "Active",
  },
];

function Employee() {
  return (
    <div class="col-12">
      <div class="card">
        <div class="table-responsive">
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
                          src={data.image}
                          alt="Avatar"
                          height="50"
                          width="50"
                          class="rounded-circle"
                        />
                      </div>
                      <div>
                        <h6 class="mb-0 text-truncate">{data.name}</h6>
                        <small class="text-truncate">@{data.id}</small>
                      </div>
                    </div>
                  </td>
                  <td class="text-truncate">{data.email}</td>
                  <td class="text-truncate">
                    {<DevicesIcon style={{color:"purple"}}/>}{" "}
                    {data.role}
                  </td>
                  <td class="text-truncate">{data.age}</td>
                  <td class="text-truncate">{data.salary}</td>
                  <td class="text-truncate"> <a className="btn btn-primary"><VisibilityIcon/></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employee;
