import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API } from "../config";

const fetchAllUserByType = async (setDoctorData, type, setIsLoading) => {
  try {
    setIsLoading(true);
    const response = await axios.get(`${BASE_API}/admin/user/type/${type}`, {
      headers: {
        Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
      },
    });
    setDoctorData(response.data);
  } catch (error) {
    console.log("Error in fetching the users:", error);
  } finally {
    setIsLoading(false);
  }
};

const fetchApplicationsType = async (setUsers, userType,) => {
  try {
    const response = await axios.get(
      `${BASE_API}/admin/user/application/${userType}`,
      {
        headers: {
          Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
        },
      }
    );
    setUsers(response.data);
  } catch (error) {
    console.log("Failed to fetch the applications:", error);
  } finally {
  }
};

export { fetchAllUserByType, fetchApplicationsType };
