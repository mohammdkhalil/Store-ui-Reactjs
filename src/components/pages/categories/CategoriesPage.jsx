import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Api from '../../../tools/api';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await Api.fetch({
                url: 'categories',
                method: 'GET',
                token: localStorage.getItem('token'),
            });
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.desc}</td>
                                {/* <td>
                                    <Button variant="primary">Edit</Button>{' '}
                                    <Button variant="danger">Delete</Button>
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No categories found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default AllCategories;
