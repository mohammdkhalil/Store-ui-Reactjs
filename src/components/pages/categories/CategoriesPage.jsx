// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CategoriesPage() {
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         axios.get('/api/categories')
//             .then(response => {
//                 setCategories(response.data);
//             })
//             .catch(error => {
//                 console.error('حدث خطأ أثناء جلب الفئات: ', error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>فئات المتجر</h1>
//             <ul>
//                 {categories.map(category => (
//                     <li key={category.id}>{category.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default CategoriesPage;
