import axios from "axios";
import { toast } from "react-toastify";

const fetchData = async (setDataGot) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_MY_KEY}/get/post`
    );
    if (response.status === 200) {
      setDataGot(response.data);
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

const fetchAllEmployees = async (setEmployeeData) => {
  const response = await axios.get(
    "http://localhost:5000/api/get/admin/employee",
    {
      headers: {
        Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
      },
    }
  );
  setEmployeeData(response.data);
};

export { fetchData, fetchAllEmployees };
