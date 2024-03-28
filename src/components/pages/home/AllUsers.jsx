import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import Api from '../../../tools/api';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await Api.fetch({
        url: 'users',
        method: 'GET',
        token: localStorage.getItem('token'),
      });
      setUsers(response.users);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Api.fetch({
        url: `users/${deleteUserId}`,
        method: 'DELETE',
        token: localStorage.getItem('token'),
      });
      setShowDeleteModal(false);
      fetchUsers(); // Refresh users data
    } catch (error) {
      console.error('Error deleting user: ', error);
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
      <div className="main-table-container">
        <div className="title-table-container">
          <div className="subtitle">USERS</div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>email</th>
                <th>name</th>
                <th>role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(user.id)}
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllUsers;





// import React, { useState, useEffect } from "react";
// import Api from "../../../tools/api";

// // تعريف الوظيفة لاسترجاع المستخدم الحالي
// const getCurrentUser = () => {
//   // قم بتعيين الكود الخاص بك لاسترجاع المستخدم الحالي هنا
//   return { id: 1, role: 'admin' }; // افترض أن المستخدم الحالي هو المستخدم رقم 1
// };

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const currentUser = getCurrentUser();
//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   const fetchUsers = async () => {
//     try {
//       const response = await Api.fetch({
//         url: "users",
//         method: "GET",
//         token: localStorage.getItem("token"),
//       });
//       setUsers(response.users);
//       setLoading(false);
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//     }
//   };


//   return (
//     <div>

//           {users
//             .filter(user => user.id === currentUser.id) // تصفية القائمة للحصول على المستخدم الحالي فقط
//             .map((user) => (
             
//                 <td>{user.role}</td>
              
//             ))}

//     </div>
//   );
// };

// export default AllUsers;
