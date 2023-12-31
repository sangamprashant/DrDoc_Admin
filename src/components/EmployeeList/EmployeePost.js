import React from "react";

function EmployeePost() {
  return (
    <div className="container">
      <form className="my-5">
        <h5 className="text-center text-capitalize">Add A new Post</h5>
        <table className="table py-5">
          <thead className="py-5">
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a new post.."
                />
              </td>
              <td>
                <input
                  type="submit"
                  className="form-control btn btn-outline-primary"
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
          <tr>
            <td>1</td>
            <td>Manager</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Seller</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Pa</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmployeePost;
