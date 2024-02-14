import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API } from "../config";

const fetchAllUserByType = async (setDoctorData, type) => {
  const response = await axios.get(`${BASE_API}/admin/user/type/${type}`, {
    headers: {
      Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
    },
  });
  setDoctorData(response.data);
};

export { fetchAllUserByType };
