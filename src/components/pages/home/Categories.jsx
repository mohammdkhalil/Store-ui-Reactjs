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



// import ListGroup from 'react-bootstrap/ListGroup';
// import styles from './home.module.scss'
// import Loading from '../../shared/Loading';
// import { useContext } from 'react';
// import { AppContext } from '../../layout/Layout';
// export default function Categories({ categories }) {
//     // init app state
//     const appContext = useContext(AppContext)

//     return (
//         <ListGroup className={styles.categories} horizontal>
//             {
//                 (categories == null || categories.length == 0) ?
//                     <Loading />
//                     : categories.map((el) => {
//                         let classX = styles.item
//                         const isSelected = (el.id == appContext.appState.category)
//                         if (isSelected) {
//                             classX = classX + ' ' + styles.active;
//                         }
//                         const updateCategory = (e) => {
//                             if (isSelected)
//                                 appContext.setCategory(null)
//                             else
//                                 appContext.setCategory(el.id)
//                         }
//                         return <ListGroup.Item key={el.id} className={classX} onClick={updateCategory}>{el.name} </ListGroup.Item>
//                     })}
//         </ListGroup>
//     );
// }