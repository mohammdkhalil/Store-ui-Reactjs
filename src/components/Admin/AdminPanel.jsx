
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Api from '../../tools/api';
import { AppContext } from '../layout/Layout';
import styles from './admin.scss';
function AdminPanel() {
  const [statistics, setStatistics] = useState([]);
  const [cookie, setCookie] = useCookies(['token']);
  const appContext = useContext(AppContext);
  let token;

  const onLogout = async () => {
    setCookie('token', null);
    token = appContext.appState.token != null ? appContext.appState.token : cookie?.token;
    if (token == null) return;
    await Api.fetch({ method: 'PUT', url: 'logout', token });
    appContext.logout();
    window.location.href = '/login';
  };
  useEffect(() => {
    getStatistics();
  }, []);
  const getStatistics = async () => {
    // call API
    const response = await Api.fetch({
        url: "statistics",
    });
    if (response != null) setStatistics(response.data);}

  return (
    <Container fluid >
      <Row>
        <Col sm={3} style={{ width: '18%' } } className="bg-light sidebar position-fixed vh-100"> 
          <h2>Dashboard</h2>
          <Nav className="flex-column">
            <Nav.Link style={{ fontSize: '18px' }} as={Link} to='/AllUsers'>All Users <Badge bg="secondary m-2">{statistics["user"]}</Badge></Nav.Link>
            <Nav.Link style={{ fontSize: '18px' }} as={Link} to='/AddUser'>Add User</Nav.Link>
            <Nav.Link style={{ fontSize: '18px' }} as={Link} to='/Categories'>All Categories <Badge bg="secondary m-2">{statistics["category"]}</Badge></Nav.Link>
            <Nav.Link style={{ fontSize: '18px' }} as={Link} to='/AddCategoryPage'>Add Category</Nav.Link>
            <Nav.Link style={{ fontSize: '18px' }} as={Link} to='/AllProduct'>All Product <Badge bg="secondary m-2">{statistics["product"]}</Badge></Nav.Link>
            <Nav.Link style={{ fontSize: '18px' }} as={Link} to='/addProduct'>Add Product </Nav.Link>
            <Nav.Link style={{ fontSize: '18px' }} as={Link} to='/orders'>All Orders <Badge bg="secondary m-2">{statistics["order"]}</Badge></Nav.Link>
            <Nav.Link style={{ fontSize: '18px' }} as={Link} to='/user'>My Details</Nav.Link>
            <Nav.Link style={{ fontSize: '18px' }} onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </Col>
        <Col sm={9} style={{ marginRight: '100%' }} className="content">
          {/* Your content here */}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;
