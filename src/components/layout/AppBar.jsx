import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { AppContext } from './Layout';
import Api from '../../tools/api';
import Loading from '../shared/Loading';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import styles from './layout.module.scss';

const getCurrentUser = (users, currentUserId) => {
    const currentUser = users.find(user => user.id === currentUserId);
    return currentUser ? currentUser.role : null;
};

function AppBar() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookie, setCookie] = useCookies('token');
    const appContext = useContext(AppContext);
    let token;

    const checkLogin = async () => {
        token = appContext.appState.token || cookie?.token;
        if (token == null || token === '') return;
        setLoading(true);
        const res = await Api.fetch({ url: 'user', token });
        if (res != null && res.email != null) {
            appContext.login(token, res);
        } else {
            appContext.logout();
            setCookie('token', null);
        }
        setLoading(false);
    };

    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (appContext.appState.user != null) {
            const currentUserId = appContext.appState.user.id;
            const currentUserRole = getCurrentUser(users, currentUserId);
            setCurrentUser(currentUserRole);
        }
    }, [appContext.appState.user, users]);

    const fetchUsers = async () => {
        setLoading(true);
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

    useEffect(() => {
        fetchUsers();
    }, []);

    const onLogout = async () => {
        setCookie('token', null);
        token = appContext.appState.token || cookie?.token;
        if (token == null) return;
        await Api.fetch({ method: 'PUT', url: 'logout', token });
        appContext.logout();
        window.location.href = '/login';
    };

    return (
        <Navbar expand="lg" className={styles.appbar + ' bg-body-tertiary'}>
            <Container fluid>
                <Link to='/' className='navbar-brand'>My Store</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        {loading ? <Loading /> :
                            <>
                                {appContext.appState.user == null ?
                                    <>
                                        <Link to='register' className='nav-link'>Register</Link>
                                        <Link to='login' className='nav-link'>Login</Link>
                                    </>
                                    :
                                    <>
                                        
                                        {currentUser === 'admin' ?(<Link to='/AdminPanel' className='nav-link'>Dashboard</Link>)
                                          :
                                          <>
                                          <Link onClick={onLogout} className='nav-link'>Logout</Link>
                                          <Link to='/user' className='nav-link'>My Details</Link>
                                          </>
                                          
                                        }
                                    </>
                                }
                            </>
                        }
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => {setSearch(e.target.value)}}
                        />
                        <Button onClick={(e) => appContext.setSearch(search)} variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppBar;
