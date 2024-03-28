import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Api from '../../../tools/api';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await Api.fetch({
                url: 'products',
                method: 'GET',
                token: localStorage.getItem('token'),
            });
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setShowEditModal(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await Api.fetch({
                url: `products/${editProduct.id}`,
                method: 'PUT',
                body: editProduct,
                token: localStorage.getItem('token'),
            });
            setShowEditModal(false);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>image</th>
                        <th>price</th>
                        <th>category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.image}</td>
                            <td>{product.price}$</td>
                            <td>{product.category}</td>                            
                            <td>
                                <Button onClick={() => handleEdit(product)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Product Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editProduct.name || ''}
                                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={editProduct.description || ''}
                                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={editProduct.price || ''}
                                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                value={editProduct.category || ''}
                                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicImage">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={editProduct.image || ''}
                                onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AllProduct;




// import React, { useState, useEffect } from 'react';
// import { Button, Table } from 'react-bootstrap';
// import Api from '../../../tools/api';

// const AllProduct = () => {
//     // حالة الفئات وتحديثها
//     const [products, setProduct] = useState([]);
//     // حالة التحميل
//     const [loading, setLoading] = useState(true);
//     // حالة الخطأ
//     const [error, setError] = useState(null);

//     // استدعاء الدالة لجلب الفئات عند تحميل الصفحة
//     useEffect(() => {
//         fetchProduct();
//     }, []);

//     // دالة لجلب الفئات من الخادم
//     const fetchProduct = async () => {
//         try {
//             const response = await Api.fetch({
//                 url: 'products',
//                 method: 'GET',
//                 token: localStorage.getItem('token'),
//             });
//             // تحديث حالة الفئات بالبيانات المسترجعة
//             setProduct(response.data);
//             // إلغاء حالة التحميل
//             setLoading(false);
//         } catch (error) {
//             // تحديث حالة الخطأ في حالة حدوث خطأ
//             setError(error);
//             // إلغاء حالة التحميل
//             setLoading(false);
//         }
//     };

//     // إذا كانت حالة التحميل مفعلة، عرض رسالة التحميل
//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     // إذا كان هناك خطأ، عرض رسالة الخطأ
//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     // عرض الجدول إذا كانت هناك فئات
//     return (
//         <div className="table-responsive">
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Description</th>
//                         <th>price</th>
//                         <th>category</th>
//                         <th>image</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products && products.length > 0 ? (
//                         products.map((products, index) => (
//                             <tr key={index}>
//                                 <td>{products.id}</td>
//                                 <td>{products.name}</td>
//                                 <td>{products.description}</td>
//                                 <td>{products.price}</td>
//                                 <td>{products.category}</td>
//                                 <td>{products.image}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="4">No products found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default AllProduct;
