import React from "react";
import { User } from "../../../assets/images";
import { VisibilityIcon } from "../../Icons/Icons";

const Clients = () => {
  return (
    <div className="mb-5">
      <h1 className="text-center text-capitalize">My Clients</h1>
      {/* render */}
      <table className="table table-hover rounded">
        <thead>
          <tr>
            <th>User</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src={User}
                alt=""
                className=" object-fit-cover  "
                width={100}
                height={100}
              />
            </td>
            <td>
              details
            </td>
            <td>
              <button className="btn btn-primary">
                <VisibilityIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
