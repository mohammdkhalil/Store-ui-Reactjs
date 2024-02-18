import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../../../tools/api";

function MyOrdersPage() {
  const [order, setOrder] = useState({ id: 0, qty: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderIdParaem, setOrderIdParaem] = useState(0);

  const handleEditClick = (orderId) => {
    setOrderIdParaem(orderId); // Set orderIdParaem to the clicked order ID
  };
  useEffect(async () => {
    try {
      const response = await Api.fetch({
        url: "orders",
        token: localStorage.getItem('token')
      })
      setOrders(response.order);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Api.fetch({
        method: "PUT",
        url: `orders/${orderIdParaem}`,
        body: { products: { order } }
      })
      this.fetchOrder()
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
      <h1>My Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.total}</td>
              <td>{order.date}</td>
              <button onClick={() => handleEditClick(order.id)}>Edit</button>

            </tr>
          ))}
        </tbody>
      </table>
      {orderIdParaem && (
        <form>
          <label>
            Name:
            <input type="number" name="id" value={order.id} onChange={handleChange} />
          </label>
          <br />
          <label>
            Quantity:
            <input type="number" name="qty" value={order.qty} onChange={handleChange} />
          </label>
          <br />
          <button onClick={
           () => handleSubmit
          }>Submit</button>
        </form>
      )}


    </div>
  );
}

export default MyOrdersPage;
