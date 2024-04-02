import React from "react";
import { User } from "../../../assets/images";
import { VisibilityIcon } from "../../Icons/Icons";
import { Image, Tooltip } from "antd";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import { BASE_API } from "../../../config";
import { Loading } from "component-craftsman";
import { Link } from "react-router-dom";

const Clients = () => {
  const { token } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [clients, setClients] = React.useState([]);

  React.useLayoutEffect(() => {
    if (token) {
      fetchClients();
    }
  }, [token]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_API}/doctor/get-clients`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response?.data?.success) {
        setClients(response.data.clients);
      }
    } catch (error) {
      console.log("failed to fetch the Clients:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("clients got", clients);

  return (
    <div className="mb-5">
      <h1 className="text-center text-capitalize">My Clients</h1>
      {/* render */}
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Loading loading={4} />
        </div>
      ) : (
        <table className="table table-hover rounded">
          <thead>
            <tr>
              <th>User</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((data, index) => (
              <tr key={index}>
                <td>
                  <Image
                    src={data?.personal?.image || User}
                    alt=""
                    className=" object-fit-cover  "
                    width={100}
                    height={100}
                  />
                </td>
                <td>{data.name}</td>
                <td>
                  <Tooltip title={`View ${data.name}'s profile`}>
                    <Link className="btn btn-primary" to={`./${data._id}`}>
                      {" "}
                      <VisibilityIcon />
                    </Link>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Clients;
