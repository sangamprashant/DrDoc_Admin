import React from "react";
import { Link } from "react-router-dom";
import { Table, Tooltip } from "antd";
import { VisibilityIcon } from "../../Icons/Icons";
import { User } from "../../../assets/images";

function UserTable({ DoctorData }) {
  const columns = [
    {
      title: "User",
      dataIndex: "personal",
      key: "personal.name",
      render: (personal) => (
        <div className="d-flex align-items-center">
          <div className="avatar avatar-sm me-3">
            <img
              src={personal.image ? personal.image : User}
              alt="Avatar"
              height="50"
              width="50"
              className="rounded-circle"
            />
          </div>
          <div>
            <h6 className="mb-0 text-truncate">{personal.name}</h6>
            <small className="text-truncate">{personal.email}</small>
          </div>
        </div>
      ),
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "personal._id",
      render: (id) => <p>@{id}</p>,
    },
    {
      title: "Age",
      dataIndex: "personal",
      key: "personal.dateOfBirth",
      render: (personal) => <p>{personal.dateOfBirth}</p>,
    },
    {
      title: "Salary",
      dataIndex: "personal",
      key: "personal.salary",
      render: (personal) => <p>{personal.salary}</p>,
    },
    {
      title: "View",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Tooltip title={`view ${_id}'s profile`}>
          <Link className="btn btn-primary" to={`/employee/view/${_id}`}>
            <VisibilityIcon />
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="col-12">
      <div className="card">
        <div className="table-responsive">
          <Table dataSource={DoctorData} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default UserTable;
