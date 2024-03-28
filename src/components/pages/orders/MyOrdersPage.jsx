import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Api from "../../../tools/api";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.fetch({
          url: 'orders',
          method: 'GET',
          token: localStorage.getItem('token')
        });
        setOrders(response.order);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShowDetails = (orderId) => {
    const orderToShow = orders.find(order => order.id === orderId);
    setSelectedOrder(orderToShow);
    setShowDetailsModal(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="m-4">My Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>{order.total}</td>
              <td>
                <Button variant="info" onClick={() => handleShowDetails(order.id)}>Show Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Order ID:</strong> {selectedOrder.id}</p>
          <p><strong>User ID:</strong> {selectedOrder.user_id}</p>
          <p><strong>Total:</strong> {selectedOrder.total}</p>
          <p><strong>Date:</strong> {selectedOrder.date}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyOrdersPage;
