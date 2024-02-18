import { useContext, useEffect, useState } from "react";
import Categories from "./Categories";
import Product from "./Product";
import styles from "./home.module.scss";
import { AppContext } from "../../layout/Layout";
import Api from "../../../tools/api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  // init app state
  const appContext = useContext(AppContext);

  // init categories & other states
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // set fetching categories from API function
  const getCategories = async () => {
    // call API
    const response = await Api.fetch({ url: "categories" });

    // check response
    if (response != null) setCategories(response.data); // update state with recevied categories
  };

  // set fetching products from API function
  const getProducts = async () => {
    // call API
    let params;
    if (appContext.appState.search != null) {
      params = { name: appContext.appState.search };
    }
    if (appContext.appState.category != null) {
      params = { ...params, category: appContext.appState.category };
    }
    const response = await Api.fetch({
      url: "products",
    });

    // check response
    if (response != null) {
      const productsRes = [];
      if (response.data != null) {
        for (const keyIndex in response.data) {
          // object: key - array: index
          productsRes.push(response.data[keyIndex]);
        }
      }
      setProducts(productsRes); // update state with recevied products
    }
  };

  // set effect functionalities
  useEffect(() => {
    // component did mount => get & update categories from back-end
    getCategories();
    getProducts();
  }, [appContext.appState.search, appContext.appState.category]);

  return (
    <div className={styles.home}>
      <Categories categories={categories} />
      {products == null || products.length == 0 ? (
        <h1>No Product has been found!</h1>
      ) : (
        <div className={styles.products}>
          {products.map((el, index) => (
            <Product key={el.id} product={el} />
          ))}
        </div>
      )}
          
      <div>
        <Link to="addProduct" className="mx-auto">
          <Button varient="outline-primary">addProduct +</Button>
        </Link>
      </div>
    </div>
  );
}
