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

  export {fetchData}