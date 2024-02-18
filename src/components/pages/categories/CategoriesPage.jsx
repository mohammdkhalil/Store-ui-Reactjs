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
        <div>
            <div className="main-table-containter">
                <div className="title-table-container">
                    <div className="subtitle">CATEGORIES</div>
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.length > 0 ? (
                                categories.map((category, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{category.name}</td>
                                            <td>{category.desc}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="3">No categories found</td>
                                </tr>
                            )}
                        </tbody>

                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AllCategories;
