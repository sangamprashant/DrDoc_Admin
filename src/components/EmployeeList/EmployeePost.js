import React, { useEffect, useState } from "react";
import { DeleteIcon } from "../Icons/Icons";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchData } from "./ApiCallEmployee";

function EmployeePost() {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataGot, setDataGot] = useState([]);

  useEffect(() => {
    fetchData(setDataGot);
  }, []);


  const handelAddPost = async (e) => {
    e.preventDefault();
    if (!post.trim()) {
      return toast.info("Please enter the new post.");
    }
    setLoading(true);
    const reqBody = {
      post: post.trim(),
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_MY_KEY}/add/post`,
        reqBody,
        {
          headers: {
            Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setPost("");
        fetchData(setDataGot);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handelDeletePost = async (data) => {
    const allowed = window.confirm(
      `Are you sure you want to delete post: ${data.post}`
    );

    if (allowed) {
      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_MY_KEY}/delete/post/${data._id}`,
          {
            headers: {
              Authorization: "Bearer " + `${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          fetchData(setDataGot);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } else {
      console.log("Delete action canceled");
    }
  };

  return (
    <div className="container">
      <form className="my-5" onSubmit={handelAddPost}>
        <h5 className="text-center text-capitalize">Add A new Post</h5>
        <table className="table py-5">
          <thead className="py-5">
            <tr>
              <td>
                <input
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter a new post.."
                />
              </td>
              <td>
                <input
                  type="submit"
                  className="form-control btn btn-outline-primary"
                  disabled={loading}
                  value={loading ? "Please wait.." : "Add a Post"}
                />
              </td>
            </tr>
          </thead>
        </table>
      </form>
      <h5 className="text-center text-capitalize">List of job Post's </h5>
      <table className="table">
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataGot.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.post}</td>
              <td className="mx-2 action-icon">
                <DeleteIcon
                  onClick={() => {
                    handelDeletePost(data);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeePost;
