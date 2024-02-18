import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Api from "../../../tools/api";
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await Api.fetch({
        url: "users",
        method: "GET",
        token: localStorage.getItem("token"),
      });
      setUsers(response.users);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await Api.fetch({
        url: `users/${userId}`,
        method: "DELETE",
        token: localStorage.getItem("token"),
      });
      console.log("response", response);
      fetchUsers();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div class="main-table-containter ">
        <div class="title-table-container">
          <div class="subtitle">USERS</div>
        </div>
        <div>
          <table>
            <thead>
              <th>id</th>
              <th>email</th>
              <th>name</th>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td> {index + 1}</td>

                  <td>
                    <div class="pendiente">{user.email}</div>
                  </td>
                  <td>{user.name}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
