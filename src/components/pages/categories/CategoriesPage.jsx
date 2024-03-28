import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Api from '../../../tools/api';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

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

    const handleDeleteClick = (categoryId) => {
        setDeleteCategoryId(categoryId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await Api.fetch({
                url: `categories/${deleteCategoryId}`,
                method: 'DELETE',
                token: localStorage.getItem('token')
            });
            setShowDeleteModal(false);
            fetchCategories(); // Refresh categories data
        } catch (error) {
            console.error('Error deleting category: ', error);
        };
    };

    const handleEditClick = (category) => {
        setEditCategory(category);
        setShowEditModal(true);
    };

    const handleEditSave = async () => {
        try {
            await Api.fetch({
                url: `categories/${editCategory.id}`,
                method: 'PUT',
                token: localStorage.getItem('token'),
                data: {
                    name: editCategory.name,
                    desc: editCategory.desc
                }
            });
            setShowEditModal(false);
            fetchCategories(); // Refresh categories data
        } catch (error) {
            console.error('Error editing category: ', error);
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.desc}</td>
                                <td>
                              
                                    <Button  variant="danger" onClick={() => handleDeleteClick(category.id)}>Delete</Button>
                                    <span className="mx-2"></span>
                                    <Button variant="primary" onClick={() => handleEditClick(category)}>Edit</Button>
    
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No categories found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this category?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleDeleteConfirm}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editFormName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={editCategory?.name} />
                        </Form.Group>
                        <Form.Group controlId="editFormDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={editCategory?.desc} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => handleEditSave({
                        id: editCategory?.id,
                        name: document.getElementById('editFormName').value,
                        desc: document.getElementById('editFormDesc').value
                    })}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AllCategories;

// import React, { useState, useEffect } from 'react';
// import { Button, Table, Modal } from 'react-bootstrap';
// import Api from '../../../tools/api';

// const AllCategories = () => {
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [deleteCategoryId, setDeleteCategoryId] = useState(null);

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await Api.fetch({
//                 url: 'categories',
//                 method: 'GET',
//                 token: localStorage.getItem('token'),
//             });
//             setCategories(response.data);
//             setLoading(false);
//         } catch (error) {
//             setError(error);
//             setLoading(false);
//         }
//     };

//     const handleDeleteClick = (categoryId) => {
//         setDeleteCategoryId(categoryId);
//         setShowDeleteModal(true);
//     };

//     const handleDeleteConfirm = async () => {
//         try {
//             await Api.fetch({
//                 url: `categories/${deleteCategoryId}`,
//                 method: 'DELETE',
//                 token: localStorage.getItem('token')
//             });
//             setShowDeleteModal(false);
//             fetchCategories(); // Refresh categories data
//         } catch (error) {
//             console.error('Error deleting category: ', error);
//         };
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <div className="table-responsive">
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {categories && categories.length > 0 ? (
//                         categories.map((category, index) => (
//                             <tr key={index}>
//                                 <td>{category.id}</td>
//                                 <td>{category.name}</td>
//                                 <td>{category.desc}</td>
//                                 <td>
//                                     <Button variant="danger" onClick={() => handleDeleteClick(category.id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No categories found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>

//             <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Delete</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to delete this category?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
//                     <Button variant="primary" onClick={handleDeleteConfirm}>Delete</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default AllCategories;
