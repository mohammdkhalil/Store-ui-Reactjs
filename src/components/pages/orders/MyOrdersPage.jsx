import React, { useState, useEffect } from "react";
import { Button, Table, Form } from 'react-bootstrap';
import Api from "../../../tools/api";

function MyOrdersPage() {
  const [order, setOrder] = useState({ id: 0, qty: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderIdParaem, setOrderIdParaem] = useState(0);

  const handleEditClick = (orderId) => {
    setOrderIdParaem(orderId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.fetch({
          url: "orders",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.fetch({
        method: "PUT",
        url: `orders/${orderIdParaem}`,
        body: { products: { order } }
      });
      // Optionally, you can fetch the updated orders here
    } catch (error) {
      console.error('Error updating order: ', error);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="m-4" >My Orders</h1>
      <Table striped bordered hover>
        <thead >
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.total}</td>
              <td>{order.date}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(order.id)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {orderIdParaem && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formOrderId">
            <Form.Label>Order ID</Form.Label>
            <Form.Control type="number" name="id" value={order.id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formOrderQty">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" name="qty" value={order.qty} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4">Submit</Button>
        </Form>
      )}
    </div>
  );
}

export default MyOrdersPage;
