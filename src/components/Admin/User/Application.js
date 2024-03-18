import { Table, Tooltip } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { VisibilityIcon } from "../../Icons/Icons";
import { User } from "../../../assets/images";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_API } from "../../../config";
import { fetchApplicationsType } from "../../../apiCall";

function Application({ userType }) {
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    if (userType) {
      fetchApplicationsType(setUsers, userType);
    }
  }, [userType]);

  const columns = [
    {
      title: "User",
      dataIndex: "",
      key: "personal.name",
      render: (personal) => (
        <div className="d-flex align-items-center">
          <div className="avatar avatar-sm me-3">
            <img
              src={personal?.personal?.image ? personal?.personal?.image : User}
              alt="Avatar"
              height="50"
              width="50"
              className="rounded-circle"
            />
          </div>
          <div>
            <h6 className="mb-0 text-truncate">{personal?.name}</h6>
            <small className="text-truncate">{personal?.email}</small>
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
      title: "Date of Birth",
      dataIndex: "personal",
      key: "personal.dateOfBirth",
      render: (personal) => <p>{personal?.dateOfBirth || "N.A."}</p>,
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

  return <Table dataSource={users} columns={columns} />;
}

export default Application;
